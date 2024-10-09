import React, { useState, useEffect } from "react";
import CustomChart from "../CustomChart";
import { Button, useDisclosure } from "@nextui-org/react";
import ExpandGateway from "../../ExpandComponents/ExpandGateway";
import { useAtom, useAtomValue } from "jotai";
import {
  selectedValueDataAtom,
  warrantyLabelsAtom,
} from "../../ExpandComponents/ExpandStore";
const LifeSpanGateWay = ({ chartData }) => {
  const [newChartData, setNewChartData] = useState(chartData);

  const labelMapping = {
    Good: "Good",
    above: "More than 3 years",
    outOfWarranty: "Out of Warranty",
    invalid: "No Date",
  };

  const [selectedValueData, setSelectedValueData] = useAtom(
    selectedValueDataAtom
  );
  const warrantyLabels = useAtomValue(warrantyLabelsAtom);
  // Get the keys
  const oldLabels = Object.keys(newChartData.newAsset);
  // Map old labels to new labels
  const labels = oldLabels.map((label) => labelMapping[label] || label);

  const dataValues = oldLabels.map(
    (label) => newChartData.newAsset[label]?.length
  );

  const [isExpandChart, setExpandChart] = useState(false);

  const handleExpandChart = () => {
    setExpandChart((prev) => !prev);

    if (isExpandChart) {
      setSelectedValueData(null);
    }
  };

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
    } else if (isExpandChart === false) {
      setNewChartData(chartData);
    }
  }, [selectedValueData, chartData]);

  const dataforTable = oldLabels.map((label) => newChartData.newAsset[label]);

  const backgroundColors = oldLabels.map((label) => {
    const status = warrantyLabels.find((s) => s.name === label);
    return status ? status.backgroundColor : "rgba(0, 0, 0, 0.1)";
  });

  const borderColors = oldLabels.map((label) => {
    const status = warrantyLabels.find((s) => s.name === label);
    return status ? status.borderColor : "rgba(0, 0, 0, 1)";
  });
  const options = {
    responsive: true,
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
    onHover: (event, chartElement) => {
      event.native.target.style.cursor = chartElement[0]
        ? "pointer"
        : "default";
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

        if (!isExpandChart) {
          handleExpandChart();
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
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        fill: true,
        borderWidth: 1,
      },
    ],
  };

  const chartTitle = "Asset Warranty Status";

  return (
    <div className="w-full h-full flex items-center flex-col p-2 ">
      <div className="w-full h-[40px] flex flex-row justify-between items-center">
        <ExpandGateway
          chartTitle={chartTitle}
          chartData={data}
          options={options}
          type="Pie"
          onClose={handleExpandChart}
          isOpen={isExpandChart}
        />
      </div>
      <div className="w-full h-[calc(100%-40px)] flex items-center justify-center border-t border-a-grey">
        <CustomChart chartData={data} options={options} type="Pie" />
      </div>
    </div>
  );
};

export default LifeSpanGateWay;
