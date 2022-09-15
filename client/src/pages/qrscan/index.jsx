import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { QrReader } from 'react-qr-reader';

import PageHeader from '../../components/PageHeader';
import userApi from '../../api/userApi';
import UserVaccinated from '../../components/QRScan';

function QRScan() {
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState();

  const handleScan = async (data) => {
    if (loading) return;
    if (!data) return;
    try {
      setLoading(true);
      const res = await userApi.getOneUser(data);
      setUser(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title={'qr scan'} />
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <Card>
            <CardContent padding="0">
              <QrReader
                scanDelay={1000}
                onResult={(result, error) => {
                  if (result) handleScan(result);
                  if (error) console.log(error);
                }}
                constraints={{ facingMode: 'user' }}
                style={{ width: '100%' }}
              />
            </CardContent>

            <CardActions>
              <Button
                onClick={() => setUser(null)}
                variant="contained"
                sx={{ m: '0 auto' }}
              >
                Reset
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={9}>
          <Stack spacing={4}>
            <Card>
              <CardHeader
                title={<Typography variant="h6">User Info</Typography>}
              />
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item xs={6}>
                    {user && (
                      <TextField
                        label="Id card"
                        variant="outlined"
                        value={user.idNumber}
                        InputProps={{ readOnly: true }}
                      />
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    {user && (
                      <TextField
                        label="Fullname"
                        variant="outlined"
                        value={user.fullName}
                        InputProps={{ readOnly: true }}
                      />
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    {user && (
                      <TextField
                        label="Phone"
                        variant="outlined"
                        value={user.phoneNumber}
                        InputProps={{ readOnly: true }}
                      />
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    {user && (
                      <TextField
                        label="Address"
                        variant="outlined"
                        value={user.address}
                        InputProps={{ readOnly: true }}
                      />
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card>
              <CardHeader
                title={
                  <Typography variant="h6">Vaccinaed information</Typography>
                }
              />
              <CardContent>
                {user && <UserVaccinated vaccinatedList={user.vaccinated} />}
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default QRScan;
