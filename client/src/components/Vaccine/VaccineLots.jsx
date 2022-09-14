import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import moment from 'moment';

import CustomDialog from '../../components/CustomDialog';
import vaccineLotApi from '../../api/vaccineLotApi';

function VaccineLots({ vaccine, resetPage }) {
  const [pageSize, setPageSize] = React.useState(9);

  const [lotNumber, setLotNumber] = React.useState('');
  const [quantity, setQuantity] = React.useState('');

  const [lotNumberErr, setLotNumberErr] = React.useState(false);
  const [quantityErr, setQuantityErr] = React.useState(false);
  const [showAddVaccineLot, setShowAddVaccineLot] = React.useState(false);
  const [showUpdateVaccineLot, setShowUpdateVaccineLot] = React.useState(false);

  const [addLoading, setAddLoading] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [updateLoading, setUpdateLoading] = React.useState(false);

  const [selectedLot, setSelectedLot] = React.useState();

  const handleCreateVaccineLot = async () => {
    if (addLoading) return;
    const err = [!lotNumber, !quantity];

    setLotNumberErr(!lotNumber);
    setQuantityErr(!quantity);

    if (!err.every((e) => !e)) return;
    setAddLoading(true);

    const body = {
      vaccineId: vaccine.id,
      name: lotNumber,
      quantity,
    };

    try {
      await vaccineLotApi.createVaccineLot(body);
      setQuantity('');
      setLotNumber('');
      setShowAddVaccineLot(false);
      resetPage();
    } catch (error) {
      console.log(error);
    } finally {
      setAddLoading(false);
    }
  };

  const handleDeleteVaccineLot = async (lotId) => {
    if (deleteLoading) return;
    setDeleteLoading(true);
    try {
      await vaccineLotApi.deleteVaccineLot(lotId);
      resetPage();
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleUpdateVaccineLot = async () => {
    if (updateLoading) return;
    const err = [!lotNumber, !quantity];
    setLotNumberErr(!lotNumber);
    setQuantityErr(!quantity);

    if (!err.every((e) => !e)) return;
    setUpdateLoading(true);
    const body = {
      name: lotNumber,
      quantity,
    };
    try {
      await vaccineLotApi.updateVaccineLot(selectedLot.id, body);
      setQuantity('');
      setLotNumber('');
      setShowUpdateVaccineLot(false);
      resetPage();
    } catch (err) {
      console.log(err);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleSelectLot = (lot) => {
    setLotNumber(lot.name);
    setQuantity(lot.quantity);
    setSelectedLot(lot);
    setShowUpdateVaccineLot(true);
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Lot number',
      width: 140,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 120,
      align: 'right',
      renderCell: (params) => params.value.toLocaleString('de-dE'),
    },
    {
      field: 'vaccinated',
      headerName: 'Vaccinated',
      width: 150,
      align: 'right',
      renderCell: (params) => params.value.toLocaleString('de-dE'),
    },
    {
      field: 'id',
      headerName: 'Availabe',
      width: 120,
      align: 'right',
      renderCell: (params) =>
        (params.row.quantity - params.row.vaccinated).toLocaleString('de-dE'),
    },
    {
      field: 'createdAt',
      headerName: 'Time',
      width: 180,
      renderCell: (params) =>
        moment(params.value).format('DD-MM-YYYY HH:mm:ss'),
    },
    {
      field: '_id',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <>
          <LoadingButton
            color="error"
            disableElevation
            startIcon={<DeleteOutlineOutlinedIcon />}
            loading={deleteLoading}
            onClick={() => handleDeleteVaccineLot(params.row.id)}
          >
            Delete
          </LoadingButton>

          <Button
            disableElevation
            startIcon={<ModeEditOutlineOutlinedIcon />}
            onClick={() => handleSelectLot(params.row)}
          >
            Edit
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Card>
        <CardHeader
          title={<Typography variant="h6">Lots Information</Typography>}
          action={
            <Button
              variant="contained"
              onClick={() => {
                setLotNumber('');
                setQuantity('');
                setSelectedLot(undefined);
                setShowAddVaccineLot(true);
              }}
            >
              Add lot
            </Button>
          }
        ></CardHeader>

        <CardContent>
          <DataGrid
            autoHeight
            rows={vaccine.vaccineLots}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[9, 50, 100]}
            onPageSizeChange={(size) => setPageSize(size)}
            density="comfortable"
            showCellRightBorder
            showColumnRightBorder
            disableSelectionOnClick
          />
        </CardContent>
      </Card>

      <CustomDialog
        open={showAddVaccineLot}
        handleClose={() => setShowAddVaccineLot(false)}
        title="Add vaccine lot"
        content={
          <Box>
            <TextField
              fullWidth
              margin="normal"
              label="Lot number"
              value={lotNumber}
              error={lotNumberErr}
              onChange={(e) => setLotNumber(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Quantity"
              value={quantity}
              error={quantityErr}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Box>
        }
        actions={
          <Box>
            <Button
              onClick={() => setShowAddVaccineLot(false)}
              disabled={addLoading}
              sx={{ mr: '8px' }}
            >
              Cancel
            </Button>
            <LoadingButton
              loading={addLoading}
              variant="contained"
              onClick={handleCreateVaccineLot}
              sx={{ mr: '15px' }}
            >
              Create
            </LoadingButton>
          </Box>
        }
      />

      <CustomDialog
        open={showUpdateVaccineLot}
        handleClose={() => setShowUpdateVaccineLot(false)}
        title="Update vaccine lot"
        content={
          <Box>
            <TextField
              fullWidth
              margin="normal"
              label="Lot number"
              value={lotNumber}
              error={lotNumberErr}
              onChange={(e) => setLotNumber(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Quantity"
              value={quantity}
              error={quantityErr}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Box>
        }
        actions={
          <Box>
            <Button
              onClick={() => setShowUpdateVaccineLot(false)}
              disabled={updateLoading}
              sx={{ mr: '8px' }}
            >
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              sx={{ mr: '15px' }}
              loading={updateLoading}
              onClick={handleUpdateVaccineLot}
            >
              Update
            </LoadingButton>
          </Box>
        }
      />
    </>
  );
}

VaccineLots.propTypes = {
  vaccine: PropTypes.object,
  resetPage: PropTypes.func,
};

export default VaccineLots;
