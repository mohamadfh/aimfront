import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";
import NorthIcon from '@mui/icons-material/North';
import RechartsToPng from "@mui/material/LinearProgress";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {useCurrentPng} from "recharts-to-png";
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Label,
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import useGet from "../../Hooks/useGet";
import LinearProgress from "@mui/material/LinearProgress";
import {useRef} from "react";
import {exportToPng} from "../../GlobalFunctions/ExportPNG";

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

// Generate Order Data
function createData(id, key, value) {
    return {id, key, value};
}


function Info({data}) {

    const rows = [
        createData(
            0,
            'نام سازمان: ',
            data.organization,
        ),
        createData(
            1,
            'تعداد کل کارمندان: ',
            data.employee_count,
        ),

        createData(
            2,
            'تعداد پاسخ های ثبت شده: ',
            data.submission_count,
        ),
        createData(
            3,
            'درجه بلوغ',
            data.total_score,
        )
    ];


    return (
        <React.Fragment>
            <Title>خلاصه گزارش</Title>
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

function Spyder({data}) {

    const chartRef = useRef();

    const containerStyle = {
        overflowX: 'auto', // Add horizontal scroll if needed
        overflowY: 'auto', // Add horizontal scroll if needed
    };

    const chartConfig = {
        type: 'png', // Output type
        filename: 'chart.png', // File name
    };

    return (<>
            {/*<React.Fragment>*/}
            {/*<Title>نمودار عنکبوتی بلوک های موضوعی</Title>*/}
            {data.block_answer_count === undefined ? (
                <div>loading</div>
            ) : (
                // <Typography component={'div'} id={'chart-container'}>
                    <ResponsiveContainer id={"spyder-chart-container"} minWidth={500}>
                        <RadarChart outerRadius={"70%"} data={data.block_answer_count}>
                            <PolarGrid/>
                            <PolarAngleAxis dataKey="موضوع" textAnchor="start"/>

                            <Radar name="به شدت موافق" dataKey="به شدت موافق" stroke="#8884d8" fill="#8884d8"
                                   fillOpacity={0.2}/>
                            <Radar name="موافق" dataKey="موافق" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.2}/>
                            <Radar name="مخالف" dataKey="مخالف" stroke="#590100" fill="#590100" fillOpacity={0.2}/>
                            <Radar name="به شدت مخالف" dataKey="به شدت مخالف" stroke="#ff7f0e" fill="#ff7f0e"
                                   fillOpacity={0.2}/>
                            <Radar name="غیرممکن یا ناموجود" dataKey="غیرممکن یا ناموجود" stroke="#d62728"
                                   fill="#d62728" fillOpacity={0.2}/>

                            <Legend />
                        </RadarChart>
                        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                            <Button variant="contained" onClick={() => exportToPng("spyder-chart-container")}>
                                دانلود نمودار
                            </Button>
                        </Box>
                        {/*<RechartsToPng chartConfig={chartConfig}>*/}
                        {/*    {({ toPng }) => (*/}
                        {/*        <button onClick={() => toPng()}>Download Chart</button>*/}
                        {/*    )}*/}
                        {/*</RechartsToPng>*/}
                    </ResponsiveContainer>
                // </Typography>

            )}
            {/*</React.Fragment>*/}
        </>
    );
}


function Ladder({data}) {
    const leftPosition = `${data.total_score - 4}`;

    const divStyle = {
        position: 'relative',
        width: `${leftPosition}%`,
    };

    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        fontSize: "1rem"
    };
    const parentStyle = {
        display: 'flex',
        flexDirection: 'row',

    };

    return (
        <React.Fragment id={"ladder-chart-container"}>
            <Title> نردبان بلوغ</Title>
            <div>

                <img width="100%" height="100%" src={require("../../Assets/Images/ai-maturity-ladder.svg").default}/>
                <LinearProgress variant="determinate" value={data.total_score} className="progress-bar"/>

            </div>
            <div style={parentStyle}>
                <div style={divStyle}>
                </div>
                <div style={containerStyle}>
                    <NorthIcon className="icon" style={{fontSize: "2rem", color: "red"}}/>
                    <p>جایگاه سازمان</p>
                </div>
            </div>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Button variant="contained" onClick={() => exportToPng("ladder-chart-container")}>
                    دانلود نمودار
                </Button>
            </Box>
        </React.Fragment>
    );
}


function StatChart({data}) {

    return (
        <React.Fragment id={"stat-chart-container"}>
            <Title>امتیاز سازمان در هر بلوک موضوعی</Title>
            <ResponsiveContainer minWidth={500}>
                <LineChart
                    // width={500}
                    // height={300}
                    data={data.block_score}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 20,
                        bottom: 120,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name" angle={-60} textAnchor="start"/>
                    <YAxis dx={-10}/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{r: 8}}/>
                </LineChart>
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                    <Button variant="contained" onClick={() => exportToPng("stat-chart-container")}>
                        دانلود نمودار
                    </Button>
                </Box>
            </ResponsiveContainer>
        </React.Fragment>
    );
}

export default function GeneralReport() {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    const {data, error} = useGet(
        `${apiUrl}/api/organizations/report`,
        sessionStorage.getItem("token")
    );


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
                        <Info data={data}/>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',

                        }}
                    >
                        <Ladder data={data}/>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 600,
                            overflow: 'auto'
                        }}
                    >
                        <StatChart data={data}/>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 750,
                            overflow: 'auto'
                        }}
                    >
                        <Spyder data={data}/>
                    </Paper>
                </Grid>

            </Grid>
        </Container>
    </Box>);
}
