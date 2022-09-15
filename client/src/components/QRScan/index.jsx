import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';

function UserVaccinated({ vaccinatedList }) {
  const tableHeader = [
    {
      field: 'vaccine',
      headerName: 'Vaccine',
      width: 220,
      renderCell: (params) => params.value.name,
    },
    {
      field: 'vaccineLot',
      headerName: 'Vaccine lot',
      width: 170,
      renderCell: (params) => params.value.name,
    },
    {
      field: 'createdAt',
      headerName: 'time',
      flex: 1,
      renderCell: (params) =>
        moment(params.value).format('DD-MM-YYYY HH:mm:ss'),
    },
  ];
  return (
    <DataGrid
      autoHeight
      rows={vaccinatedList}
      columns={tableHeader}
      pageSize={6}
      rowsPerPageOptions={[6]}
      density="comfortable"
      showCellRightBorder
      showColumnRightBorder
    />
  );
}

UserVaccinated.propTypes = {
  vaccinatedList: PropTypes.array,
};

export default UserVaccinated;
