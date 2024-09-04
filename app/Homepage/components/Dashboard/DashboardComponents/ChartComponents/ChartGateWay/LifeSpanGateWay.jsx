import React, { useState, useEffect } from "react";
import CustomChart from "../CustomChart";
import { Button, useDisclosure } from "@nextui-org/react";
import ExpandGateway from "../../ExpandComponents/ExpandGateway";
import { useAtom } from "jotai";
import {
  isBranchOpenAtom,
  selectedValueDataAtom,
} from "../../ExpandComponents/ExpandStore";
const LifeSpanGateWay = ({ chartData }) => {
  const [newChartData, setNewChartData] = useState(chartData);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const labelMapping = {
    Good: "Good",
    above: "More than 3 years",
    outOfWarranty: "Out of Warranty",
    invalid: "No Date",
  };

  const [isBranchOpen, setIsBranchOpen] = useAtom(isBranchOpenAtom);
  const [selectedValueData, setSelectedValueData] = useAtom(
    selectedValueDataAtom
  );
  // Get the keys
  const oldLabels = Object.keys(newChartData.newAsset);
  // Map old labels to new labels
  const labels = oldLabels.map((label) => labelMapping[label] || label);
  const dataValues = oldLabels.map(
    (label) => newChartData.newAsset[label]?.length
  );
  useEffect(() => {
    if (
      selectedValueData &&
      selectedValueData.label &&
      selectedValueData.location === "warranty"
    ) {
      const filteredData = chartData.newAsset[selectedValueData.label] || [];
      setNewChartData((prevData) => ({
        ...prevData,
        newAsset: {
          [selectedValueData.label]: filteredData,
        },
      }));
    } else if (isBranchOpen === false) {
      setNewChartData(chartData);
    }
  }, [selectedValueData, chartData]);
  const dataforTable = oldLabels.map((label) => newChartData.newAsset[label]);
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
    onClick: (event, elements, context) => {
      if (elements.length > 0) {
        const elementIndex = elements[0].index;
        const selectedLabel = oldLabels[elementIndex];
        const selectedValue = dataValues[elementIndex];
        const selectedItemData = {
          label: selectedLabel,
          value: selectedValue,
          data: dataforTable[elementIndex],
          location: "warranty",
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
  const handleModal = () => {
    if (!isBranchOpen) {
      onOpenChange(true);
      setIsBranchOpen(true);
    }
  };
  const chartTitle = "Asset Warranty Status";
  return (
    <div className='w-full max-h-[300px] flex items-center flex-col  p-2 '>
      <div className='w-full p-2 flex flex-row justify-between items-center'>
        <ExpandGateway
          chartTitle={chartTitle}
          chartData={data}
          options={options}
          type='Pie'
          onOpen={onOpen}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          handleModal={handleModal}
        />
      </div>
      <CustomChart chartData={data} options={options} type='Pie' />
    </div>
  );
};

export default LifeSpanGateWay;
