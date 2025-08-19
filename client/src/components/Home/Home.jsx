import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid ,Paper,AppBar,TextField,Button} from '@mui/material';
import Posts from '../Posts/Posts.jsx';
import Form from '../Form/Form.jsx';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts.js';
import { useHomeStyles } from './styles.js';
import { useNavigate,useLocation } from 'react-router-dom';
import Chip from '@mui/material/Chip'



import Paginate from '../Pagination.jsx';
import { usePaginationStyles } from '../styles.js';

function UseQuery(){
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const { mainContainer,pagination,appBarSearch } = useHomeStyles();
  const query = UseQuery()
  const navigate = useNavigate()
  const searchQuery = query.get('searchQuery')

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Grow in>
      <Container maxWidth='lg'>
        <Grid
          container
          sx={mainContainer}
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={3}
        >
          {/* Posts section on the left */}
          <Grid  sx={{xs:12,sm:7,md:9,lg:9}}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          {/* Form section on the right */}
          <Grid  sx={{xs:12,sm:5,md:3,lg:3}}>
            <AppBar sx={appBarSearch} position='static' color='inherit'>
              <TextField
                name="search"
                variant='outlined'
                label="Search Moments"
                fullWidth
                value="TEST"
                onChange={() => {}}
              />
            </AppBar>
            <Form setCurrentId={setCurrentId} currentId={currentId} />
            <Paper>
              <Paginate sx={pagination} elevation={6} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;