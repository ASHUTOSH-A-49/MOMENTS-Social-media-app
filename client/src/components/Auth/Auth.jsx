import React, { useState } from 'react';
import { Button, Paper, Grid, Typography, Container, Avatar, Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';
import { useAuthStyles } from './styles';

const Auth = () => {
  const { paper, form, avatar, submit, gridContainer } = useAuthStyles();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };

  return (
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
            {/* The `item` prop has been removed here. It is no longer needed
            in MUI v5 and was causing the layout to break. */}
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
  );
};

export default Auth;
