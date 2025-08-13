import React from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import moments from '../../images/moments.jpg';
import { useNavbarStyles } from './styles.js';

const Navbar = () => {
  const user = null;
  const { appBar, brandContainer, heading, image, toolbar, profile, userName, purple } = useNavbarStyles();

  return (
    <AppBar sx={appBar} position="static" color="inherit">
      <Box sx={brandContainer}>
        <Typography component={Link} to="/" sx={heading} variant="h4" align="center">
          Moments
        </Typography>
        <img style={image} src={moments} alt="moments" height="60" />
      </Box>
      <Toolbar sx={toolbar}>
        {user ? (
          <Box sx={profile}>
            <Avatar sx={purple} alt={user.result.name} src={user.result.imageUrl}>
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography sx={userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button variant="contained" sx={{ marginLeft: '10px' }} color="secondary">
              Logout
            </Button>
          </Box>
        ) : (
          <Button component={Link} color="primary" to="/auth" variant="contained">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;