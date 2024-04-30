import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Button } from '@mui/material';
import logo4 from '../../public/assets/logo4.jpg';

import './style.css';

interface LoginProps {
    onLogin: () => void; // Define the type of onLogin prop
}
export const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [name, setName] = useState('');
    const [idCard, setIdCard] = useState('');

    const handleLogin = () => {
        // Here you can add validation for name and idCard if required
        // For simplicity, I'm assuming both fields are required
        if (name && idCard) {
            // Navigate to the home page
            // window.location.href = '/?name=' + encodeURIComponent(name);
            onLogin();
        } else {
            // Handle validation errors
        }
    };

    return (
        <Card sx={{ width: 400, height: 450 }} >
            {/* <CardActionArea> */}
            <CardMedia
                component="img"
                height="240"
                // width="240"
                image={logo4}
                alt="green iguana"
            />
            <CardContent>
                {/* <Typography gutterBottom variant="h5" component="div">
                    Login
                </Typography> */}
                <Typography variant="body2" >
                    <div id="buttons">
                        <input id="name" type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                        <br />
                        <input id="id" type="text" placeholder="Enter your identity" value={idCard} onChange={(e) => setIdCard(e.target.value)} />
                    </div>
                </Typography>
            </CardContent>
            {/* </CardActionArea> */}
            {/* Login button */}
            <Button id="login" onClick={handleLogin}>Login</Button>
        </Card>
    );
};
