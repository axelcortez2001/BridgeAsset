import React, { useState, useEffect } from "react";
import CustomChart from "../CustomChart";
import ExpandGateway from "../../ExpandComponents/ExpandGateway";
import { Button, useDisclosure, Select, SelectItem } from "@nextui-org/react";
import { useAtom } from "jotai";
import {
  filterTypeAtom,
  selectedValueDataAtom,
} from "../../ExpandComponents/ExpandStore";

const DateChartGateway = ({ chartData }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newChartData, setNewChartData] = useState(chartData);
  const [filterType, setFilterType] = useAtom(filterTypeAtom);
  const [isExpandChart, setExpandChart] = useState(false);

  const [selectedValueData, setSelectedValueData] = useAtom(
    selectedValueDataAtom
  );

  useEffect(() => {
    if (
      selectedValueData &&
      selectedValueData.label &&
      selectedValueData.location === "date"
    ) {
      const filteredData = {
        labels: [chartData.newAsset.labels[selectedValueData.index]],
        unitPrices: [chartData.newAsset.unitPrices[selectedValueData.index]],
      };
      const newData = (prevData) => ({
        ...prevData,
        newAsset: filteredData,
      });
      setNewChartData(newData());
    } else if (isExpandChart === false) {
      setNewChartData(chartData);
    }
  }, [selectedValueData, chartData]);

  const handleExpandChart = () => {
    setExpandChart((prev) => !prev);

    if (isExpandChart) {
      setSelectedValueData(null);
    }
  };

  const labels = newChartData?.newAsset?.labels;
  const dataValues = newChartData?.newAsset?.unitPrices;
  const maxValue = Math.max(...dataValues);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 10,
    },
    scales: {
      y: {
        ticks: {
          min: 0,
        },
        suggestedMax: maxValue + 10000,
      },
      x: {
        ticks: {
          autoSkip: false,
        },
      },
    },

    plugins: {
      legend: {
        position: "right",
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
          data: chartData.newAsset.value[elementIndex],
          location: "date",
          index: elementIndex,
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
        label: "Total Amount",
        data: dataValues,
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderJoinStyle: "bevel",
        borderWidth: 2,
      },
    ],
  };

  const chartTitle = "Cost Accumulated";

  return (
    <div className="w-full h-full flex items-center flex-col p-2 ">
      <div className="w-full h-[40px] flex flex-row justify-between items-center">
        <ExpandGateway
          chartTitle={chartTitle}
          chartData={data}
          options={options}
          type="Line"
          isOpen={isExpandChart}
          onClose={handleExpandChart}
          middleContent={
            <>
              <Select
                label="filter"
                placeholder=""
                classNames={{ trigger: "min-h-[0px] h-[32px] bg-a-grey/80" }}
                size="sm"
                selectedValue={filterType}
              >
                <SelectItem key="daily" onClick={() => setFilterType("daily")}>
                  Daily
                </SelectItem>
                <SelectItem
                  key="monthly"
                  onClick={() => setFilterType("monthly")}
                >
                  Monthly
                </SelectItem>
                <SelectItem
                  key="yearly"
                  onClick={() => setFilterType("yearly")}
                >
                  Yearly
                </SelectItem>
              </Select>
            </>
          }
        />
      </div>

      <div className="w-full h-[calc(100%-40px)] flex items-center justify-center border-t border-a-grey">
        <CustomChart chartData={data} options={options} type="Line" />
      </div>
    </div>
  );
};

export default DateChartGateway;
