import React, { useState, useEffect } from "react";
import CustomChart from "../CustomChart";
import ExpandGateway from "../../ExpandComponents/ExpandGateway";
import { Button, useDisclosure, Select, SelectItem } from "@nextui-org/react";
import { useAtom } from "jotai";
import {
  isBranchOpenAtom,
  selectedValueDataAtom,
} from "../../ExpandComponents/ExpandStore";
import { sortYTDData } from "../../AllComponents/function";

const YTDGateway = ({ chartData }) => {
  const newChartData = sortYTDData(chartData);
  const labels = Object.keys(newChartData);
  const dataValues = Object.values(newChartData);
  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "right",
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
        label: "YTD of Assets",
        data: dataValues,
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const chartTitle = "Ytd Chart Data";
  return (
    <div className='w-full max-h-screen overflow-y-auto'>
      <div className='w-full p-2 flex flex-row justify-between items-center'>
        {chartTitle}
      </div>
      <CustomChart chartData={data} options={options} type='Bar' />
    </div>
  );
};

export default YTDGateway;
