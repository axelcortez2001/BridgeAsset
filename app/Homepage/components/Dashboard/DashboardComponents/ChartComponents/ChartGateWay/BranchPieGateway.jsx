import React, { useState, useEffect } from "react";
import CustomChart from "../CustomChart";
import ExpandGateway from "../../ExpandComponents/ExpandGateway";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  branchLabelsAtom,
  selectedValueDataAtom,
} from "../../ExpandComponents/ExpandStore";
const BranchPieGateway = ({ chartData }) => {
  const [newChartData, setNewChartData] = useState(chartData);
  const [isExpandChart, setExpandChart] = useState(false);

  const [selectedValueData, setSelectedValueData] = useAtom(
    selectedValueDataAtom
  );

  const branchLabels = useAtomValue(branchLabelsAtom);

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
      selectedValueData.location === "branch"
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

  const labels = Object.keys(newChartData.newAsset);

  const dataValues = labels.map(
    (branch) => newChartData.newAsset[branch.toLocaleLowerCase()]?.length
  );

  const backgroundColors = labels.map((label) => {
    const status = branchLabels.find((s) => s.name === label);
    return status ? status.backgroundColor : "rgba(0, 0, 0, 0.1)";
  });

  const borderColors = labels.map((label) => {
    const status = branchLabels.find((s) => s.name === label);
    return status ? status.borderColor : "rgba(0, 0, 0, 1)";
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
        const selectedLabel = labels[elementIndex];
        const selectedValue = dataValues[elementIndex];
        const selectedItemData = {
          label: selectedLabel,
          value: selectedValue,
          data: chartData.newAsset[selectedLabel.toLocaleLowerCase()],
          location: "branch",
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
        label: "Number of Assets",
        data: dataValues,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const chartTitle = "Branches Asset Collection";

  return (
    <div className="w-full h-full flex items-center flex-col p-2">
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

export default BranchPieGateway;
