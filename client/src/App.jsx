import React, { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import moments from './images/moments.jpg';
import Posts from './components/Posts/Posts.jsx';
import Form from './components/Form/Form.jsx';
import useStyles from './styles.js';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts.js';

const App = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h3" align="center">
          Moments
        </Typography>
        <img className={classes.image} src={moments} alt="moments" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container className={classes.mainContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
            {/* Left Column: Posts */}
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>

            {/* Right Column: Form */}
            <Grid item xs={12} sm={4}>
              <Form setCurrentId={setCurrentId} currentId={currentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
