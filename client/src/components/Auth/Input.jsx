import React from 'react';
import { TextField, InputAdornment, Grid, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Input = ({ half, name, handleChange, label, autoFocus, type, handleShowPassword }) => {
  return (
    <Grid 
      
      sx={{ xs: 12, sm: half ? 6 : 12 }}
    >
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={{
          ...(name === 'password' && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  {type === 'password' ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }),
        }}
      />
    </Grid>
  );
};

export default Input;
