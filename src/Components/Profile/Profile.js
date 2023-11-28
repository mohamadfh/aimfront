import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import * as React from "react";
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";

function Title(props) {
    return (
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            {props.children}
        </Typography>
    );
}

Title.propTypes = {
    children: PropTypes.node,
};


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



export default function Profile() {
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
                        <InfoForm/>
                    </Paper>
                </Grid>

            </Grid>
        </Container>
    </Box>);
}
