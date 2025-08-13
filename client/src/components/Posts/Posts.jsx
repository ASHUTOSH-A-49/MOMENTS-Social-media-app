import React from 'react';
import { Grid, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import Post from './Post/Post.jsx';

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  
  return (
    !posts.length ? (
      <CircularProgress />
    ) : (
      <Grid container spacing={3} alignItems='stretch'>
        {posts.map((post) => (
          // Using the new MUI v5 Grid syntax.
          <Grid key={post._id} sx={{ xs: 12, sm: 4, md: 4, lg: 2 }}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;