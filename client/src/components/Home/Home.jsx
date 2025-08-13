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
          alignItems="stretch"
          spacing={3}
        >
        
          <Grid sx={{ xs: 12, sm: 8 }}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid sx={{ xs: 12, sm: 4 }}>
            <Form setCurrentId={setCurrentId} currentId={currentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;