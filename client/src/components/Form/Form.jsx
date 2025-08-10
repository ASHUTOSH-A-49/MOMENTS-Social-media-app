import React, { useState,useEffect } from 'react'
import useStyles from './styles';
import { TextField,Button,Typography,Paper } from '@material-ui/core';
import FileBase from 'react-file-base64'
import {useDispatch,useSelector}  from 'react-redux'
import { createPost,updatePost,getPosts } from '../../actions/posts.js';

const Form = ({currentId,setCurrentId}) => {
  const classes = useStyles();  //create useStyles() object
  const dispatch = useDispatch(); //create useDispatch() object
  const initialState = { creator: '', title: '', message: '', tags: '', selectedFile: '' };

const [postData, setPostData] = useState(initialState);
const post = useSelector((state)=>currentId?state.posts.find((p)=>p._id===currentId):null)
useEffect(() => {
  if (post) {
    setPostData({
      ...post,
      tags: Array.isArray(post.tags) ? post.tags : (post.tags || "").split(',').map(tag => tag.trim()),
      selectedFile: post.selectedFile || '' // preserve old image
    });
  }
}, [post]);




const handleSubmit = (e) => {
  e.preventDefault();

  const updatedData = { ...postData };

  // Keep old image if no new one uploaded
  if (currentId && !postData.selectedFile && post?.selectedFile) {
    updatedData.selectedFile = post.selectedFile;
  }

  if (currentId) {
    dispatch(updatePost(currentId, updatedData));
  } else {
    dispatch(createPost(updatedData));
  }

  clear();
};






const clear = () => {
  setCurrentId(null);
  setPostData(initialState);
};
 
  return (
    <div>
      <Paper className={classes.paper}>
        <form 
        autoComplete='off' 
        noValidate 
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
        >
          <Typography variant='h6' >
            {currentId?'Editing':'Creating'} a moment
          <TextField  name='creator'   variant='outlined'  label = "Creator"  fullWidth  value = {postData.creator} onChange = {(e)=>setPostData({...postData ,creator:e.target.value})}
          // once we spread the  postData then only the specific property is changed and all other data is going to persist 
          />
          <TextField  name='title'   variant='outlined'  label = "Title"  fullWidth value = {postData.title} onChange = {(e)=>setPostData({...postData ,title:e.target.value})}
          // once we spread the  postData then only the specific property is changed and all other data is going to persist 
          />
          <TextField  name='message'   variant='outlined'  label = "Message"  fullWidth value = {postData.message} onChange = {(e)=>setPostData({...postData ,message:e.target.value})}
          // once we spread the  postData then only the specific property is changed and all other data is going to persist 
          />
          <TextField
  name="tags"
  variant="outlined"
  label="Tags (comma separated)"
  fullWidth
  value={postData.tags}
  onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',').map(tag => tag.trim()) })}
          // once we spread the  postData then only the specific property is changed and all other data is going to persist 
          />

          <div className={classes.fileInput}>
              <FileBase
  type="file"
  multiple={false}
  onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
/>


          </div>


          <Button className={classes.buttonSubmit} variant="contained" color="primary" size = "large" type = "submit" fullWidth>Submit
          </Button>
          <Button variant="contained" color="secondary" size = "small" onClick={clear} fullWidth>Clear</Button>

          </Typography>

        </form>
      </Paper>
    </div>
  )
}

export default Form
