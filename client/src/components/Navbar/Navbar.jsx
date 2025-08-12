import React from 'react'
import { Container, AppBar, Typography, Grow, Grid, Toolbar, Avatar, Button} from '@material-ui/core';
import useStyles from './styles.js';
import {Link, Links} from 'react-router-dom'
import moments from '../../images/moments.jpg';

const Navbar = () => {
    const classes = useStyles();
    const user = null;
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
            <Typography  className={classes.heading} variant="h3" align="center">
              Moments
            </Typography>
            <img className={classes.image} src={moments} alt="moments" height="60" />
            
        </div>
         <Toolbar className={classes.toolbar}>
              {
                user ? (
                   //if user exists 
                   <div className={classes.profile}>
                    <Avatar className={classes.purple} alt = {user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                      <Typography className={classes.userName} variant = 'h6'>
                          {user.result.name}
                      </Typography>
                      <Button variant='contained' className = {classes.logout} color = "secondary">Logout</Button>
                    </div>
                )  : (
                    //if not 
                    <Button component={Link} color = "primary" to = '/auth'>Sign In</Button>
                    
                )
              }
            </Toolbar>   
    </AppBar>
  )
}

export default Navbar

