import React,{useState} from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box ,ButtonBase} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined'
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { usePostStyles } from './styles';
import { useNavigate, useLocation } from 'react-router-dom';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const { card, media, overlay, overlay2, details, title, cardActions,cardAction } = usePostStyles();
  const user = JSON.parse(localStorage.getItem('profile'))

  //making like action faster
  const [likes,setLikes]  = useState(post?.likes);
  const userId = user?.result?.googleId || user?.result?._id
  const hasLikedPost = likes.find((like) => like === (userId))
  
  const handleLike = async() => {
    dispatch(likePost(post._id))
    // check if the current user liked the post or not? 
    
    if(hasLikedPost){
      setLikes(likes.filter((id)=> id!== (userId)))
    }else{
      // if not liked it then 
      setLikes([...likes,userId])

    }
  }
  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }
    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  }

  const navigate = useNavigate();
 const openPost = () => {
    navigate(`/posts/${post._id}`);
};

// {
// ERROR FIXES 
//  The issue is with the navigation path. The navigate function in react-router-dom uses relative paths by default.

// When your application is on the /posts route and the openPost function is called with navigate(posts/${post._id}), it interprets the path as relative to the current location. This incorrectly creates the URL /posts/posts/:id.

// The Fix
// To resolve this, you need to tell the navigate function to use an absolute path that always starts from the root of your application. You do this by adding a leading forward slash (/) to the path.

// Here is the corrected openPost function:

// JavaScript

// const openPost = () => {
//     navigate(`/posts/${post._id}`);
// };
// By adding the leading slash, you are ensuring that no matter what route you are currently on, the navigation will always take you to the correct path, domain.com/posts/:id, preventing the URL from being duplicated.
// }
  return (
    <Card sx={card}>
      <ButtonBase onClick={openPost} sx={cardAction}>

      
      <CardMedia sx={media} image={post.selectedFile} title={post.title} />
      <Box sx={overlay}>
        <Typography variant='h6'>{post.name}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </Box>
      {(user?.result?.googleId===post?.creator || user?.result?._id===post?.creator)&&(
          <Box sx={overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
          <MoreHorizIcon fontSize='default' />
        </Button>
          </Box>
        )}
      
      <Box sx={details}>
        <Typography variant='body2' color='text.secondary'>
          {(post.tags || []).map((tag) => `#${tag} `).join('')}
        </Typography>
      </Box>
      <Typography sx={title} variant='h5' gutterBottom>{post.title}</Typography>
      <CardContent sx={{ minHeight: 100, overflow: 'hidden' }}>
        <Typography variant='body2' component='p'
        sx={{ 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            whiteSpace: 'normal', // Allow text to wrap
            wordBreak: 'break-word' // Prevent long words from overflowing
          }}
        >{post.message}</Typography>
      </CardContent>
      </ButtonBase>
      <CardActions sx={cardActions}>
        <Button size="small" color="primary" onClick={handleLike}>
          <Likes/>
        </Button>
        {(user?.result?.googleId===post?.creator || user?.result?._id===post?.creator)&&(
          <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize='small' />
          &nbsp;Delete
        </Button>
        )}
        
      </CardActions>
    </Card>
  );
};

export default Post;