import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import moment from 'moment';
import LoadingButton from '@mui/lab/LoadingButton';
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

function VaccineLots({ vaccine }) {
  const [pageSize, setPageSize] = React.useState(5);

  const tableHeader = [
    {
      field: 'name',
      headerName: 'Lot number',
      width: 200,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 150,
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
      width: 150,
      align: 'right',
      renderCell: (params) =>
        (params.row.quantity - params.row.vaccinated).toLocaleString('de-dE'),
    },
    {
      field: 'createdAt',
      headerName: 'Time',
      flex: 1,
      renderCell: (params) =>
        moment(params.value).format('DD-MM-YYYY HH:mm:ss'),
    },
    {
      field: '_id',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <>
          <LoadingButton
            color="error"
            disableElevation
            startIcon={<DeleteOutlineOutlinedIcon />}
            // loading={onDelete}
            // onClick={() => deleteLot(params.row.id)}
          >
            Delete
          </LoadingButton>
          <Button
            disableElevation
            startIcon={<ModeEditOutlineOutlinedIcon />}
            // onClick={() => selectLot(params.row)}
          >
            Edit
          </Button>
        </>
      ),
    },
  ];

  return (
    <Card>
      <CardHeader
        title={<Typography variant="h6">Lots Information</Typography>}
        action={<Button variant="contained">Add lot</Button>}
      ></CardHeader>
      {vaccine && (
        <CardContent>
          <DataGrid
            autoHeight
            rows={vaccine.VaccineLots}
            columns={tableHeader}
            pageSize={pageSize}
            rowsPerPageOptions={[9, 50, 100]}
            onPageSizeChange={(size) => setPageSize(size)}
            density="comfortable"
          />
        </CardContent>
      )}
    </Card>
  );
}

VaccineLots.propTypes = {
  vaccine: PropTypes.object,
};

export default VaccineLots;
