import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button } from '@mui/material';
import { Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/User/PageHeader';

function UserCreate() {
  const navigate = useNavigate();
  return (
    <Box width={'40%'}>
      <PageHeader
        title={'Create user'}
        rightContent={
          <Stack direction="row" spacing={2}>
            <Button variant="text" onClick={() => navigate('/user')}>
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              // onClick={createUser}
              // loading={onSubmit}
            >
              Create
            </LoadingButton>
          </Stack>
        }
      />
    </Box>
  );
}

export default UserCreate;
