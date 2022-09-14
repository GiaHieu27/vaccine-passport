import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Button, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import vaccineApi from '../../api/vaccineApi';
import PageHeader from '../../components/PageHeader';
import Loading from '../../components/Loading';
import VaccineCreateModal from '../../components/Vaccine/VaccineCreateModal';

function Vaccine() {
  const [vaccineList, setVaccineList] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(9);
  const [showCreateMadal, setShowCreateMadal] = React.useState(false);

  React.useEffect(() => {
    const getVaccine = async () => {
      try {
        const res = await vaccineApi.getAllVaccine();
        setVaccineList(res);
      } catch (error) {
        console.log(error);
      }
    };
    getVaccine();
  }, []);

  const tableHeader = [
    {
      field: 'name',
      headerName: 'Name',
      width: 170,
      renderCell: (params) => (
        <Button
          variant="text"
          component={Link}
          to={`/vaccine/${params.row.id}`}
        >
          {params.value}
        </Button>
      ),
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      align: 'right',
      width: 150,
      renderCell: (params) => params.value.toLocaleString('de-DE'),
    },
    {
      field: 'vaccinated',
      headerName: 'Vaccinated',
      align: 'right',
      width: 170,
      renderCell: (params) => params.value,
    },
    {
      field: 'id',
      headerName: 'Available',
      align: 'right',
      width: 170,
      renderCell: (params) => {
        // console.log(params);
        return (params.row.quantity - params.row.vaccinated).toLocaleString(
          'de-DE'
        );
      },
    },
    {
      field: 'vaccineLots',
      headerName: 'Lots',
      width: 170,
      renderCell: (params) => {
        // console.log(params);
        return params?.value?.length;
      },
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
      renderCell: (params) =>
        moment(params.value).format('DD-MM-YYYY HH:mm:ss'),
    },
  ];

  const onSuccess = (newVaccine) => {
    setVaccineList((prev) => [newVaccine, ...prev]);
    setShowCreateMadal(false);
  };

  return (
    <>
      <PageHeader
        title={'Vaccine List'}
        rightContent={
          <Button variant="contained" onClick={() => setShowCreateMadal(true)}>
            Create
          </Button>
        }
      />

      {vaccineList && vaccineList.length ? (
        <Paper>
          <DataGrid
            rows={vaccineList}
            columns={tableHeader}
            autoHeight
            pageSize={pageSize}
            rowsPerPageOptions={[9, 50, 100]}
            density="comfortable"
            showColumnRightBorder
            showCellRightBorder
            disableSelectionOnClick
            onPageSizeChange={(size) => setPageSize(size)}
          />
        </Paper>
      ) : (
        <Loading />
      )}

      <VaccineCreateModal
        showCreateMadal={showCreateMadal}
        setShowCreateMadal={setShowCreateMadal}
        onSuccess={onSuccess}
      />
    </>
  );
}

export default Vaccine;
