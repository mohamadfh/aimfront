import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import * as React from "react";
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import Title from '../Title/Title';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import useGet from "../../Hooks/useGet";
import DataGridDemo from './EmployeesStat';


Title.propTypes = {
    children: PropTypes.node,
};





function UserInfoBox() {
    const {data, error} = useGet(
        `http://localhost:8000/auth/whoami/`,
        sessionStorage.getItem("token")
    );

    function createData(id, key, value) {
        return {id, key, value};
    }

    const rows = [
        createData(
            0,
            'نام کاربری: ',
            data.username,
        ),
        createData(
            0,
            'نام: ',
            data.first_name,
        ),
        createData(
            0,
            'نام خانوادگی: ',
            data.last_name,
        ),
        // createData(
        //     0,
        //     'سازمان: ',
        //     data.organization,
        // ),

    ];


    return (
        <React.Fragment>
            <Title>اطلاعات کاربر</Title>
            <Table size="small">
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.key}</TableCell>
                            <TableCell>{row.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}



function InfoForm() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                اطلاعات کاربر
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="نام"
                        name="نام"
                        label="نام"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="نام خانوادگی"
                        name="نام خانوادگی"
                        label="نام خانوادگی"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="شماره موبایل"
                        name="شماره موبایل"
                        label="شماره موبایل"
                        fullWidth
                        autoComplete="phone-number"
                        variant="standard"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}


function OrganizationInfoBox() {


    return (<>
        <Title>مدیریت کاربران</Title>
            <DataGridDemo/>
    </>);
}


export default function ManagerProfile() {

    return (<Box
        component="main"
        sx={{
            backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
        }}
    >
        <Toolbar/>
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12}>
                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                        <UserInfoBox/>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                        <OrganizationInfoBox/>
                    </Paper>
                </Grid>

            </Grid>
        </Container>
    </Box>);
}
