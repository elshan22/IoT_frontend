import * as React from 'react';
import "@progress/kendo-theme-material/dist/all.css";
import {Grid, GridColumn, GridToolbar} from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";

import { bikeStations } from "./data";
import TestLineChart from "./TestChart";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import {Graph} from "react-d3-graph";
import Box from "@mui/material/Box";
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import {blue, green, red} from "@mui/material/colors";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import EditIcon from "@mui/icons-material/Edit";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {ResponsiveContainer} from "recharts";
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { GridPDFExport } from "@progress/kendo-react-pdf";
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
// import DateFnsUtils from "@date-io/date-fns";
import {useState} from "react";
import Button from "@mui/material/Button";
import {HOST_URL} from "../../../settings";
import axios from "axios";

const BooleanCell = (props) => {
    return (
        <td>{props.dataItem[props.field] ? '✅' : '❌'}</td>
    )
}
const initialFilter = {
    logic: "and",
    filters: [

    ],
};
export default function TestReport() {

    const [dataState, setDataState] = React.useState({ skip: 0, take: 10 })
    const [result, setResult] = React.useState(process(bikeStations, dataState));
    const _export = React.useRef(null);
    const [filter, setFilter] = React.useState(initialFilter);
    const [selectedDate, handleDateChange] = useState(new Date());
    let gridPDFExport;
    const onDataStateChange = (event) => {
        setDataState(event.dataState);
        setResult(process(bikeStations, event.dataState));
    }
    const theme = createTheme();

    const exportPDF = () => {
        if (gridPDFExport !== null) {
            gridPDFExport.save();
        }
    };
    const excelExport = () => {
        if (_export.current !== null) {
            _export.current.save();
        }
    };

    function submitDate(event) {
        event.preventDefault()
        let from = document.getElementById('fromDateSecurity').value
        let to = document.getElementById('toDateSecurity').value

        let url = HOST_URL+"/api/users/ReportSecurityStation/";
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
        <div>
            <Grid
                data={result}
                filterable={true}
                onDataStateChange={onDataStateChange}
                pageable={true}
                // total={bikeStations.length}
                {...dataState}
                resizable={true}
                xs={6}
            >
                <GridToolbar>
                    <button title="Export Excel"
                            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                            onClick={excelExport}>
                        Export to Excel
                    </button>
                    <button
                        title="Export PDF"
                        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                        onClick={exportPDF}
                    >
                        Export PDF
                    </button>

                </GridToolbar>
                <GridToolbar>
                    <span style={{marginTop:"15px"}}>
                        <label style={{fontWeight:"bold"}}>
                            From date:
                        </label>
                        <input type="date" id="fromDateSecurity"/>
                    </span>{"          "}
                            <span style={{marginTop:"15px"}}>
                        <label style={{fontWeight:"bold"}}>
                            To date:
                        </label>
                        <input type="date" id="toDateSecurity"/>
                    </span>{"   "}
                            <span style={{marginTop:"15px"}}>
                        <Button type="submit" onClick={submitDate} >Submit</Button>
                    </span>
                </GridToolbar>
                <GridColumn field="ID" title="ID"/>
                <GridColumn field="DateTime" title="DateTime"/>
                <GridColumn field="Type" title="Type" />
                <GridColumn field="pass_rate" title="Pass rate" />
                <GridColumn field="result" title="status" cell={BooleanCell} />
            </Grid>
            <ThemeProvider theme={theme}>
                <CssBaseline />

                <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 3 }, p: { xs: 3, md: 1 } }} style={{border: "solid 1px #555", backgroundColor: "#fbfbf7", boxShadow: "0 0 10px rgb(0 0 0 / 60%)",
                        MozBoxShadow: "0 0 10px rgba(0,0,0,0.6)", WebkitBoxShadow: "0 0 10px rgb(0 0 0 / 60%)", OBoxShadow: "0 0 10px rgba(0,0,0,0.6)"}} >
                        <ResponsiveContainer>
                                <TestLineChart />
                        </ResponsiveContainer>

                    </Paper>
                </Container>
            </ThemeProvider>

        </div>


    );
}