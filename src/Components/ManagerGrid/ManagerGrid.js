import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import UserInfoForm from "../UserInfoForm/UserInfoForm";
import axios from "axios";
import ConformationDialogue from "../ConformationDialogue/ConformationDialogue";
import Spinner from "../Spinner/Spinner";
import AddManagerForm from "../AddManagerForm/AddManagerForm";




export default function ManagerGrid() {

    const [update, setUpdate] = useState(0);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // URL to fetch data from
    const apiUrl = `http://localhost:8000/auth/register/manager/`; // Replace with your API URL
    const TOKEN = sessionStorage.getItem("token")
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl , {
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
    }, [apiUrl , update]); // Add any dependencies that should trigger the fetch


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
            field: 'organization_name',
            headerName: 'سازمان',
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

            const response = await axios.put(`http://localhost:8000/auth/register/manager/${editedData.id}/`, payload,customConfig);

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

            const response = await axios.delete(`http://localhost:8000/auth/register/manager/${editedData.id}/`,customConfig);

            if (response.status === 200) {
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
        {data == undefined ? (<>
            <Spinner color={{ c: "white" }} text="در حال بارگذاری" />
        </>) : (<>
            <React.Fragment>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={data}
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
                <AddManagerForm updateTable={() => setUpdate(update+1)}/>
            </React.Fragment>
        </>)}
    </>);
}