// import React from 'react';
// import Chart from 'react-apexcharts';
//
// function TestLineChart(props) {
//
//     console.log("in line chart test")
//     // console.log(props.temps)
//     // console.log(props.times)
//     const series = [
//         {
//             name: "Guests",
//             // data: props.temps
//             data: ["0.25","0.26","0.78","0.2","0.5","0.65"]
//         }
//     ];
//     const options = {
//         xaxis: {
//             // categories: props.times
//             categories: ["1401-03-18 12:39:55","1401-03-18 14:39:55","1401-03-18 18:39:55","1401-03-18 21:39:55","1401-03-19 12:39:55","1401-03-19 18:39:55"]
//         }
//     };
//     return (
//         <Chart type="line" series={series} options={options} />
//     );
//
// }
//
// export default TestLineChart;

import React from "react";
import { render } from "react-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const options = {
    chart: {
        type: "spline"
    },
    title: {
        text: "Security Status"
    },
    xAxis: {
        categories: ['12:10', '12:30', '13:10', '14:00', '15:10', '15:45']
    },
    yAxis: {
        title: {
            text: "security percentage level "
        },
        // labels: {
        //     align: 'left',
        //     x: 0,
        //     y: -2
        // },
    },
    series: [
        {
            name: 'time-stamp ',
            data: [50, 20, 24,40, 30, 60]
        }
    ]
};

function TestLineChart(props) {

    console.log("in line chart test")
    // console.log(props.temps)
    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );

}

export default TestLineChart;