import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, Box, Chip, Stack } from '@mui/material';
import Posts from '../Posts/Posts.jsx';
import Form from '../Form/Form.jsx';
import { useDispatch } from 'react-redux';
import { getPosts,getPostsBySearch } from '../../actions/posts.js';
import { useHomeStyles } from './styles.js';
import { useNavigate, useLocation } from 'react-router-dom';

import Paginate from '../Pagination.jsx';

function UseQuery() {
  return new URLSearchParams(useLocation().search);
}

const ChipInput = ({ label, value, onAdd, onDelete, ...other }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (event) => {
    if ((event.key === 'Enter' || event.key === ',') && inputValue.trim()) {
      event.preventDefault();
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  const handleDelete = (chipToDelete) => () => {
    onDelete(chipToDelete);
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      label={label}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
      InputProps={{
        startAdornment: (
          <Stack
            direction="row"
            spacing={1}
            sx={{ flexWrap: 'wrap', marginRight: 1 }}
          >
            {value.map((chip, index) => (
              <Chip
                key={index}
                label={chip}
                onDelete={handleDelete(chip)}
                variant="outlined"
                sx={{
                  margin: '0',
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                }}
              />
            ))}
          </Stack>
        ),
      }}
      {...other}
    />
  );
};


const Home = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const { mainContainer, pagination, appBarSearch } = useHomeStyles();
  const query = UseQuery();
  const navigate = useNavigate();
  const searchQuery = query.get('searchQuery');

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      //search post
    }
  };


  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));
  const searchPost = ()=>{
    if(search.trim() || tags){
      //dispatch search post
      dispatch(getPostsBySearch({search,tags: tags.join(',')}));
      //routing
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
    }else{
      navigate('/')
    }
  }

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Grow in>
      <Container maxWidth='lg' >
        <Grid 
          container
          sx={mainContainer}
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={3}
        >
          {/* Posts section on the left */}
          <Grid item xs={12} sm={9} md={9} lg={9} >
            <Posts setCurrentId={setCurrentId} />
          </Grid>

          {/* Form section on the right */}
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <AppBar sx={appBarSearch} position='static' color='inherit'>
              <TextField
                name="search"
                variant='outlined'
                label="Search Moments"
                fullWidth
                onKeyDown={handleKeyPress}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                label="Search Tags"
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                style={{ margin: '10px 0' }}
              />
              <Button onClick={searchPost} color='primary' variant='contained'>
                Search
              </Button>
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