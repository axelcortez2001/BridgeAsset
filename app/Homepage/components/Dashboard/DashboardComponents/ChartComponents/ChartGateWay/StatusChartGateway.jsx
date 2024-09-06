import React, { useState, useEffect } from "react";
import CustomChart from "../CustomChart";
import ExpandGateway from "../../ExpandComponents/ExpandGateway";
import { useAtom, useAtomValue } from "jotai";
import {
  isBranchOpenAtom,
  selectedValueDataAtom,
  statusLabelsAtom,
} from "../../ExpandComponents/ExpandStore";
import { Button, useDisclosure } from "@nextui-org/react";
import { categorizedStatus } from "../../AllComponents/function";
const StatusChartGateway = ({ chartData, chartOpen }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newChartData, setNewChartData] = useState(chartData);
  const statusLabels = useAtomValue(statusLabelsAtom);
  const [selectedValueData, setSelectedValueData] = useAtom(
    selectedValueDataAtom
  );
  const [isBranchOpen, setIsBranchOpen] = useAtom(isBranchOpenAtom);

  useEffect(() => {
    if (
      selectedValueData &&
      selectedValueData.label &&
      selectedValueData.location === "status"
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
  const labels = Object.keys(newChartData.newAsset);
  const dataValues = labels.map(
    (label) => newChartData.newAsset[label]?.length
  );
  // Map labels to their respective colors
  const backgroundColors = labels.map((label) => {
    const status = statusLabels.find((s) => s.name === label);
    return status ? status.backgroundColor : "rgba(0, 0, 0, 0.1)";
  });

  const borderColors = labels.map((label) => {
    const status = statusLabels.find((s) => s.name === label);
    return status ? status.borderColor : "rgba(0, 0, 0, 1)";
  });

  const options = {
    responsive: true,
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
        const selectedLabel = labels[elementIndex];
        const selectedValue = dataValues[elementIndex];
        const selectedItemData = {
          label: selectedLabel,
          value: selectedValue,
          data: chartData.newAsset[selectedLabel],
          location: "status",
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
  const handleModal = () => {
    if (!isBranchOpen) {
      onOpenChange(true);
      setIsBranchOpen(true);
    }
  };
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Number of Assets",
        data: dataValues,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };
  const chartTitle = "Status Asset Collection";
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

export default StatusChartGateway;
