import React from 'react';

import { Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

import placeApi from '../../api/placeApi';
import PageHeader from '../../components/PageHeader';

function Place() {
  const [placeList, setPlaceList] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(9);

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => {
        // console.log(params);
        return (
          <Button component={Link} to={`/place/${params.row.id}`}>
            {params.value}
          </Button>
        );
      },
    },
    {
      field: 'creator',
      headerName: 'Created by',
      width: 200,
      renderCell: (params) => {
        // console.log(params);
        return (
          <Button component={Link} to={`/user/${params.value._id}`}>
            {params.value.fullName}
          </Button>
        );
      },
    },
    {
      field: 'userVisitedLast24h',
      headerName: 'User check in last 24h',
      width: 220,
      align: 'right',
      renderCell: (params) => {
        // console.log(params);
        return params.value.length;
      },
    },
    { field: 'address', headerName: 'Address', flex: 1 },
  ];

  React.useEffect(() => {
    const getPlaces = async () => {
      try {
        const res = await placeApi.getAllPlace();
        setPlaceList(res);
      } catch (err) {
        console.log(err);
      }
    };
    getPlaces();
  }, []);

  return (
    <>
      <PageHeader title="Place list" />
      <Paper>
        <DataGrid
          rows={placeList}
          columns={columns}
          autoHeight
          pageSize={pageSize}
          onPageSizeChange={(size) => setPageSize(size)}
          rowsPerPageOptions={[9, 50, 100]}
          showCellRightBorder
          showColumnRightBorder
          disableSelectionOnClick
        />
      </Paper>
    </>
  );
}

export default Place;
