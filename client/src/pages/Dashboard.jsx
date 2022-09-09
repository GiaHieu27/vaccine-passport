import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import AddModeratorOutlinedIcon from '@mui/icons-material/AddModeratorOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';

import adminApi from '../api/adminApi';
import SummaryInfo from '../components/DashBoard/SummaryInfo';
import VaccinatedChart from '../components/DashBoard/VaccinatedChart';
import LastestVaccineLotTable from '../components/DashBoard/LastestVaccineLotTable';

function Dashboard() {
  const [summaryData, setSummaryData] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await adminApi.getSummary();
        setSummaryData(res);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  console.log(summaryData);

  return (
    <Stack spacing={4}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Card elevation={0} sx={{ boxShadow: 2 }}>
            <CardContent>
              {summaryData && (
                <SummaryInfo
                  title="Total User"
                  number={summaryData.totalUser.toLocaleString('de-DE')}
                  icon={
                    <PersonOutlineOutlinedIcon
                      sx={{ fontSize: '3rem' }}
                      color="warning"
                    />
                  }
                />
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card elevation={0} sx={{ boxShadow: 2 }}>
            <CardContent>
              {summaryData && (
                <SummaryInfo
                  title="User vaccinated"
                  number={summaryData.userVaccinated.toLocaleString('de-DE')}
                  icon={
                    <VerifiedUserOutlinedIcon
                      sx={{ fontSize: '3rem' }}
                      color="success"
                    />
                  }
                />
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card elevation={0} sx={{ boxShadow: 2 }}>
            <CardContent>
              {summaryData && (
                <SummaryInfo
                  title="Available vaccine dose"
                  number={summaryData.availableVaccineDose.toLocaleString(
                    'de-DE'
                  )}
                  icon={
                    <AddModeratorOutlinedIcon
                      sx={{ fontSize: '3rem' }}
                      color="primary"
                    />
                  }
                />
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card elevation={0} sx={{ boxShadow: 2 }}>
            <CardContent>
              {summaryData && (
                <SummaryInfo
                  title="User vaccinated"
                  number={summaryData.totalPlace.toLocaleString('de-DE')}
                  icon={
                    <RoomOutlinedIcon sx={{ fontSize: '3rem' }} color="error" />
                  }
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card elevation={0} sx={{ boxShadow: 2 }}>
            <CardHeader
              title={<Typography variant="h6">Vaccinated analysts</Typography>}
            />
            <CardContent>
              {summaryData && (
                <VaccinatedChart
                  chartData={summaryData.userVaccinatedAnalyst}
                />
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={8}>
          <Card elevation={0} sx={{ boxShadow: 2 }}>
            <CardHeader
              title={<Typography variant="h6">Lastest Vaccine Lots</Typography>}
              action={
                <Button
                  variant="text"
                  disableElevation
                  component={Link}
                  to="/vaccine"
                >
                  Manage vaccine
                </Button>
              }
            />
            <CardContent>
              {summaryData && (
                <LastestVaccineLotTable list={summaryData.lastestVaccineLot} />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default Dashboard;
