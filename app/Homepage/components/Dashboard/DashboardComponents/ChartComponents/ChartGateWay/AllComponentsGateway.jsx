import React, { useEffect, useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import { useAtom, useAtomValue } from "jotai";
import { expandIndexAtom } from "../../AllComponents/Charts/AllComponentsStore";
import { dynamicValues } from "../../AllComponents/function";
import { IoMdExpand } from "react-icons/io";
import ExpandableCategories from "../../AllComponents/Charts/ExpandableCategories";
import CustomChart from "../CustomChart";
import { filterTypeAtom } from "../../ExpandComponents/ExpandStore";

const AllComponentsGateway = ({ chartData, chartOpen }) => {
  const [expandIndex, setExpandIndex] = useAtom(expandIndexAtom);
  const filterType = useAtomValue(filterTypeAtom);
  const labels = Object.keys(chartData.newAsset);
  const data = dynamicValues(chartData, labels, expandIndex);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
            return `${context.dataset.label}: ${context.raw} items`;
          },
        },
      },
    },
    onHover: (event, chartElement) => {
      event.native.target.style.cursor = chartElement[0]
        ? "pointer"
        : "default";
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
      handleExpandChart();
    }
  };

  const [isExpandChart, setExpandChart] = useState(false);
  const handleExpandChart = () => {
    setExpandChart((prev) => !prev);
  };

  return (
    <>
      <div className="w-full h-full flex items-center flex-col p-2 justify-center">
        {!chartOpen && (
          <div className="w-full h-[40px] flex flex-row justify-between items-center border-b border-a-grey">
            <h2 className="font-bold tracking-wide ss:text-lg">
              Asset Categories
            </h2>
            <div className="absolute right-2">
              <Button
                isIconOnly
                variant="light"
                onClick={() => handleModalIndex(null)}
              >
                <IoMdExpand size={20} title="Expand" />
              </Button>
            </div>
          </div>
        )}

        <div className="w-full h-[calc(100%-40px)] flex items-center justify-center">
          {data && (
            <CustomChart chartData={data} options={options} type="Bar" className={"max-h-[90%] max-w-[90%] "} />
          )}
        </div>
      </div>

      <ExpandableCategories
        isOpen={isExpandChart}
        onClose={handleExpandChart}
        chartData={chartData}
        data={data}
      />
    </>
  );
};

export default AllComponentsGateway;
