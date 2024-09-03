import React from "react";
import CustomChart from "../CustomChart";

const BranchPieGateway = ({ chartData, chartOpen }) => {
  const labels = Object.keys(chartData.newAsset);
  const dataValues = labels.map(
    (branch) => chartData.newAsset[branch.toLocaleLowerCase()].length
  );

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "right",
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
        label: "Number of Assets",
        data: dataValues,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className='w-full max-h-[300px] flex items-center flex-col  p-2 '>
      <div className='w-full p-2 flex flex-row justify-between items-center'>
        <h2>Branches Asset Collection</h2>
      </div>
      <CustomChart chartData={data} options={options} type='Pie' />
    </div>
  );
};

export default BranchPieGateway;
