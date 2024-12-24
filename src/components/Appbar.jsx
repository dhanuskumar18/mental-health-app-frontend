import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux'
import { deepPurple } from '@mui/material/colors';

export default function ButtonAppBar() {
    const state1=useSelector((state)=>state.s1reducer.value)
  // console.log(state1)
  const navigate=useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
         
          <Avatar sx={{ bgcolor: deepPurple[900] }}>{ String(state1).charAt(0).toUpperCase()}
            </Avatar> 
            <Typography variant="h6" component="div" sx={{ flexGrow: 1,marginLeft:"10px",fontSize:{xs:"1rem",md:"2rem"}}}>{state1}
            </Typography>
          <Button color="inherit" variant='outlined' sx={{fontSize:{xs:"0.8rem",md:"1.3rem"}}} onClick={()=>{navigate("/Login")}}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
