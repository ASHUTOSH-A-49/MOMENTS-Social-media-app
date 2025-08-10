import React, { useEffect,useState } from 'react'
import {Container,AppBar,Typography ,Grow,Grid} from '@material-ui/core'
import moments from './images/moments.jpg'
import Posts from './components/Posts/Posts.jsx'
import Form from './components/Form/Form.jsx'
import useStyles from './styles.js'
import { useDispatch } from 'react-redux'

//useDispatch HOOK is used to dispatch an action 

import {getPosts}  from './actions/posts.js'


const App = () => {
  const dispatch = useDispatch();
  // define dispatch 
  const [currentId,setCurrentId] = useState(null);
  useEffect(() => {
  dispatch(getPosts()); 
}, [dispatch]);

  const classes = useStyles();
  return (
    
    <Container maxWidth='lg'>
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography className={classes.heading} variant='h3' align='center'>
            Moments
        </Typography>
        <img className={classes.image} src={moments} alt="moments" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent = "space-between" alignItems='stretch' spacing={3}>
            <Grid>
              <Posts setCurrentId = {setCurrentId}/>
            </Grid>
            <Grid>
              <Form setCurrentId = {setCurrentId} currentId={currentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default App
