import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  TextField,
} from '@mui/material';
import { Stack } from '@mui/system';

import PageHeader from '../../components/User/PageHeader';
import dvhcvn from '../../assets/dvhcvn.json';

const createInfo = {
  idCard: '',
  name: '',
  phone: '',
  address: '',
};

const infoErrObj = {};

function UserCreate() {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const [info, setInfo] = React.useState(createInfo);
  const [infoErr, setInfoErr] = React.useState(infoErrObj);

  const { idCard, name, phone, address } = info;

  const handleCreateUser = async () => {
    setLoading(true);
    console.log('cdcd');
  };

  return (
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
          <Card elevation={1}>
            <CardContent>
              <FormControl fullWidth margin="normal">
                <TextField label="Id card" />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <TextField label="Full name" />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <TextField label="Phone" type="number" />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <Autocomplete
                  options={dvhcvn.data}
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, option) => (
                    <Box {...props}>{option.name}</Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Address"
                      inputProps={{
                        ...params.inputProps,
                        autocomplete: 'new-password',
                      }}
                    />
                  )}
                />
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserCreate;
