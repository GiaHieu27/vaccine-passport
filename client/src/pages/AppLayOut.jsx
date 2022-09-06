import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, colors, Toolbar } from '@mui/material';

import { isAuthenticated } from '../handlers/authHandler';
import Loading from '../components/Loading';
import TopNav from '../components/TopNav';

function AppLayOut() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const res = await isAuthenticated();
      if (!res) return navigate('/login');
      setLoading(false);
    };
    checkToken();
  }, []);

  return loading ? (
    <Box sx={{ width: '100%', height: '100vh' }}>
      <Loading />
    </Box>
  ) : (
    <Box>
      <TopNav />
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: colors.grey['100'],
            width: 'max-content',
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default AppLayOut;
