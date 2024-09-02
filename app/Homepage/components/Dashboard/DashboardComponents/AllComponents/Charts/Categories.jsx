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
import ExpandableCategories from "./ExpandableCategories";
import { Button, useDisclosure } from "@nextui-org/react";
import { useAtom, useSetAtom } from "jotai";
import { expandIndexAtom } from "./AllComponentsStore";
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

const Categories = ({ chartData, chartOpen }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [expandIndex, setExpandIndex] = useAtom(expandIndexAtom);
  const labels = Object.keys(chartData.newAsset);
  const dataValues = labels.map(
    (category) => chartData.newAsset[category].length
  );

  const data = dynamicValues(chartData, labels, expandIndex);
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
        position: "right",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.raw} items`;
          },
        },
      },
    },
    onClick: (event, elements, context) => {
      if (elements.length > 0) {
        const elementIndex = elements[0].index;
        handleModalIndex(elements[0]?.datasetIndex);
      }
    },
  };
  const handleModalIndex = (dataIndex) => {
    if (expandIndex !== null) {
      setExpandIndex(null);
    } else {
      setExpandIndex(dataIndex);
    }
    if (!chartOpen) {
      onOpenChange(true);
    }
  };

  return (
    <div className='w-full max-h-[700px] flex items-center flex-col  p-2 '>
      {/* header */}
      <div className='w-full p-2 flex flex-row justify-between items-center'>
        <h2>Asset Categories</h2>
        {!chartOpen && (
          <IoMdExpand
            size={20}
            title='Expand'
            className='hover:cursor-pointer hover:bg-gray-200'
            onClick={() => handleModalIndex(null)}
          />
        )}
        {expandIndex !== null && (
          <div
            className='border rounded-md'
            onClick={() => handleModalIndex(null)}
          >
            Clear
          </div>
        )}
      </div>

      <Bar data={data} options={options} />
      <ExpandableCategories
        onOpen={onOpen}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className='p-2 max-h-screen'
        chartData={chartData}
        data={data}
      />
    </div>
  );
};

export default Categories;
