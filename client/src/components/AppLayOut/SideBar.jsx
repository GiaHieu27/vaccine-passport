import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  colors,
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';

const sideBarItems = [
  {
    text: 'Dashboard',
    path: '/',
    icon: <DashboardCustomizeOutlinedIcon />,
  },
  {
    text: 'User',
    path: '/user',
    icon: <PersonOutlineOutlinedIcon />,
  },
  {
    text: 'Place',
    path: '/place',
    icon: <PlaceOutlinedIcon />,
  },
  {
    text: 'Vaccine',
    path: '/vaccine',
    icon: <HealthAndSafetyOutlinedIcon />,
  },
  {
    text: 'QR Scan',
    path: '/qr-scan',
    icon: <QrCodeScannerOutlinedIcon />,
  },
];

function SideBar() {
  const location = useLocation();
  const sideBarWidth = 300;

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const activeItem = sideBarItems.findIndex(
      (item) =>
        window.location.pathname.split('/')[1] === item.path.split('/')[1]
    );
    setActiveIndex(activeItem);
  }, [location]);

  return (
    <Drawer
      variant="permanent"
      container={window.document.body}
      sx={{
        width: sideBarWidth,
        height: '100vh',
        boxShadow: 3,
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: sideBarWidth,
          borderRight: 0,
        },
      }}
    >
      <Toolbar />
      <List>
        {sideBarItems.map((item, i) => (
          <ListItemButton
            key={`sidebar-key-${i}`}
            selected={i === activeIndex}
            component={Link}
            to={item.path}
            sx={{
              width: 'calc(100% - 20px)',
              margin: '5px auto',
              borderRadius: '10px',
              '&.Mui-selected': {
                color: colors.blue.A700,
              },
              '&.Mui-selected:hover': {
                backgroundColor: colors.blue[200],
              },
            }}
          >
            <ListItemIcon sx={{ color: i === activeIndex && colors.blue.A700 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                '& span': {
                  fontWeight: i === activeIndex && '500',
                },
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

export default SideBar;
