import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../handlers/authHandler';

function AppLayOut() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const res = await isAuthenticated();
      if (!res) return navigate('/login');
    };
    checkToken();
  }, []);

  return <div>AppLayOut</div>;
}

export default AppLayOut;
