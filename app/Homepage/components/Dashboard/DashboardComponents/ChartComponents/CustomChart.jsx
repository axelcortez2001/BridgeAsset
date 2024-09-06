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

const CustomChart = ({ chartData, options, type }) => {
  const data = chartData;
  // Chart options

  return type === "Bar" ? (
    <Bar data={data} options={options} />
  ) : type === "Pie" ? (
    <Doughnut data={data} options={options} />
  ) : (
    type === "Line" && <Line data={data} options={options} />
  );
};

export default CustomChart;
