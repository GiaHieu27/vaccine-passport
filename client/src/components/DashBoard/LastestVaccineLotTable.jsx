import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';

function LastestVaccineLotTable({ list }) {
  const tableHeaders = [
    {
      field: 'name',
      haederName: 'Lot number',
      width: 150,
    },
    {
      field: 'vaccine',
      haederName: 'Vaccine',
      width: 150,
      renderCell: (params) => params.value.name,
    },
    {
      field: 'quantity',
      haederName: 'Quantity',
      width: 150,
      align: 'right',
      renderCell: (params) => params.value.toLocaleString('de-DE'),
    },
    {
      field: 'createdAt',
      haederName: 'time',
      flex: 1,
      renderCell: (params) =>
        moment(params.value).format('DD-MM-YYYY HH:mm:ss'),
    },
  ];

  return (
    <DataGrid
      autoHeight
      rows={list}
      columns={tableHeaders}
      hideFooter
      density="comfortable"
      showCellRightBorder
      showColumnRightBorder
      disableSelectionOnClick
    />
  );
}

LastestVaccineLotTable.propTypes = {
  list: PropTypes.array.isRequired,
};

export default LastestVaccineLotTable;
