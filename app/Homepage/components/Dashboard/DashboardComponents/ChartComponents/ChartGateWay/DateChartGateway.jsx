import React, { useState, useEffect } from "react";
import CustomChart from "../CustomChart";
import ExpandGateway from "../../ExpandComponents/ExpandGateway";
import { Button, useDisclosure, Select, SelectItem } from "@nextui-org/react";
import { useAtom } from "jotai";
import {
  filterTypeAtom,
  isBranchOpenAtom,
  selectedValueDataAtom,
} from "../../ExpandComponents/ExpandStore";

const DateChartGateway = ({ chartData }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newChartData, setNewChartData] = useState(chartData);
  const [isBranchOpen, setIsBranchOpen] = useAtom(isBranchOpenAtom);
  const [filterType, setFilterType] = useAtom(filterTypeAtom);
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
    } else if (isBranchOpen === false) {
      setNewChartData(chartData);
    }
  }, [selectedValueData, chartData]);
  const labels = newChartData?.newAsset?.labels;
  const dataValues = newChartData?.newAsset?.unitPrices;
  const maxValue = Math.max(...dataValues);
  const options = {
    maintainAspectRatio: true,
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
    responsive: true,

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
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
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
    <div className='w-full border  max-h-[550px] flex items-center flex-col  p-4 '>
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
      <Select
        label='filter'
        placeholder=''
        className='max-w-xs mb-2'
        size='sm'
        selectedValue={filterType}
      >
        <SelectItem key='daily' onClick={() => setFilterType("daily")}>
          Daily
        </SelectItem>
        <SelectItem key='monthly' onClick={() => setFilterType("monthly")}>
          Monthly
        </SelectItem>
        <SelectItem key='yearly' onClick={() => setFilterType("yearly")}>
          Yearly
        </SelectItem>
      </Select>
      <CustomChart chartData={data} options={options} type='Line' />
    </div>
  );
};

export default DateChartGateway;
