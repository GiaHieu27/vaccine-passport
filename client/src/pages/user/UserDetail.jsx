import { Grid, Stack } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import userApi from '../../api/userApi';
import PageHeader from '../../components/User/PageHeader';
import UserInfo from '../../components/User/UserInfo';

function UserDetail() {
  const { id } = useParams();

  const [user, setUser] = React.useState();

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

  return (
    <>
      <PageHeader title={'Userdetail'} />
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <Stack spacing={4}>{user && <UserInfo user={user} />}</Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default UserDetail;
