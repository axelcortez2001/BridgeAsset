import React, { useEffect, useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import { useAtom } from "jotai";
import { expandIndexAtom } from "../../AllComponents/Charts/AllComponentsStore";
import { dynamicValues } from "../../AllComponents/function";
import { IoMdExpand } from "react-icons/io";
import ExpandableCategories from "../../AllComponents/Charts/ExpandableCategories";
import CustomChart from "../CustomChart";

const AllComponentsGateway = ({ chartData, chartOpen }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [expandIndex, setExpandIndex] = useAtom(expandIndexAtom);
  const labels = Object.keys(chartData.newAsset);
  const data = dynamicValues(chartData, labels, expandIndex);
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
      {data && <CustomChart chartData={data} options={options} type='Bar' />}
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

export default AllComponentsGateway;
