// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import SearchIcon from '@mui/icons-material/Search';
// import AddIcon from '@mui/icons-material/Add';
// import logo5 from '../../public/assets/logo5.jpg'; // Import your logo image here
// import { observer } from 'mobx-react';
// import { Gender } from '../../types';
// import { useState } from 'react';

// interface HeaderProps {
//   handleEditModalClick: (arg: boolean) => void;
//   setEmployee: (arg: any) => void,
//   setSearchTerm: (arg: string) => void;
// }

// export const Header  : React.FC<HeaderProps> = observer((props) => {
//   const {  handleEditModalClick, setEmployee } = props;

//   const handleAddButtonClick = () => {
//     setEmployee({
//       firstName: '',
//       lastName: '',
//       identity: '',
//       startWorkDate: new Date(),
//       dateOfBirth: new Date(),
//       gender: Gender.Male,
//       status: true,
//       roles: []
//     });

//     handleEditModalClick(true); // Or pass the appropriate boolean value
//   };
//   const [searchTerm, setSearchTerm] = useState("");
//   const handleSearchChange = (event: any) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <AppBar position="static" color='primary'>
//       <Toolbar>
//         {/* Logo */}
//         <img src={logo5} alt="Logo" style={{ width: '100px', marginRight: 'auto' }} />

//         {/* Add Employee Button
//         <Button 
//           variant="contained" 
//           startIcon={<AddIcon />} 
//           style={{ marginRight: '10px' }}
//           onClick={
//             handleAddButtonClick          }
//         >
//           Add Employee
//         </Button> */}

//         {/* Search Button */}
//         <IconButton 
//           color="inherit" 
//           aria-label="search" 
//           onClick={() => {
//             // Search button functionality here
//           }}
//         >
//           <SearchIcon />
//         </IconButton>
//       </Toolbar>
//     </AppBar>
//   );
// });
import logo4 from '../../public/assets/logo4.jpg'; // Import your logo image here
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Gender } from '../../types';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom"
import { useState,useEffect } from 'react';

export const Header: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAddButtonClick = () => {
    // setEmployee({
    //   firstName: '',
    //   lastName: '',
    //   identity: '',
    //   startWorkDate: new Date(),
    //   dateOfBirth: new Date(),
    //   gender: Gender.Male,
    //   status: true,
    //   roles: []
    // });
    // handleEditModalClick(true); // Or pass the appropriate boolean value
  };
  return (
    <AppBar position="fixed" color="default" >
      <Toolbar>
        <img src={logo4} alt="Logo" style={{ width: '100px', marginRight: 'auto' }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Your App Name
        </Typography>
        <Link to='/add_employee' id="tab1"><PersonAddIcon /></Link>|

        {/* <Button variant="contained" startIcon={<PersonAddIcon />} onClick={handleAddButtonClick}>
          Add Employee
        </Button> */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          add employee
        </Typography>
        <Box ml={1}>{currentTime}</Box>
      </Toolbar>
    </AppBar>
  );
}

