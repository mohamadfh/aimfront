import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useContext, useEffect, useState} from 'react';
import {useRef} from 'react'
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";

import ReCAPTCHA from "react-google-recaptcha"

import { authContext } from "../../App";
import axios from "axios"

export default function Login() {

    const [showPassword, setShowPassword] = useState(false);

    const { setAuth } = useContext(authContext);
    const navigate = useNavigate();



    const [loginError, setLoginError] = useState(null);



    const nav = () => {
        navigate("/"); // Omit optional second argument
    };

    useEffect(() => {
        // Check if a token is already stored in sessionStorage
        const token = sessionStorage.getItem("token");

        if (token) {
            // If a token exists, redirect the user to the dashboard
            nav('/');
        }
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        // setFormData({
        //     username: data.get('username'),
        //     password: data.get('password')
        // });

        if (!data.get('password') || !data.get('username')) {

            setLoginError('نام کاربری یا کلمه عبور خالی است');
            return;
        }
        // const token = captchaRef.current.getValue();
        // captchaRef.current.reset();

        // Assuming you have an API for authentication
        try {

            const payload = JSON.stringify({password:data.get('password'),username:data.get('username')});
            const customConfig = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            // Send a request to your authentication server with formData
            const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
            const response = await axios.post(`${apiUrl}/auth/login/`, payload,customConfig);

            if (response.status === 200) {

                // Successful login
                // Redirect to the dashboard or perform any necessary actions
                sessionStorage.setItem("user", response.data.id);
                sessionStorage.setItem("token", response.data.token);
                console.log(sessionStorage.getItem('token'))
                console.log('Login successful');

                setAuth(true);
                nav();

            } else {
                // Handle authentication error
                setLoginError('نام کاربری یا کلمه عبور اشتباه است');
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Login error:', error);
            setLoginError('نام کاربری یا کلمه عبور اشتباه است');

        }
    };
    // const captchaRef = useRef(null)

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'black'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="نام کاربری"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="رمز عبور"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="current-password"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)} // Toggle the state
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {/*<ReCAPTCHA*/}
                    {/*    sitekey={"6Lc6zx4pAAAAAP0LIg8UInasgQ_71Gso32mC7e1J"}*/}
                    {/*/>*/}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        ورود
                    </Button>
                    {loginError && (
                        <Typography variant="body2" color="error" align="center">
                            {loginError}
                        </Typography>
                    )}
                </Box>

            </Box>
        </Container>
    );
}