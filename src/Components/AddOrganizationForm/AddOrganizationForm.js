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

const AddOrganizationForm = ({updateTable}) => {
    const [showForm, setShowForm] = useState(false);
    const [registerError, setRegisterError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const [formData, setFormData] = useState({
        name: '',
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

        if (!data.get('name')) {
            setRegisterError('نام خالی است');
            return;
        }

        try {
            const TOKEN = sessionStorage.getItem('token');

            const payload = JSON.stringify({
                name:data.get('name'),})

            const customConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${TOKEN}`
                }
            };
            const response = await axios.post('http://localhost:8000/api/organizations/', payload,customConfig);

            if (response.status === 200) {
                setShowForm(false)

            } else {
                // Handle authentication error
                setRegisterError(' ثبت نشد');
            }
        } catch (error) {
            // Handle network errors or other exceptions
            setRegisterError(error);

        }
        setFormData({ name: '' });
        updateTable();

    };

    return (
        <div>
            <Accordion expanded={showForm}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    onClick={handleShowForm}
                >
                    <Typography variant="h6">ثبت سازمان جدید</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    id="name"
                                    name="name"
                                    label="نام"
                                    fullWidth
                                    autoComplete="name"
                                    variant="standard"
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

export default AddOrganizationForm;
