import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';

const DeleteConfirmationDialog = ({ open, onClose, onConfirm ,rowData}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>حذف</DialogTitle>
            <DialogContent>آیااز حذف این آیتم مطمعن هستید؟</DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    نه
                </Button>
                <Button onClick={() => onConfirm(rowData)}>
                    بله
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmationDialog;
