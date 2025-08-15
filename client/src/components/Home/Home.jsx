import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@mui/material';
import Posts from '../Posts/Posts.jsx';
import Form from '../Form/Form.jsx';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts.js';
import { useHomeStyles } from './styles.js';

const Home = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const { mainContainer } = useHomeStyles();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          container
          sx={mainContainer}
          justifyContent="space-between"
          alignItems="flex-start" // Add this prop
          spacing={3}
        >
          {/* Posts section on the left */}
          <Grid item xs={12} sm={8} md={8} lg={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          {/* Form section on the right */}
          <Grid item xs={12} sm={4} md={4} lg={3}>
            <Form setCurrentId={setCurrentId} currentId={currentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;