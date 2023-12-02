import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function DenseAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <IconButton edge="start" color="transparent" aria-label="menu" sx={{ mr: 0}}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            HireQuotient
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
