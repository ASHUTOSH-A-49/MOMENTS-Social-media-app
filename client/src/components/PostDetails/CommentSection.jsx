import React,{useState,useRef, useEffect} from 'react'
import { Typography,TextField,Button,Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { usePostDetailsStyles } from './styles'
import { commentPost } from '../../actions/posts'

const CommentSection = ({post}) => {
    const {commentsOuterContainer,commentsInnerContainer} = usePostDetailsStyles()
    console.log("its the comment section component working!!!")
    const dispatch = useDispatch()

    const [comments,setComments] = useState(post?.comments || [])
    const [comment,setComment] = useState('')
    const commentsRef = useRef(null);
    const user = JSON.parse(localStorage.getItem('profile'))
    const handleComment = async()=>{
        const finalComment = `${user.result.name}:${comment}`;
        await dispatch(commentPost(finalComment,post._id))
        setComment('');
        if (commentsRef.current) {
            commentsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        console.log(comments);
    }
  return (
    <Box>
        <Box sx={commentsOuterContainer}>
            <Box sx={commentsInnerContainer}>
                <Typography gutterBottom variant="h6">Comments</Typography>
                {post?.comments?.map((c,i)=>(
                    <Typography key={i} gutterBottom variant='subtitle1'><strong>{c.split(':')[0]}</strong> {c.split(':')[1]}</Typography>
                ))}
                <div ref={commentsRef} />
            </Box>
            {user?.result?.name &&(
               <div style={{width:'70%'}}>
                <Typography>Write a comment</Typography>
                <TextField
                fullWidth
                rows={4}
                variant='outlined'
                multiline
                value = {comment}
                onChange={(e)=>setComment(e.target.value)}
                />

                <Button
                style={{marginTop:'10px'}}
                fullWidth
                disabled = {!comment}
                variant='contained'
                onClick={handleComment}
                >
                    Add comment
                </Button>
            </div> 
            )}
            

        </Box>
    </Box>
  )
}

export default CommentSection
