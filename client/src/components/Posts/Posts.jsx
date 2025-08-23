import React from 'react';
import { Grid, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import Post from './Post/Post.jsx';

const Posts = ({ setCurrentId }) => {
  const {posts} = useSelector((state) => state.posts);
  
  return (
    !posts?.length ? (
      <CircularProgress />
    ) : (
      <Grid container spacing={1} alignItems='stretch' >
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={4} md={4} lg={3}
          sx={{ flexGrow: 1, alignItems: 'stretch'}}
          >
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;