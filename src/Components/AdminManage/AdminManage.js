import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import * as React from "react";
import PropTypes from 'prop-types';
import Title from '../Title/Title';
import OrgGrid from '../OrgGrid/OrgGrid'
import ManagerGrid from "../ManagerGrid/ManagerGrid";
Title.propTypes = {
    children: PropTypes.node,
};








function ManageOrganizations() {

    return (<>
        <Title>سازمان ها</Title>
        <OrgGrid/>
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
                        <ManageOrganizations/>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                        <ManagerGrid/>
                    </Paper>
                </Grid>
                </Grid>
        </Container>
    </Box>);
}
