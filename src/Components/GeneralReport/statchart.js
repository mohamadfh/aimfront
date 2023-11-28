import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label} from 'recharts';
import {useTheme} from "@mui/material/styles";
import * as React from "react";


// Generate Sales Data
function createData(time, amount) {
    return {time, amount};
}

const data = [
    {
        name: 'جاه طلبی',
        IndustryAverage: 0.4000,
        Organization: 0.2400,
        amt: 0.2400,
    },
    {
        name: 'موارد کاربردی',
        IndustryAverage: 0.3000,
        Organization: 0.1398,
        amt: 2210,
    },
    {
        name: 'سازمان دهی',
        IndustryAverage: 0.2000,
        Organization: 0.9800,
        amt: 2290,
    },
    {
        name: 'تخصص',
        IndustryAverage: 0.2780,
        Organization: 0.3908,
        amt: 2000,
    },
    {
        name: 'فرهنگ سازمانی',
        IndustryAverage: 0.1890,
        Organization: 0.4800,
        amt: 2181,
    },
    {
        name: 'فناوری',
        IndustryAverage: 0.2390,
        Organization: 0.3800,
        amt: 2500,
    },
    {
        name: 'داده',
        IndustryAverage: 0.3490,
        Organization: 0.4300,
        amt: 2100,
    },
    {
        name: 'اکوسیستم هوش مصنوعی ',
        IndustryAverage: 0.3490,
        Organization: 0.300,
        amt: 2100,
    },
    {
        name: 'اجرا',
        IndustryAverage: 0.3490,
        Organization: 0.4300,
        amt: 2100,
    },
];

export default function StatChart() {
    const theme = useTheme();

    return (
        <React.Fragment>
            <Title>امتیاز سازمان در هر بلوک موضوعی</Title>
            <ResponsiveContainer>
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="Organization" stroke="#8884d8" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="IndustryAverage" stroke="#82ca9d"/>
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}
