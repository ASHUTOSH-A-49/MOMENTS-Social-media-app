import React from 'react';
import { Container } from '@mui/material'; // Updated import from @mui/material
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './components/Home/Home.jsx';
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
import Auth from './components/Auth/Auth.jsx';
import PostDetails from './components/PostDetails/PostDetails.jsx';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" exact Component={()=><Navigate to="/posts"/>} />
          <Route path = "/posts" exact Component={Home}/>
          <Route path = "/posts/search" exact Component={Home}/>
          <Route path = "/posts/:id/" Component={PostDetails}/>
          <Route path="/auth" exact Component={()=>(!user?<Auth/>:<Navigate to="/posts" />)} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;