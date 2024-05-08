import logo4 from '../../assets/logo4.jpg'; // Import your logo image here
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react';

export const Sidebar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#20073f',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <img src={logo4} alt="Logo" style={{ width: '100px' }} />
      </Box>
      <Toolbar />
      <Box p={2}>
        <Link to='/' id="dashboard" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <PersonAddIcon />
          <Typography variant="h6" component="div" sx={{ display: 'inline', color: '#fff' }}>
            Dashboard
          </Typography>
        </Link>
      </Box>
      <Box p={2}>
        <Link to='/add_employee' id="add_employee" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <PersonAddIcon />
          <Typography variant="h6" component="div" sx={{ display: 'inline', color: '#fff' }}>
            Add Employee
          </Typography>
        </Link>

      </Box>
      <Box p={2}>
        <Link to='/add_role' id="add_role" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <PersonAddIcon />
          <Typography variant="h6" component="div" sx={{ display: 'inline', color: '#fff' }}>
            Add Role
          </Typography>
        </Link>
      </Box>
      <Box sx={{ p: 2, position: 'absolute', bottom: 0 }}>
        <Typography variant="caption">{currentTime}</Typography>
      </Box>
    </Drawer>
  );
}
