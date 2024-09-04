import React from "react";
import CustomChart from "../CustomChart";

const LifeSpanGateWay = ({ chartData }) => {
  console.log("Asset Data at LifeSpan: ", chartData);
  const labelMapping = {
    Good: "Good",
    above: "More than 3 years",
    outOfWarranty: "Out of Warranty",
    invalid: "No Date",
  };

  // Get the keys
  const oldLabels = Object.keys(chartData.newAsset);
  // Map old labels to new labels
  const labels = oldLabels.map((label) => labelMapping[label] || label);
  const dataValues = oldLabels.map((label) => chartData.newAsset[label].length);
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          pointStyle: "circle",
          usePointStyle: true,
        },
      },

      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw} items`,
        },
      },
    },
  };
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Warranty Status",
        data: dataValues,
        backgroundColor: [
          "rgba(60, 179, 113, 0.7)",
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
        ],
        borderColor: [
          "rgba(60, 179, 113, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        fill: true,
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className='w-full max-h-[300px] flex items-center flex-col  p-2 '>
      <div className='w-full p-2 flex flex-row justify-between items-center'>
        <h2>Asset Warranty Status</h2>
      </div>
      <CustomChart chartData={data} options={options} type='Pie' />
    </div>
  );
};

export default LifeSpanGateWay;
