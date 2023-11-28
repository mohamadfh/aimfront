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
            <DialogTitle>اطلاعات سازمان</DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                value={editedData.name}
                                id="organization_name"
                                name="organization_name"
                                label="نام"
                                fullWidth
                                autoComplete="given-name"
                                onChange={(e) =>
                                    setEditedData({ ...editedData, name : e.target.value })
                                }
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
