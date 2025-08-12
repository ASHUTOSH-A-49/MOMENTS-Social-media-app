import React, { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import moments from './images/moments.jpg';
import Posts from './components/Posts/Posts.jsx';
import Form from './components/Form/Form.jsx';
import useStyles from './styles.js';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts.js';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './components/Home/Home.jsx';

const App = () => {
  

  return (
    <Container maxWidth="lg">
      <Navbar/>
      <Home/>
    </Container>
  );
};

export default App;
