import React from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import QRCode from 'react-qr-code';
import moment from 'moment';

import placeApi from '../../api/placeApi';
import PageHeader from '../../components/PageHeader';
import { DataGrid } from '@mui/x-data-grid';

function VaccineDetail() {
  const { id } = useParams();

  const [place, setPlace] = React.useState();
  const [pageSize, setPageSize] = React.useState(9);

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => params.row.user.fullName,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 150,
      renderCell: (params) => params.row.user.phoneNumber,
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 150,
      renderCell: (params) => params.row.user.address,
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
    const getPlace = async () => {
      try {
        const res = await placeApi.getOnePlace(id);
        setPlace(res);
      } catch (error) {
        console.log(error);
      }
    };
    getPlace();
  }, []);

  return (
    <>
      <PageHeader title={'Place detail'} />

      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              {place && (
                <Stack spacing={2}>
                  <div>
                    <Typography variant="body2">Name</Typography>
                    <Typography variant="h6">{place.name}</Typography>
                  </div>
                  <div>
                    <Typography variant="body2">Address</Typography>
                    <Typography variant="h6">{place.address}</Typography>
                  </div>
                  <div>
                    <Typography variant="body2">Created by</Typography>
                    <Button component={Link} to={`/user/${place.creator.id}`}>
                      {place.creator.fullName}
                    </Button>
                  </div>
                </Stack>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {place && (
                  <QRCode
                    id="place-pr"
                    value={place._id}
                    size={200}
                    level="H"
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={8}>
          <Card>
            <CardHeader
              title={<Typography>User visit in last 24h</Typography>}
            />
            <CardContent>
              {place && (
                <DataGrid
                  rows={place.userVisitedLast24h}
                  columns={columns}
                  autoHeight
                  pageSize={pageSize}
                  onPageSizeChange={(size) => setPageSize(size)}
                  rowsPerPageOptions={[9, 50, 100]}
                  density="comfortable"
                  showCellRightBorder
                  showColumnRightBorder
                  disableSelectionOnClick
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default VaccineDetail;
