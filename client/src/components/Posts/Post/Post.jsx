import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { usePostStyles } from './styles';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const { card, media, overlay, overlay2, details, title, cardActions } = usePostStyles();

  return (
    <Card sx={card}>
      <CardMedia sx={media} image={post.selectedFile} title={post.title} />
      <Box sx={overlay}>
        <Typography variant='h6'>{post.name}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </Box>
      <Box sx={overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
          <MoreHorizIcon fontSize='default' />
        </Button>
      </Box>
      <Box sx={details}>
        <Typography variant='body2' color='text.secondary'>
          {(post.tags || []).map((tag) => `#${tag} `).join('')}
        </Typography>
      </Box>
      <Typography sx={title} variant='h5' gutterBottom>{post.title}</Typography>
      <CardContent>
        <Typography variant='body2' component='p'>{post.message}</Typography>
      </CardContent>
      <CardActions sx={cardActions}>
        <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}>
          <ThumbUpAltIcon fontSize='small' />
          &nbsp;Like&nbsp;
          {post.likeCount}
        </Button>
        <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize='small' />
          &nbsp;Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;