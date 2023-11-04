import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from '../routes/Dashboard/Header/Title';
import {useSelector} from "react-redux";
import store from "../store";
import Button from "@mui/material/Button";
import {HOST_URL} from "../settings";
import axios from "axios";

// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}

const data = [
    createData('00:00', 17),
    createData('06:00', 6),
    createData('09:00', 8),
    createData('12:00', 15),
    createData('15:00', 20),
    createData('18:00', 24),
    createData('21:00', 24),
    createData('24:00', undefined),
];

export default function Chart(props) {
    const theme = useTheme();

    function submitDate(event) {
        console.log("in romm temp from to to")
        let from = document.getElementById('fromDateRoom').value
        let to = document.getElementById('toDateRoom').value

        let url = HOST_URL+"/api/users/RoomTempDate/";
        let data2 = {
            from:from,
            to:to
        }
        axios.post(url, data2, { // receive two parameter endpoint url ,form data
        })
            .then(res => { // then print response status
                console.log(res);
            })

    }

    return (
        <React.Fragment>
            <Title>Today</Title>
            <div style={{display:"inline"}}>
                <span style={{marginTop:"15px"}}>
                        <label style={{fontWeight:"bold"}}>
                            From date:
                        </label>
                        <input type="date" id="fromDateRoom"/>
                </span>{"          "}
                <span style={{marginTop:"15px"}}>
                        <label style={{fontWeight:"bold"}}>
                            To date:
                        </label>
                        <input type="date" id="toDateRoom"/>
                </span>{"   "}
                <span style={{marginTop:"15px"}}>
                        <Button type="submit" onClick={submitDate} >Submit</Button>
                </span>
            </div>
            <ResponsiveContainer>

                <LineChart
                    data={props.data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis
                        dataKey="time"
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    />
                    <YAxis
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    >
                        <Label
                            angle={270}
                            position="left"
                            style={{
                                textAnchor: 'middle',
                                fill: theme.palette.text.primary,
                                ...theme.typography.body1,
                            }}
                        >
                            Temperature
                        </Label>
                    </YAxis>
                    <Line
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="amount"
                        stroke={theme.palette.primary.main}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}