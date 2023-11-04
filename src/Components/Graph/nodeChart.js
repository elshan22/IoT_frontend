import React, { Component } from "react";
import Chart from "react-apexcharts";
import Button from "@mui/material/Button";




function LineChart2(props) {
    let series =
        [
            {
                name: "NewGraph",
                // data: props.temps
                data: props.temps
            }
        ]
 let options =
    {
        xaxis: {
            // categories: props.times
            categories: props.times
        }
    }
    return (
        <React.Fragment>
            <Button variant="contained" onClick={()=>{

            props.setStopGraph(true)
            }}>Clear/Stop receive data</Button>
            <Button variant="contained" onClick={()=>{

                props.setStopGraph(false)
            }}>Start Graph</Button>
            <Chart type="line" series={series} options={options}/>
        </React.Fragment>

    );

}

export default LineChart2;