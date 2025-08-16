import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Button, Toolbar, Typography, Avatar, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavbarStyles } from './styles';
import { useDispatch } from 'react-redux';
import {useNavigate,useLocation} from 'react-router-dom'


import moments from '../../images/moments.jpg';

const Navbar = () => {
  const { 
    appBar, brandContainer, heading, image, toolbar, 
    profile, hamburgerMenu, mobileProfile, userNameMobile, 
    logoutButtonMobile, purple ,userName
  } = useNavbarStyles();


  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user,setUser] = useState(JSON.parse(
    localStorage.getItem('profile')))
  const location  = useLocation()
  useEffect(()=>{
    // const token = user?.token
    //check for the jsonwebtoken (for manual signup)


    //for google signup
    setUser(JSON.parse(
    localStorage.getItem('profile')))
  },[location])

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

    const dispatch = useDispatch()
    const history = useNavigate()
    const logout = ()=>{
      dispatch({type:'LOGOUT'})
      history('/')
      setUser(null)
  }

  return (
    <AppBar sx={appBar} position="static" color="inherit">
      {/* Container for logo and title */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img style={image} src={moments} alt="moments" />
        <Typography component={Link} to="/" sx={heading} variant="h4" align="center">
          Moments
        </Typography>
      </Box>

      {/* Toolbar for user profile and hamburger menu */}
      <Toolbar sx={toolbar}>
        {user ? (
          <>
            <Box sx={profile}>
              <Avatar sx={purple} alt={user.result.name} src={user.result.imageUrl}>
                {user.result.name.charAt(0)}
              </Avatar>
              <Typography sx={userName} variant="h6">
                {user.result.name}
              </Typography>
              <Button variant="contained" sx={{ marginLeft: '10px' }} color="secondary"
              onClick={logout}>
                Logout
              </Button>
            </Box>

            <IconButton
              sx={hamburgerMenu}
              onClick={handleMobileMenuToggle}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>

            {mobileMenuOpen && (
              <Box sx={mobileProfile}>
                <Avatar sx={purple} alt={user.result.name} src={user.result.imageUrl}>
                  {user.result.name.charAt(0)}
                </Avatar>
                <Typography sx={userNameMobile} variant="h6">
                  {user.result.name}
                </Typography>
                <Button sx={logoutButtonMobile} variant="contained" color="secondary"
                onClick={logout}>
                  Logout
                </Button>
              </Box>
            )}
          </>
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