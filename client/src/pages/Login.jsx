import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, FormControl, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { isAuthenticated } from '../handlers/authHandler';
import bgImg from '../assets/images/login-bg.png';
import authApi from '../api/authApi';

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginErr, setLoginErr] = useState('');
  const [usernameErr, setUsernameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [onSubmit, setOnSubmit] = useState(false);

  const handleSubmitLogin = async () => {
    if (onSubmit) return;
    setLoginErr(undefined);
    const checkErr = {
      username: username.trim().length === 0,
      password: password.trim().length === 0,
    };
    setUsernameErr(checkErr.username);
    setPasswordErr(checkErr.password);
    if (checkErr.username || checkErr.password) return;

    const params = {
      username,
      password,
    };
    setOnSubmit(true);
    try {
      const res = await authApi.login(params);
      localStorage.setItem('token', res.token);
      setOnSubmit(false);
      navigate('/');
    } catch (error) {
      console.log(error.response);
      setLoginErr(error.response.data.message);
      setOnSubmit(false);
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      const res = await isAuthenticated();
      if (res) return navigate('/');
    };
    checkToken();
  }, []);

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'flex-start',
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'right',
      }}
    >
      <Card
        sx={{
          maxWidth: '600px',
          width: '100%',
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: '100%',
            maxWidth: '400px',
            '& .MuiTextField-root': { mb: 5 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            margin: 'auto',
            padding: '5rem 1rem',
          }}
        >
          <Typography
            variant="h5"
            textAlign="center"
            mb="4rem"
            fontWeight="700"
          >
            VACCINE PASSPORT
          </Typography>
          <FormControl fullWidth>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={usernameErr}
              autoFocus={true}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordErr}
            />
          </FormControl>
          {loginErr && (
            <FormControl>
              <Typography color={'error'}>{loginErr}</Typography>
            </FormControl>
          )}
          <LoadingButton
            variant="contained"
            fullWidth
            size="large"
            sx={{ marginTop: '1rem' }}
            onClick={handleSubmitLogin}
          >
            Sign in
          </LoadingButton>
        </Box>
      </Card>
    </Box>
  );
}

export default Login;
