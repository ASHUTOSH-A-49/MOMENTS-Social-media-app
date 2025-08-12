import {React,useState,useEffect} from 'react'
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import useStyles from './styles.js';
import Posts from '../Posts/Posts.jsx';
import Form from '../Form/Form.jsx';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts.js';
const Home = () => {
    const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <div>
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
    </div>
  )
}

export default Home
