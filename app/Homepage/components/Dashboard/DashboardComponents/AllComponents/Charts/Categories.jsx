import React, { useState, useEffect } from "react";
import { Pie, Bar, Line, Doughnut } from "react-chartjs-2";
import { IoMdExpand } from "react-icons/io";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { dynamicValues } from "../function";

// Register the components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ChartDataLabels
);

const Categories = ({ chartData }) => {
  const labels = Object.keys(chartData.newAsset);
  const dataValues = labels.map(
    (category) => chartData.newAsset[category].length
  );

  console.log("Data values: ", dynamicValues(chartData, labels));
  const data = dynamicValues(chartData, labels);
  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    elements: {
      bar: {
        borderRadius: 15,
        borderWidth: 0.7,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            console.log("Context: ", context);
            return `${context.dataset.label}: ${context.raw} items`;
          },
        },
      },
    },
  };

  return (
    <div className='w-full max-h-[700px] flex items-center flex-col  p-2 '>
      {/* header */}
      <div className='w-full p-2 flex flex-row justify-between items-center'>
        <h2>Asset Categories</h2>

        <IoMdExpand
          size={20}
          title='Expand'
          className='hover:cursor-pointer hover:bg-gray-200'
        />
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Categories;
