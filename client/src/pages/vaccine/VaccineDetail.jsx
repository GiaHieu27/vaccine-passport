import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

import vaccineApi from '../../api/vaccineApi';
import PageHeader from '../../components/PageHeader';
import CustomDialog from '../../components/CustomDialog';
import VaccineLots from '../../components/Vaccine/VaccineLots';
import CustomBreadcrumds from '../../components/CustomBreadcrumds';

function VaccineDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const [vaccine, setVaccine] = React.useState();
  const [name, setName] = React.useState('');
  const [nameErr, setNameErr] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogType, setDialogType] = React.useState('');
  const [dialogText, setDialogText] = React.useState('');
  const [onDelete, setOnDelete] = React.useState(false);

  const handleUpdate = async () => {
    if (loading) return;
    if (!name || name.trim().length === 0) {
      setNameErr(true);
      return;
    }
    setNameErr(false);
    try {
      await vaccineApi.updateVaccine(id, { name });
      setDialogOpen(true);
      setDialogType('success');
      setDialogText('Vaccine updated');
    } catch (error) {
      console.log(error.response.data.message);
      setLoading(false);
      setDialogType('error');
      setDialogText('Vaccine update fail');
    } finally {
      setLoading(false);
      setDialogOpen(true);
    }
  };

  const handleDeleteVaccine = async () => {
    if (onDelete) return;
    setOnDelete(true);
    try {
      await vaccineApi.deleteVaccine(id);
      setOnDelete(false);
      navigate('/vaccine');
    } catch (err) {
      setOnDelete(false);
      setDialogText('Delete fail');
      setDialogType('error');
      setDialogOpen(true);
    }
  };

  const resetPage = async () => {
    try {
      console.log('run');
      const res = await vaccineApi.getOneVaccine(id);
      setVaccine(res);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const getVaccine = async () => {
      try {
        const res = await vaccineApi.getOneVaccine(id);
        setVaccine(res);
        setName(res.name);
      } catch (error) {
        console.log(error);
      }
    };
    getVaccine();
  }, []);

  return (
    <>
      <CustomBreadcrumds pathnames={pathnames} name="vaccine-detail" />
      <PageHeader
        title={'Vaccine detail'}
        rightContent={
          <LoadingButton
            variant="text"
            color="error"
            loading={onDelete}
            onClick={handleDeleteVaccine}
          >
            Delete
          </LoadingButton>
        }
      />

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <TextField
                name="name"
                label="Vaccine name"
                value={name}
                error={nameErr}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
              />

              {vaccine && (
                <>
                  <TextField
                    label="Available"
                    value={vaccine.quantity - vaccine.vaccinated}
                    InputProps={{ readOnly: true }}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Quantity"
                    value={vaccine.quantity}
                    InputProps={{ readOnly: true }}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Vaccinated"
                    value={vaccine.vaccinated}
                    InputProps={{ readOnly: true }}
                    fullWidth
                    margin="normal"
                  />
                </>
              )}
            </CardContent>

            <CardActions
              sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
            >
              <LoadingButton
                variant="contained"
                loading={loading}
                onClick={handleUpdate}
              >
                Update
              </LoadingButton>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={8}>
          {vaccine && <VaccineLots vaccine={vaccine} resetPage={resetPage} />}
        </Grid>
      </Grid>

      <CustomDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        type={dialogType}
        showIcon
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

export default VaccineDetail;
