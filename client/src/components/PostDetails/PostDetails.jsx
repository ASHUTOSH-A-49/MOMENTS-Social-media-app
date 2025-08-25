import React,{useEffect} from 'react'
import { Paper,Typography,CircularProgress,Divider,Grid } from '@mui/material'
import { useDispatch,useSelector } from 'react-redux'
import moment from 'moment'
import { useParams,useNavigate } from 'react-router-dom'
import { usePostDetailsStyles } from './styles'
import { getPost,getPostsBySearch } from '../../actions/posts'
import CommentSection from './CommentSection'

const PostDetails = () => {
  const {post,posts,isLoading} = useSelector((state)=>state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const {media,card,section,imageSection,recommendedPostsStyle,loadingPaper} = usePostDetailsStyles();

  const openPost = (_id) => navigate(`/posts/${_id}`);
  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [post]);

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} sx={loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }
  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <Grid container sx={card} spacing={3}> 
              <Grid item xs={12} sm={6} sx={imageSection}> {/* Grid item for imageSection */}
                    <img sx={media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} style={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '600px', // Prevents images from becoming too tall
                        borderRadius: '20px'
                      }}/>
                </Grid>
                <Grid item xs={12} sm={6} sx={section}> {/* Grid item for section */}
                    <Typography variant="h3" component="h2">{post.title}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                    <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                    <Typography variant="h6">Created by: {post.name}</Typography>
                    <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <CommentSection post={post} />
                    <Divider style={{ margin: '20px 0' }} />
                </Grid>
                
            </Grid>
            {!!recommendedPosts.length && (
                <div sx={section}>
                    <Typography gutterBottom variant="h5">You might also like:</Typography>
                    <Divider />
                    <div sx={recommendedPostsStyle}>
                        {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
                            <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                                <Typography gutterBottom variant="h6">{title}</Typography>
                                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                                <img src={selectedFile} alt='image' width="200px" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Paper>
  )
}

export default PostDetails
