import React from 'react';
import { Container } from '@mui/material'; // Updated import from @mui/material
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './components/Home/Home.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth/Auth.jsx';

const App = () => {

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/auth" exact element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;