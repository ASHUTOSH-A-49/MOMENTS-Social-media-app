import React, { useState } from 'react';
import { Button, Paper, Grid, Typography, Container, Avatar, Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';
import { useAuthStyles } from './styles';
import {useNavigate} from 'react-router-dom'
// auth imports
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import {useDispatch} from 'react-redux'
import {signin,signup} from '../../actions/auth'

// Access the environment variable securely using Vite's import.meta.env
const clientId = import.meta.env.VITE_OAUTH_CLIENT_ID;

const Auth = () => {
  const { paper, form, avatar, submit, gridContainer } = useAuthStyles();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialState = {firstName:'',lastName:'',email:'',password:'',confirmPassword:''}

  const [formData,setFormData] = useState(initialState)
  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignUp){
      dispatch(signup(formData,navigate))
    }else{
      dispatch(signin(formData,navigate))
    }
  };

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value}) 
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };

  const googleSuccess = async(res)=>{
    const decoded= jwtDecode(res?.credential);
    // console.log(decoded)  //decode the JWT recieved from the authentication and then it will give object that has various values like email username etc
    
//     {iss: 'https://accounts.google.com', azp: '316768288829-rjo9sihf2t4tfcbad51rlo5k04jrc8p1.apps.googleusercontent.com', aud: '316768288829-rjo9sihf2t4tfcbad51rlo5k04jrc8p1.apps.googleusercontent.com', sub: '104344770709399916525', email: 'ashupoco66@gmail.com', …}
// aud
// : 
// "316768288829-rjo9sihf2t4tfcbad51rlo5k04jrc8p1.apps.googleusercontent.com"
// azp
// : 
// "316768288829-rjo9sihf2t4tfcbad51rlo5k04jrc8p1.apps.googleusercontent.com"
// email
// : 
// "ashupoco66@gmail.com"
// email_verified
// : 
// true
// exp
// : 
// 1755097525
// given_name
// : 
// "Ashutosh"
// iat
// : 
// 1755093925
// iss
// : 
// "https://accounts.google.com"
// jti
// : 
// "6b9c635b6a82263e8bcd921ccb509cbca9f5bc9f"
// name
// : 
// "Ashutosh"
// nbf
// : 
// 1755093625
// picture
// : 
// "https://lh3.googleusercontent.com/a/ACg8ocL2EcoZ8-2DrPdAIamO5DDcTTKs7wbsTwO_og6uP6jMXKBcMJeZ=s96-c"
// sub
// : 
// "104344770709399916525"
  

//Note : the sub value is unique for every user so we will use it as unique identifier
 const token = res?.credential;


const name = decoded?.name
const email = decoded?.email
const givenName = decoded?.given_name
const imageUrl = decoded?.picture
const googleId = decoded?.sub


const result = {
  name:name,
  email:email,
  givenName:givenName,
  imageUrl:imageUrl,
  googleId:googleId
}


try {
  dispatch({type:'AUTH',data:{result,token}})
  //once dispatched redirect to the home for this do following
  navigate('/')
} catch (error) {
  console.log(error)
}
  }

  const googleFailure = (err)=>{

    console.log(err)
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Container component="main" maxWidth="xs" sx={gridContainer}>
        <Paper sx={paper} elevation={3}>
          <Avatar sx={avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography variant="h5">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Typography>

          <Box component="form" sx={form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignUp && (
                <>
                  <Input
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    autoFocus
                    half
                  />
                  <Input
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    half
                  />
                </>
              )}
              <Input
                name="email"
                type="email"
                label="Email Address"
                handleChange={handleChange}
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                handleShowPassword={handleShowPassword}
              />

              {isSignUp && (
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />
              )}
            </Grid>

            <GoogleLogin
              onSuccess={(response)=>googleSuccess(response)}
              onError={googleFailure}
              
            />
            {/* Object
clientId
: 
"316768288829-rjo9sihf2t4tfcbad51rlo5k04jrc8p1.apps.googleusercontent.com"
credential
: 
"eyJhbGciOiJSUzI1NiIsImtpZCI6ImJhNjNiNDM2ODM2YTkzOWI3OTViNDEyMmQzZjRkMGQyMjVkMWM3MDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzMTY3NjgyODg4MjktcmpvOXNpaGYydDR0ZmNiYWQ1MXJsbzVrMDRqcmM4cDEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzMTY3NjgyODg4MjktcmpvOXNpaGYydDR0ZmNiYWQ1MXJsbzVrMDRqcmM4cDEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQzNDQ3NzA3MDkzOTk5MTY1MjUiLCJlbWFpbCI6ImFzaHVwb2NvNjZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTc1NTA0OTA4MSwibmFtZSI6IkFzaHV0b3NoIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0wyRWNvWjgtMkRyUGRBSWFtTzVERGNUVEtzN3dic1R3T19vZzZ1UDZqTVhLQmNNSmVaPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkFzaHV0b3NoIiwiaWF0IjoxNzU1MDQ5MzgxLCJleHAiOjE3NTUwNTI5ODEsImp0aSI6ImU4YWI5MWUwZDMyYmQ5ZjkwYzFhMmFhZGJiYTMyMzU2ZGYzMDczOWQifQ.Nv5xcwjatcqqjZQvubj0QmbhZpRNO3dHiePNVklVsXAcSWElH5rlJO2SQArIbiBKYBrkp-0DW--BAaAbYLKBZeDMCbXh__qfHJ60fkcjEjGyakbRVjU2B1nN-xSHq0oW5z15tXxIyh4eWust5lAZ-54Toy_3ij89kSWYEwRN_OMnXWaLS1VWXTUgQ5GIbxS2j_mlaUluJvXdZ1-9HTCcxMNUvgy8rPuMhn0G3dUKfqj6YPsDrt_DrCm9eIgMpGU1XDLQX-laTmugkGoOpkWdeAYRR09uOKaGrbarM7fd6xE2LPZHLm_Ig9uMCOeV3wa-_b9OzUP5QJrHjJxAGlC3uw"
select_by
: 
"btn_confirm"
[[Prototype]]
: 
Object */}

            <Button
              sx={submit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid>
                <Button onClick={switchMode}>
                  {isSignUp
                    ? 'Already registered? Sign in here'
                    : 'New user? Sign up here'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </GoogleOAuthProvider>
  );
};

export default Auth;
