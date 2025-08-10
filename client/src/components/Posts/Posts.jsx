import React from 'react'
import Post from './Post/Post.jsx'
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { Grid,CircularProgress } from '@material-ui/core';
const Posts = ({setCurrentId}) => {
  const classes = useStyles();
  const posts = useSelector((state)=>state.posts)
  console.log(posts)
  return (
    !posts.length?<CircularProgress/>:(
      <Grid container className={classes.container} spacing={3} alignItems='stretch'>
        {
          posts.map((post)=>(
            <Grid key = {post._id} item xs ={12} sm={6}>
              {/* full space is 12 xs 12 means it will take full width on mobile phones (xs devices and half width '6' on sm devices like pc etc ) */}

              <Post post = {post} setCurrentId = {setCurrentId}/>
            </Grid>
          ))
        }
      </Grid>
    )
    
  )
}

export default Posts
