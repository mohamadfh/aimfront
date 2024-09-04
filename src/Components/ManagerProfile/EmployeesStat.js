import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import UserInfoForm from "../UserInfoForm/UserInfoForm";
import axios from "axios";
import ConformationDialogue from "../ConformationDialogue/ConformationDialogue";
import Spinner from "../Spinner/Spinner";
import AddUserForm from "../AddUserForm/AddUserForm";




export default function DataGridDemo() {

    const [update, setUpdate] = useState(0);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    // URL to fetch data from
    const endpointUrl = `${apiUrl}/api/organizations/`; // Replace with your API URL
    const TOKEN = sessionStorage.getItem("token")
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(endpointUrl , {
                    headers: { Authorization: `Token ${TOKEN}` },
                });
                setData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [endpointUrl , update]); // Add any dependencies that should trigger the fetch

    const handleDelete = (userId) => {
        // Make an API call to delete the user with the given ID
        // Update the user data in your component's state
    };

    const handleEdit = (userId) => {
        // Implement an edit feature, e.g., open a modal for editing user details
    };

    const columns = [
        {
            field: 'username',
            headerName: 'نام کاربری',
            width: 150,
        },
        {
            field: 'first_name',
            headerName: 'نام',
            width: 150,
        },
        {
            field: 'last_name',
            headerName: 'نام خانوادگی',
            width: 150,
        },
        {
            field: 'submission_status',
            headerName: 'ثبت پاسخ',
            width: 150,
        },
        {
            field: 'actions',
            headerName: 'گزینه ها',
            width: 160,
            renderCell: (params) => (
                <div>
                    <Button onClick={() => handleEditClick(params.row)}>ویرایش</Button>
                    <Button onClick={() => handleDeleteClick(params.row)}>حذف</Button>

                </div>
            ),
        },
    ];

    const [editPopupOpen, setEditPopupOpen] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState({}); // Data from the selected row
    const [submitError, setSubmitError] = useState(null);
    const [deleteError, setDeleteError] = useState(null);

    const handleEditClick = (rowData) => {
        setSelectedRowData(rowData);
        setEditPopupOpen(true);
    };

    const handleSaveEditedData = async (editedData) => {

        if (editedData.password === '' || editedData.username === ''){
            setSubmitError('نام کاربری یا کلمه عبور خالی است');
            return;
        }

        try {
            const TOKEN = sessionStorage.getItem('token');

            const payload = JSON.stringify(editedData);

            const customConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${TOKEN}`
                }
            };
            const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
            const response = await axios.put(`${apiUrl}/auth/register/${editedData.id}/`, payload,customConfig);

            if (response.status === 200) {
                console.log("edited")
            } else {
                // Handle authentication error
                setSubmitError('خطا در ویرایش کاربر');
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.log('error:', error);
            setSubmitError(error);

        }
        setUpdate(update+1);
    };

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleDeleteClick = (row) => {
        setSelectedRow(row);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async (editedData) => {
        try {
            const TOKEN = sessionStorage.getItem('token');

            const customConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${TOKEN}`
                }
            };
            const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
            const response = await axios.delete(`${apiUrl}/auth/register/${editedData.id}/`,customConfig);

            if (response.status === 200) {
                console.log("deleted")
            } else {
                // Handle authentication error
                setSubmitError('خطا در حذف کاربر');
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.log('error:', error);
            setDeleteError(error);

        }
        setDeleteDialogOpen(false);
        setUpdate(update+1);

    };

    return (<>
        {data.employees == undefined ? (<>
                <Spinner color={{ c: "white" }} text="در حال بارگذاری" />
            </>) : (<>
            <React.Fragment>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={data.employees.map((r)=>r.user)}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 5,
                                    },
                                },
                            }}
                            pageSizeOptions={[5]}
                            // checkboxSelection
                            disableRowSelectionOnClick
                        />
                    </Box>
                    <UserInfoForm
                        open={editPopupOpen}
                        onClose={() => setEditPopupOpen(false)}
                        rowData={selectedRowData}
                        onSave={handleSaveEditedData}
                    />
                    <ConformationDialogue
                        open={deleteDialogOpen}
                        onClose={() => setDeleteDialogOpen(false)}
                        onConfirm={handleConfirmDelete}
                        rowData={selectedRow}

                    />
                    <AddUserForm updateTable={() => setUpdate(update+1)}/>
            </React.Fragment>
            </>)}
    </>);
}