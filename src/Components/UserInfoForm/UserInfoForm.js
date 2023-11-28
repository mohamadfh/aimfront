import React, {useEffect, useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
} from '@mui/material';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const PopupForm = ({ open, onClose, rowData, onSave }) => {
    const [editedData, setEditedData] = useState(rowData);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (!open) {
            setEditedData(rowData);
        }else{
            setEditedData(rowData);
        }
    }, [open, rowData]);


    const handleSubmit = (e) => {
        e.preventDefault()
        onSave(editedData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>اطلاعات کاربر</DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                value={editedData.first_name}
                                id="first_name"
                                name="first_name"
                                label="نام"
                                fullWidth
                                autoComplete="given-name"
                                // variant="standard"
                                onChange={(e) =>
                                    setEditedData({ ...editedData, first_name: e.target.value })
                                }
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
                                // variant="standard"
                                value={editedData.last_name}
                                onChange={(e) =>
                                    setEditedData({ ...editedData, last_name: e.target.value })
                                }
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
                                // variant="standard"
                                value={editedData.username}
                                onChange={(e) =>
                                    setEditedData({ ...editedData, username: e.target.value })
                                }

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
            </DialogContent>
        </Dialog>
    );
};

export default PopupForm;
