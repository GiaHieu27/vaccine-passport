import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import AppLayOut from './pages/AppLayOut';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import User from './pages/user';
import UserCreate from './pages/user/UserCreate';
import UserDetail from './pages/user/UserDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="" element={<AppLayOut />}>
          <Route index element={<Dashboard />} />
          <Route path="user" element={<User />} />
          <Route path="user/create" element={<UserCreate />} />
          <Route path="user/:id" element={<UserDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
