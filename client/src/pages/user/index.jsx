import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';

import userApi from '../../api/userApi';
import PageHeader from '../../components/PageHeader';

function User() {
  const [userList, setUserList] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(9);

  React.useEffect(() => {
    const getUser = async () => {
      try {
        const res = await userApi.getAllUser();
        setUserList(res);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  const tableHeader = [
    {
      field: 'idNumber',
      headerName: 'ID card',
      renderCell: (params) => {
        return (
          <Button variant="text" component={Link} to={`/user/${params.row.id}`}>
            {params.value}
          </Button>
        );
      },
      width: 120,
    },
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 190,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: 140,
    },
    {
      field: 'vaccine',
      headerName: 'Vaccinated',
      width: 210,
      renderCell: (params) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
          color={
            params.value.length > 1
              ? 'green'
              : params.value.length === 1
              ? 'orange'
              : 'red'
          }
        >
          {params.value.length > 1 && <VerifiedUserIcon />}
          {params.value.length === 1 && <ShieldOutlinedIcon />}
          {params.value.length < 1 && <ErrorOutlineOutlinedIcon />}
          <Typography
            variant="body2"
            sx={{
              marginLeft: '10px',
              fontWeight: '500',
            }}
          >
            Vaccinated with {params.value.length} dose
            {params.value.length > 1 && 's'}
          </Typography>
        </Box>
      ),
    },
    { field: 'address', headerName: 'Address', flex: 1 },
    {
      field: 'id',
      headerName: 'Actions',
      width: 130,
      renderCell: (params) => (
        <Button
          variant="text"
          component={Link}
          to={`/user/${params.value}`}
          startIcon={<OpenInNewOutlinedIcon />}
        >
          Detail
        </Button>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title={'User List'}
        rightContent={
          <Button
            variant="contained"
            component={Link}
            to="/user/create"
            startIcon={<PersonAddAltOutlinedIcon />}
          >
            Create
          </Button>
        }
      />

      <Paper>
        <DataGrid
          autoHeight
          rows={userList}
          columns={tableHeader}
          pageSize={pageSize}
          rowsPerPageOptions={[9, 50, 100]}
          onPageSizeChange={(size) => setPageSize(size)}
          density="comfortable"
          showCellRightBorder
          showColumnRightBorder
          disableSelectionOnClick
        />
      </Paper>
    </>
  );
}

export default User;
