import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import AddModeratorOutlinedIcon from '@mui/icons-material/AddModeratorOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';

import adminApi from '../api/adminApi';

function Dashboard() {
  const [summaryData, setSummaryData] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await adminApi.getSummary();
        console.log(res);
        setSummaryData(res);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <Stack spacing={4}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Card elevation={0}>
            <CardContent>
              {summaryData && (
                <SummaryInfo
                  title="Total User"
                  number={summaryData.totalUser.toLocalString('de-DE')}
                  icon={
                    <VerifiedUserOutlinedIcon
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
          <Card elevation={0}>
            <CardContent>
              {summaryData && (
                <SummaryInfo
                  title="User vaccinated"
                  number={summaryData.userVaccinated.toLocalString('de-DE')}
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
          <Card elevation={0}>
            <CardContent>
              {summaryData && (
                <SummaryInfo
                  title="User vaccinated"
                  number={summaryData.userVaccinated.toLocalString('de-DE')}
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
          <Card elevation={0}>
            <CardContent>
              {summaryData && (
                <SummaryInfo
                  title="User vaccinated"
                  number={summaryData.userVaccinated.toLocalString('de-DE')}
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
      </Grid>
    </Stack>
  );
}

export default Dashboard;

const SummaryInfo = ({ title, number, icon }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Stack spacing={2}>
        <Typography variant="body2" fontWeight={'600'}>
          {title}
        </Typography>
        <Typography variant="h4" fontWeight={'600'}>
          {number}
        </Typography>
      </Stack>
      <div>{icon}</div>
    </Box>
  );
};
