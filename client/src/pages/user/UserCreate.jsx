import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import PageHeader from '../../components/PageHeader';
import dvhcvn from '../../assets/dvhcvn.json';
import userApi from '../../api/userApi';
import CustomDialog from '../../components/CustomDialog';
import CustomBreadcrumds from '../../components/CustomBreadcrumds';

const initInfo = {
  idCard: '',
  name: '',
  phone: '',
};

const initErr = {
  idCardErr: false,
  nameErr: false,
  phoneErr: false,
  addressErr: false,
};

function UserCreate() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const [loading, setLoading] = React.useState(false);
  const [info, setInfo] = React.useState(initInfo);
  const [infoErr, setInfoErr] = React.useState(initErr);
  const [address, setAddress] = React.useState();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogType, setDialogType] = React.useState('');
  const [dialogText, setDialogText] = React.useState('');

  const { idCard, name, phone } = info;
  const { idCardErr, nameErr, phoneErr, addressErr } = infoErr;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const handleCreateUser = async () => {
    if (loading) return;
    const err = [!name, !phone, !idCard, !address];

    setInfoErr((prev) => {
      let newInfoErr = {
        ...prev,
        idCardErr: !idCard,
        nameErr: !name,
        phoneErr: !phone,
        addressErr: !address,
      };
      return newInfoErr;
    });

    if (!err.every((e) => !e)) return;
    setLoading(true);

    const body = {
      phoneNumber: phone,
      idNumber: idCard,
      fullName: name,
      address: address.name,
    };

    try {
      const res = await userApi.createUser(body);
      setLoading(false);
      navigate(`/user/${res.newUser.id}`);
    } catch (error) {
      setLoading(false);
      setDialogOpen(true);
      setDialogType('error');
      setDialogText(error.response.data.message);
    }
  };

  return (
    <>
      <CustomBreadcrumds pathnames={pathnames} />
      <Box width={'40%'}>
        <PageHeader
          title={'Create user'}
          rightContent={
            <Stack direction="row" spacing={2}>
              <Button variant="text" onClick={() => navigate('/user')}>
                Cancel
              </Button>
              <LoadingButton
                variant="contained"
                onClick={handleCreateUser}
                loading={loading}
              >
                Create
              </LoadingButton>
            </Stack>
          }
        />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <FormControl fullWidth margin="normal">
                  <TextField
                    name="idCard"
                    label="Id card"
                    value={idCard}
                    error={idCardErr}
                    onChange={(e) => handleChange(e)}
                  />
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <TextField
                    name="name"
                    label="Full name"
                    value={name}
                    error={nameErr}
                    onChange={(e) => handleChange(e)}
                  />
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <TextField
                    name="phone"
                    label="Phone"
                    type="number"
                    value={phone}
                    error={phoneErr}
                    onChange={(e) => handleChange(e)}
                  />
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <Autocomplete
                    options={dvhcvn.data}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Address"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password',
                        }}
                        // value={address}
                        // onChange={(event, newValue) => setAddress(newValue)}
                        error={addressErr}
                      />
                    )}
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option) => (
                      <Box {...props}>{option.name}</Box>
                    )}
                    autoHighlight={true}
                    blurOnSelect={true}
                    value={address}
                    onChange={(event, newValue) => setAddress(newValue)}
                  />
                </FormControl>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <CustomDialog
        open={dialogOpen}
        showIcon
        type={dialogType}
        content={
          <Typography variant="subtitle1" textAlign={'center'}>
            {dialogText}
          </Typography>
        }
        actions={
          <Box
            sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            <Button variant="contained" onClick={() => setDialogOpen(false)}>
              OK
            </Button>
          </Box>
        }
      />
    </>
  );
}

export default UserCreate;
