import React, { useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Button,
    TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const AddUserForm = ({updateTable}) => {
    const [showForm, setShowForm] = useState(false);
    const [registerError, setRegisterError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const [formData, setFormData] = useState({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleShowForm = () => {
        setShowForm(!showForm);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        if (!data.get('password') || !data.get('username')) {
            setRegisterError('نام کاربری یا کلمه عبور خالی است');
            return;
        }

        try {
            const TOKEN = sessionStorage.getItem('token');

            const payload = JSON.stringify({
                password:data.get('password'),
                first_name:data.get('first_name'),
                last_name:data.get('last_name'),
                username:data.get('username')});

            const customConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${TOKEN}`
                }
            };
            const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
            const response = await axios.post(`${apiUrl}/auth/register/`, payload,customConfig);

            if (response.status === 200) {
                setShowForm(false)

            } else {
                // Handle authentication error
                setRegisterError('کاربر ثبت نشد');
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.log('error:', error);
            setRegisterError(error);

        }
        setFormData({ username: '', password: '', name: '' });
        updateTable();

    };

    return (
        <div>
            <Accordion expanded={showForm}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    onClick={handleShowForm}
                >
                    <Typography variant="h6">ثبت کاربر جدید</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="first_name"
                                    name="first_name"
                                    label="نام"
                                    fullWidth
                                    autoComplete="first-name"
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="last_name"
                                    name="last_name"
                                    label="نام خانوادگی"
                                    fullWidth
                                    autoComplete="family-name"
                                    variant="standard"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="username"
                                    name= "username"
                                    label= "نام کاربری"
                                    fullWidth
                                    autoComplete="username"
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
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
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button type="submit" variant="contained" color="primary">
                                    ثبت
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default AddUserForm;
