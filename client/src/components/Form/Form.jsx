import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts.js';
import { useFormStyles } from './styles';
import { useNavigate } from 'react-router-dom';

const Form = ({ currentId, setCurrentId }) => {
  const { paper, form, fileInput, buttonSubmit } = useFormStyles();
  const dispatch = useDispatch();
  const initialState = { title: '', message: '', tags: '', selectedFile: '' };
  const [postData, setPostData] = useState(initialState);
  const user = JSON.parse(localStorage.getItem('profile'))
  const navigate = useNavigate()

  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );

  useEffect(() => {
    if (post) {
      setPostData({
        ...post,
        // The tags logic is slightly different based on the initial value,
        // this handles both array and string inputs.
        tags: Array.isArray(post.tags)
          ? post.tags
          : (post.tags || '').split(',').map((tag) => tag.trim()),
        selectedFile: post.selectedFile || '',
      });
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = { ...postData };

    if (currentId && !postData.selectedFile && post?.selectedFile) {
      updatedData.selectedFile = post.selectedFile;
    }

    if (currentId) {
      dispatch(updatePost(currentId, {...updatedData,name:user?.result?.name}));
      
    } else {
      dispatch(createPost({...updatedData,name:user?.result?.name},navigate));
    }

    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData(initialState);
  };

  if(!user?.result?.name){
    return(
      <Paper sx={paper}>
        <Typography variant='h6' align='center'>
          Please sign in to create moments and interact to others' moments
        </Typography>

      </Paper>
    );
  }

  return (
    <Paper sx={paper}>
      <Box 
        component="form"
        autoComplete="off"
        noValidate
        sx={form}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? 'Editing' : 'Creating'} a moment
        </Typography>

        {/* <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
        /> */}
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (comma separated)"
          fullWidth
          value={Array.isArray(postData.tags) ? postData.tags.join(',') : postData.tags}
          onChange={(e) =>
            setPostData({
              ...postData,
              tags: e.target.value.split(',').map((tag) => tag.trim()),
            })
          }
        />

        <Box sx={fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </Box>

        <Button
          sx={buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </Box>
    </Paper>
  );
};

export default Form;