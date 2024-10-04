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
  Filler,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

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
  ChartDataLabels,
  Filler
);

const CustomChart = ({ chartData, options, type, className }) => {
  const data = chartData;
  // Chart options

  return type === "Bar" ? (
    <Bar data={data} options={options} className={className} />
  ) : type === "Pie" ? (
    <Doughnut data={data} options={options} className={className} />
  ) : (
    type === "Line" && (
      <Line data={data} options={options} className={className} />
    )
  );
};

export default CustomChart;
