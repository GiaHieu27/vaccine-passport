import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import QRCode from 'react-qr-code';

import userApi from '../../api/userApi';
import CustomDialog from '../../components/CustomDialog';
import PageHeader from '../../components/PageHeader';
import UserInfo from '../../components/User/UserInfo';
import UserVaccinated from '../../components/User/UserVaccinated';
import CustomBreadcrumds from '../../components/CustomBreadcrumds';

function UserDetail() {
  const { id } = useParams();
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const [user, setUser] = React.useState();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogType, setDialogType] = React.useState('');
  const [dialogText, setDialogText] = React.useState('');

  React.useEffect(() => {
    const getUser = async () => {
      try {
        const res = await userApi.getOneUser(id);
        setUser(res);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  const onUpdateSuccess = () => {
    console.log('success');
    setDialogType('success');
    setDialogText('User updated');
    setDialogOpen(true);
  };

  const onUpdateFalse = (message) => {
    console.log('false');
    setDialogType('error');
    setDialogText(message || 'User update fail');
    setDialogOpen(true);
  };

  return (
    <>
      <CustomBreadcrumds pathnames={pathnames} name="user-detail" />
      <PageHeader title={'Userdetail'} />
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Stack spacing={4}>
            {user && (
              <UserInfo
                user={user}
                onUpdateSuccess={onUpdateSuccess}
                onUpdateFalse={onUpdateFalse}
              />
            )}
            {user && <UserVaccinated user={user} />}
          </Stack>
        </Grid>

        <Grid item xs={3}>
          <Card elevation={1}>
            <CardContent>
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                {user && (
                  <QRCode value={user._id} id="qrcode" size={200} level="H" />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <CustomDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        type={dialogType}
        showIcon
        content={
          <Typography variant="subtitle1" textAlign={'center'}>
            {dialogText}
          </Typography>
        }
        actions={
          <Box
            sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            <Button variant="contained" onClick={() => setDialogOpen(false)}>
              OK
            </Button>
          </Box>
        }
      />
    </>
  );
}

export default UserDetail;
