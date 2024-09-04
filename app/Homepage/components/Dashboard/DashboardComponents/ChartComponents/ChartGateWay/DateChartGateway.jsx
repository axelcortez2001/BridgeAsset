import React from "react";
import CustomChart from "../CustomChart";

const DateChartGateway = ({ chartData }) => {
  const labels = chartData?.newAsset?.labels;
  const dataValues = chartData?.newAsset?.unitPrices;
  console.log("chart Data at Date: ", chartData);
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw} Php`,
        },
      },
      datalabels: {
        //remove labels for pie and dou
        display: true,
        anchor: "end",
        align: "end",
        color: "black",
        font: {
          weight: "bold",
        },
        formatter: (value, context) => {
          return value;
        },
      },
    },
  };
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Total Amount",
        data: dataValues,
        backgroundColor: [
          //   "rgba(255, 99, 132, 0.2)",
          //   "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          //   "rgba(255, 99, 132, 1)",
          //   "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderJoinStyle: "bevel",
        borderWidth: 2,
      },
    ],
  };
  return (
    <div className='w-full max-h-screen flex items-center flex-col  p-2 '>
      <div className='w-full p-2 flex flex-row justify-between items-center'>
        <h2>Cost Accumulated</h2>
      </div>
      <CustomChart chartData={data} options={options} type='Line' />
    </div>
  );
};

export default DateChartGateway;
