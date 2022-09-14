import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from '@mui/material';
import moment from 'moment';

import vaccineApi from '../../api/vaccineApi';
import CustomDialog from '../CustomDialog';
import LoadingButton from '@mui/lab/LoadingButton';

function UserVaccinated({ user }) {
  const [userVaccines, setUserVaccines] = React.useState(user.vaccinated);
  const [vaccineList, setVaccineList] = React.useState([]);
  const [vaccineLots, setVaccineLots] = React.useState([]);
  const [selectedVaccine, setSelectedVaccine] = React.useState();
  const [selectedLot, setSelectedLot] = React.useState();
  const [showAddDialog, setShowAddDialog] = React.useState(false);

  const columns = [
    {
      field: 'vaccine',
      headerName: 'Vaccine',
      width: 200,
      renderCell: (params) => (
        <Button
          component={Link}
          to={`/vaccine/${params.value.id}`}
          sx={{ textTransform: 'none' }}
        >
          {params.value.name}
        </Button>
      ),
    },
    {
      field: 'vaccineLot',
      headerName: 'Lot',
      width: 170,
      renderCell: (params) => params.value.name,
    },
    {
      field: 'createdAt',
      headerName: 'Time',
      flex: 1,
      renderCell: (params) =>
        moment(params.value).format('DD-MM-YYYY HH:mm:ss'),
    },
  ];

  React.useEffect(() => {
    const getVaccines = async () => {
      try {
        const res = await vaccineApi.getAllVaccine();
        setVaccineList(res);
      } catch (err) {
        console.log(err);
      }
    };
    getVaccines();
  }, []);

  React.useEffect(() => {
    if (!selectedVaccine) {
      setVaccineLots([]);
      setSelectedLot(null);
      return;
    }
    setVaccineLots(selectedVaccine.vaccineLots);
  }, [selectedVaccine]);

  return (
    <>
      <Card>
        <CardHeader
          title={<Typography variant="h6">Vaccinated information</Typography>}
          action={
            <Button variant="contained" onClick={() => setShowAddDialog(true)}>
              Add vaccinated
            </Button>
          }
        ></CardHeader>

        <CardContent>
          <DataGrid
            autoHeight
            columns={columns}
            rows={userVaccines}
            pageSize={3}
            rowsPerPageOptions={[3, 6, 9]}
            density="comfortable"
            showCellRightBorder
            showColumnRightBorder
          />
        </CardContent>
      </Card>

      <CustomDialog
        open={showAddDialog}
        handleClose={() => setShowAddDialog(false)}
        title="Add user vaccinated"
        content={
          <Box sx={{ p: '10px' }}>
            <Autocomplete
              options={vaccineList}
              getOptionLabel={(option) => option.name}
              renderOption={(props, option) => (
                <Box {...props} component="li">
                  {option.name}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Vaccine"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password',
                  }}
                />
              )}
              value={selectedVaccine}
              onChange={(event, newValue) => setSelectedVaccine(newValue)}
            />

            <Autocomplete
              sx={{ mt: '15px' }}
              options={vaccineLots}
              getOptionLabel={(option) => option.name}
              renderOption={(props, option) => (
                <Box {...props} component="li">
                  {option.name}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Vaccine lot"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password',
                  }}
                />
              )}
              value={selectedLot}
              onChange={(event, newValue) => setSelectedLot(newValue)}
            />
          </Box>
        }
        actions={
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
            width="100%"
          >
            <Button
              sx={{ mr: '8px' }}
              variant="text"
              onClick={() => {
                setSelectedVaccine(null);
                setShowAddDialog(false);
              }}
            >
              Cancel
            </Button>
            <LoadingButton sx={{ mr: '15px' }} variant="contained">
              Add
            </LoadingButton>
          </Box>
        }
      />
    </>
  );
}

UserVaccinated.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserVaccinated;
