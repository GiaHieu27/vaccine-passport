import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';

function LastestVaccineLotTable({ list }) {
  const tableHeaders = [
    {
      field: 'name',
      haederName: 'Lot number',
      width: 200,
    },
    {
      field: 'vaccine',
      haederName: 'Vaccine',
      width: 200,
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

export default LastestVaccineLotTable;
