import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import * as React from "react";
import NorthIcon from '@mui/icons-material/North';
import LinearProgress from "@mui/material/LinearProgress";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

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
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar
} from 'recharts';
import useGet from "../../Hooks/useGet";
import OrgGridReports from "../OrgGridReports/OrgGridReports";
import {useEffect, useState} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

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




function BlockBarChart({blockNo , org_id}) {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    const {data, error} = useGet(
        `${apiUrl}/api/blocks/${blockNo}/report/${org_id}/`,
        sessionStorage.getItem("token")
    );
    const optionsList = [
        {id: 0, option: "به شدت موافق", selected: false},
        {id: 1, option: "موافق", selected: false},
        {id: 2, option: "مخالف", selected: false},
        {id: 3, option: "به شدت مخالف", selected: false},
        {id: 4, option: "غیرممکن یا ناموجود", selected: false}

    ]
    // if (data !== undefined){
    //     console.log(chartData(data.answer_counts));
    // }
    function chartData(answer_counts) {
        return Object.keys(answer_counts).map((key) => ({
            name: optionsList[key].option,
            count: answer_counts[key],
        }));
    }

    return (<>
        {data.answer_counts === undefined ? (<>loading</>) : (<React.Fragment>
                <Title> آمار پاسخ سوالات بلوک </Title>
                <ResponsiveContainer minWidth={400}>
                    <BarChart
                        data={chartData(data.answer_counts)}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 20,
                            bottom: 80,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name" angle={-60} textAnchor="start"/>
                        <YAxis dx={-10}/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="count" fill="#8884d8"/>
                    </BarChart>
                </ResponsiveContainer>
            </React.Fragment>
        )}
    </>);
}

function QuestionBarChart({data}) {
    const optionsList = [
        {id: 1, option: "به شدت موافق", selected: false},
        {id: 2, option: "موافق", selected: false},
        {id: 3, option: "مخالف", selected: false},
        {id: 4, option: "به شدت مخالف", selected: false},
        {id: 5, option: "غیرممکن یا ناموجود", selected: false}

    ]


    function chartData(answer_counts) {
        return Object.keys(answer_counts).map(function(key){
            if(key === "qid" || key === "text"){
                return undefined;
            }else{
                return {
                    name: optionsList[key].option,
                    count: answer_counts[key],
                }
            }
        });
    }
    return (<>
        {data == undefined ? (<div>loading</div>) : (<>
            <ResponsiveContainer  minWidth={500}>
                <BarChart
                    data={chartData(data)}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 100 ,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name" angle={-60} textAnchor="start"/>
                    <YAxis dx={-10} textAnchor="start"/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="count" fill="#8884d8"/>
                </BarChart>
            </ResponsiveContainer>
        </>)}
    </>);
}

function Questionreport({blockNo , org_id}) {
    const [currentQuestion, setCurrentQuestion] = useState(-1);
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    const {data, error} = useGet(
        `${apiUrl}/api/blocks/${blockNo}/count/${org_id}/`,
        sessionStorage.getItem("token")
    );
    const dataArray = Array.from(data);
    const handleChange = (event) => {
        setCurrentQuestion(event.target.value);
    };
    useEffect(() => {
        setCurrentQuestion(-1);
        // Check if data is defined and not null
        if (data !== undefined && Object.keys(data).length !== 0) {
            // Set your component's state with the received data
            setCurrentQuestion(Object.keys(data)[0]);
        }
    }, [data]); // This effect will run whenever the data variable changes

    return (<>
        {data == undefined || data[currentQuestion] == undefined ? (<>loading</>) : (<>
            <Grid item xs={12}>
                <Paper sx={{p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Title>انتخاب سوال </Title>

                    <FormControl>
                        <InputLabel id="q-select-label">سوال</InputLabel>
                        <Select
                            labelId="q-select-label"
                            id="q-select"
                            value={currentQuestion}
                            label="سوال"
                            onChange={handleChange}>

                            {Object.entries(data).map(([key, value]) => (<MenuItem key={key} value={key} style={{ whiteSpace: 'normal' }}>
                                {value.text}
                            </MenuItem>))}
                        </Select>
                    </FormControl>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{p: 2, display: 'flex', flexDirection: 'column', height: 500 ,overflow: 'auto'}}>
                    <Title> آمار پاسخ به تفکیک سوال </Title>
                    <QuestionBarChart  data={data[currentQuestion.toString()].answer_count}/>
                </Paper>
            </Grid>
        </>)}
    </>);
}

function AdminBlockreport({org_id}) {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    const [currentBlock, setcurrentBlock] = useState(1);
    const {data, error} = useGet(
        `${apiUrl}/api/blocks/`,
        sessionStorage.getItem("token")
    );

    const dataArray = Array.from(data);
    const handleChange = (event) => {
        setcurrentBlock(event.target.value);
    };

    return (<>
                {dataArray === undefined ? (<> loading</>) : (<>
                    <Grid item xs={12}>
                        <Paper sx={{p: 2, display: 'flex', flexDirection: 'column' ,overflow: 'auto'}}>
                            <Title>انتخاب بلوک موضوعی </Title>
                            <FormControl fullWidth>
                                <InputLabel id="block-select-label">بلوک</InputLabel>
                                <Select
                                    labelId="block-select-label"
                                    id="block-select"
                                    value={currentBlock}
                                    label="بلوک"
                                    onChange={handleChange}>

                                    {dataArray.map((item) => (<MenuItem key={item.number} value={item.number}>
                                        {item.title}
                                    </MenuItem>))}
                                </Select>
                            </FormControl>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{p: 2,height: 650, display: 'flex', flexDirection: 'column' ,overflow: 'auto'}}>
                            <BlockBarChart blockNo={currentBlock} org_id={org_id}/>
                        </Paper>
                    </Grid>
                    <Questionreport blockNo={currentBlock} org_id={org_id}/>
                </>)}
           </>);
}



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
    const containerStyle = {
        overflowX: 'auto', // Add horizontal scroll if needed
        overflowY: 'auto', // Add horizontal scroll if needed
    };
    return (<>
            <React.Fragment>
                <Title>نمودار عنکبوتی بلوک های موضوعی</Title>
                {data.block_answer_count === undefined ? (
                    <div>loading</div>
                ) : (
                    <ResponsiveContainer minWidth={500}>
                        <RadarChart outerRadius={"70%"} data={data.block_answer_count}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="موضوع" textAnchor="start" />

                            <Radar name="به شدت موافق" dataKey="به شدت موافق" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
                            <Radar name="موافق" dataKey="موافق" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.2} />
                            <Radar name="مخالف" dataKey="مخالف" stroke="#590100" fill="#590100" fillOpacity={0.2} />
                            <Radar name="به شدت مخالف" dataKey="به شدت مخالف" stroke="#ff7f0e" fill="#ff7f0e" fillOpacity={0.2} />
                            <Radar name="غیرممکن یا ناموجود" dataKey="غیرممکن یا ناموجود" stroke="#d62728" fill="#d62728" fillOpacity={0.2} />

                            <Legend/>
                        </RadarChart>
                    </ResponsiveContainer>
                )}
            </React.Fragment>
        </>
    );
}


function Ladder({data}) {
    const leftPosition = `${data.total_score - 4}`;

    const divStyle = {
        position: 'relative',
        width:  `${leftPosition}%`,
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
        <React.Fragment>
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
        </React.Fragment>
    );
}


function StatChart({data}) {

    return (
        <React.Fragment>
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
            </ResponsiveContainer>
        </React.Fragment>
    );
}

function AdminGeneralReport({org_id}) {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    const {data, error} = useGet(
        `${apiUrl}/api/organizations/report/${org_id}/`,
        sessionStorage.getItem("token")
    );



    return (<>
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
    </>);
}


export default function AdminReports(){
    const [currentReport, setCurrentReport] = useState(null);

    const showGeneral = (row) => {
        setCurrentReport({'organization_id' : row.id ,'type' : 'general' , 'name': row.name });
    };

    const showBlock = (row) => {
        setCurrentReport({'organization_id' : row.id ,'type' : 'block' ,'name': row.name });
    };

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
                <Grid item xs={12}>
                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                        <OrgGridReports
                            showGeneralReport = {showGeneral}
                            showBlockReport = {showBlock}
                        />
                    </Paper>
                </Grid>
                {currentReport === null ? null : currentReport['type'] === 'general' ? (<>
                    <Grid item xs={12}>
                        <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                            <Title>{currentReport['name']}</Title>
                        </Paper>
                    </Grid>
                    <AdminGeneralReport org_id={currentReport['organization_id']} />
                </>) :  ( <>
                    <Grid item xs={12}>
                        <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                            <Title>{currentReport['name']}</Title>
                        </Paper>
                    </Grid>
                    <AdminBlockreport org_id={currentReport['organization_id']}/>
                    </>)}
            </Grid>
        </Container>
    </Box>);
}