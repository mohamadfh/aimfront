import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import axios from "axios";

import Spinner from "../Spinner/Spinner";


export default function OrgGridReports({showBlockReport , showGeneralReport}) {

    const [update, setUpdate] = useState(0);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // URL to fetch data from
    const apiUrl = `http://localhost:8000/api/organizations/`; // Replace with your API URL
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



    const handleBlockClick = (row) => {
        showBlockReport(row);
        // setEditPopupOpen(true);
    };

    const handleGeneralClick = (row) => {
        showGeneralReport(row);
    };

    const columns = [
        {
            field: 'name',
            headerName: 'نام سازمان',
            width: 150,
        },
        {
            field: 'actions',
            headerName: 'گزینه ها',
            width: 200,
            renderCell: (params) => (
                <div>
                    <Button onClick={() => handleGeneralClick(params.row)}> گزارش جامع</Button>
                    <Button onClick={() => handleBlockClick(params.row)}> گزارش بلوکی</Button>
                </div>
            ),
        },
    ];



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
                        disableRowSelectionOnClick
                    />
                </Box>
            </React.Fragment>
        </>)}
    </>);
}