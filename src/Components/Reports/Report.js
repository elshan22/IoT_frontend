import React, { Fragment, useState } from "react";
import * as ReactDOM from 'react-dom';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { GridPDFExport } from "@progress/kendo-react-pdf";
import {filterBy} from "@progress/kendo-data-query";
// import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { alpha } from '@material-ui/core/styles';
import Button from "@mui/material/Button";
import {HOST_URL} from "../../settings";
import axios from "axios";

let states = [
    {
        "Time":"please submit time",
        "ID":"",
        "RoomTemp": "",
        "Humidity":"",
        "Light":"",
        "AnalogSensor1":"",
        "AnalogSensor2":"",
        "WorkMode":"",
        "UserSetPoint":"",
        "HVACType1":"",
        "HVACSetPoint1":"",
        "HVACTemp1":"",
        "HVACState1":"",
        "HVACType2":"",
        "HVACSetPoint2":"",
        "HVACTemp2":"",
        "HVACState2":""
    }
];

const initialFilter = {
    logic: "and",
    filters: [

    ],
};

export default function ReportStates() {

    const [filter, setFilter] = React.useState(initialFilter);
    const [newStates, setNewStates] = React.useState(states)
    const [selectedDate, handleDateChange] = useState(new Date());
    const _export = React.useRef(null);
    let gridPDFExport;

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

    const BooleanCell = (props) => {
        return (
            <td>{props.dataItem[props.field] ? '✅' : '❌'}</td>
        )
    }
    function getGrid() {
        function submitDate(event) {
            event.preventDefault()
            let from = document.getElementById('fromDateReport').value
            let to = document.getElementById('toDateReport').value

            let url = HOST_URL+"/api/users/ReportRoomTem/";
            let data2 = {
                from:from,
                to:to
            }
            axios.post(url, data2, { // receive two parameter endpoint url ,form data
            })
                .then(res => { // then print response status
                    console.log("get data:")
                    console.log(res);
                    setNewStates(res)
                })

        }

        return <Grid data={filterBy(newStates, filter)}

                     style={{
                         height: '1020px'
                     }}>
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
                <input type="date" id="fromDateReport"/>
            </span>{"          "}
                <span style={{marginTop:"15px"}}>
                <label style={{fontWeight:"bold"}}>
                    To date:
                </label>
                <input type="date" id="toDateReport"/>
            </span>{"   "}
                <span style={{marginTop:"15px"}}>
                <Button type="submit" onClick={submitDate} >Submit</Button>
            </span>
            </GridToolbar>

            <GridColumn field="ID" title="ID"
                        filter="date"
                        format="{0:d}"
                        disableColumnFilter/>
            <GridColumn field="Time" title="Time" width="200%"/>
            <GridColumn field="RoomTemp"  title="Dry Temperature"/>
            <GridColumn field="Humidity" title="Wet Temperature"/>
            <GridColumn field="Light" title="Soil humidity Sensor 1"/>
            <GridColumn field="AnalogSensor1" title="Soil humidity Sensor 2"/>
            {/*<GridColumn field="AnalogSensor2" title="Smoke Sensor"/>*/}
            {/*<GridColumn field="WorkMode" title="WorkMode"/>*/}
            {/*<GridColumn field="UserSetPoint"  title="UserSetPoint"/>*/}
            {/*<GridColumn field="HVACType1" title="HVACType1" />*/}
            {/*<GridColumn field="HVACSetPoint1" title="HVACSetPoint1"/>*/}
            {/*<GridColumn field="HVACTemp1" title="HVACTemp1"/>*/}
            {/*<GridColumn field="HVACState1" title="HVACState1"/>*/}
            {/*<GridColumn field="HVACType2" title="HVACType2"/>*/}
            {/*<GridColumn field="HVACSetPoint2" title="HVACSetPoint2"/>*/}
            {/*<GridColumn field="HVACTemp2" title="HVACTemp2"/>*/}
            {/*<GridColumn field="HVACState2" title="HVACState2"/>*/}
        </Grid>
            ;

    }

    return <ExcelExport data={newStates} ref={_export}>
        <GridPDFExport ref={(pdfExport) => (gridPDFExport = pdfExport)}>
            {getGrid()}
        </GridPDFExport>
        {getGrid()}
    </ExcelExport>;
};
// <GridColumn field="ID" title="ID"
//             filter="date"
//             format="{0:d}"
//             disableColumnFilter/>
// <GridColumn field="Time" title="Time"/>
// <GridColumn field="Temp"  title="Dry Temperature"/>
// <GridColumn field="Humidity" title="Wet Temperature "/>
// <GridColumn field="Light" title="Soil humidity Sensor 1"/>
// <GridColumn field="CO2" title="Soil humidity Sensor 2"/>