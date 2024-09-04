import React, { useState, useEffect } from "react";
import CustomChart from "../CustomChart";
import ExpandGateway from "../../ExpandComponents/ExpandGateway";
import { Button, useDisclosure } from "@nextui-org/react";
import { useAtom } from "jotai";
import {
  isBranchOpenAtom,
  selectedValueDataAtom,
} from "../../ExpandComponents/ExpandStore";

const DateChartGateway = ({ chartData }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newChartData, setNewChartData] = useState(chartData);
  const [isBranchOpen, setIsBranchOpen] = useAtom(isBranchOpenAtom);
  const [selectedValueData, setSelectedValueData] = useAtom(
    selectedValueDataAtom
  );
  const labels = newChartData?.newAsset?.labels;
  const dataValues = newChartData?.newAsset?.unitPrices;
  useEffect(() => {
    if (
      selectedValueData &&
      selectedValueData.label &&
      selectedValueData.location === "date"
    ) {
      const filteredData =
        chartData.newAsset.value[selectedValueData.index] || [];
      setNewChartData((prevData) => ({
        ...prevData,
        newAsset: {
          [selectedValueData.label]: filteredData,
        },
      }));
      console.log("selectedValueData.label: ", filteredData);
      console.log("filteredData: ", chartData.newAsset.value);
    } else if (isBranchOpen === false) {
      setNewChartData(chartData);
    }
  }, [selectedValueData, chartData]);

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
    onClick: (event, elements, context) => {
      if (elements.length > 0) {
        const elementIndex = elements[0].index;
        const selectedLabel = labels[elementIndex];
        const selectedValue = dataValues[elementIndex];
        const selectedItemData = {
          label: selectedLabel,
          value: selectedValue,
          data: chartData.newAsset.value[elementIndex],
          location: "date",
          index: elementIndex,
        };
        setIsBranchOpen(true);
        if (!isBranchOpen) {
          onOpenChange(true);
        }
        if (selectedValueData === null) {
          setSelectedValueData(selectedItemData);
        } else {
          setNewChartData(chartData);
          setSelectedValueData(null);
        }
      }
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
  const handleModal = () => {
    if (!isBranchOpen) {
      onOpenChange(true);
      setIsBranchOpen(true);
    }
  };
  const chartTitle = "Cost Accumulated";
  return (
    <div className='w-full max-h-screen flex items-center flex-col  p-2 '>
      <div className='w-full p-2 flex flex-row justify-between items-center'>
        <ExpandGateway
          chartTitle={chartTitle}
          chartData={data}
          options={options}
          type='Line'
          onOpen={onOpen}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          handleModal={handleModal}
        />
      </div>
      <CustomChart chartData={data} options={options} type='Line' />
    </div>
  );
};

export default DateChartGateway;
