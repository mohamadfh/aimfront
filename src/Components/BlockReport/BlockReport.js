import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import * as React from "react";
import {useState, useEffect} from "react";
import useGet from "../../Hooks/useGet";
import {exportToPng} from "../../GlobalFunctions/ExportPNG";
import Typography from '@mui/material/Typography';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import Button from "@mui/material/Button";

function Title(props) {
    return (
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            {props.children}
        </Typography>
    );
}


function BlockBarChart({blockNo}) {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    const {data, error} = useGet(
        `${apiUrl}/api/blocks/${blockNo}/report`,
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
                <ResponsiveContainer id={"block-chart-container"} minWidth={400}>
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
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Button variant="contained" onClick={() => exportToPng("block-chart-container")}>
                            دانلود نمودار
                        </Button>
                    </Box>
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
        <ResponsiveContainer id={"question-chart-container"} minWidth={500}>
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
            <Box display="flex" justifyContent="center" alignItems="center">
                <Button variant="contained" onClick={() => exportToPng("question-chart-container")}>
                    دانلود نمودار
                </Button>
            </Box>
         </ResponsiveContainer>
    </>)}
    </>);
}

function Questionreport({blockNo}) {
    const [currentQuestion, setCurrentQuestion] = useState(-1);
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    const {data, error} = useGet(
        `${apiUrl}/api/blocks/${blockNo}/count`,
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

export default function Blockreport() {
    const [currentBlock, setcurrentBlock] = useState(1);
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    const {data, error} = useGet(
        `${apiUrl}/api/blocks/`,
        sessionStorage.getItem("token")
    );

    const dataArray = Array.from(data);
    const handleChange = (event) => {
        setcurrentBlock(event.target.value);
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
                {/* Chart */}
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
                                <BlockBarChart blockNo={currentBlock}/>
                        </Paper>
                    </Grid>
                    <Questionreport blockNo={currentBlock}/>
                </>)}
            </Grid>
        </Container>
    </Box>);
}

