import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
import Vaccine from './pages/vaccine';
import VaccineDetail from './pages/vaccine/VaccineDetail';
import Place from './pages/place';
import PlaceDetail from './pages/place/PlaceDetail';
import QRScan from './pages/qrscan';

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />

      <Route path="" element={<AppLayOut />}>
        <Route index element={<Dashboard />} />
        <Route path="user" element={<User />} />
        <Route path="user/create" element={<UserCreate />} />
        <Route path="user/:id" element={<UserDetail />} />

        <Route path="vaccine" element={<Vaccine />} />
        <Route path="vaccine/:id" element={<VaccineDetail />} />

        <Route path="place" element={<Place />} />
        <Route path="place/:id" element={<PlaceDetail />} />

        <Route path="qr-scan" element={<QRScan />} />
      </Route>
    </Routes>
  );
}

export default App;
