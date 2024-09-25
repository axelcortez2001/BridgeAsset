import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { useState } from "react";

const TableFooter = ({ column, data }) => {
  const [formulaState, setFormulaState] = useState("Sum");
  const totalRow = () => {
    const totals = () => {
      if (column?.accessorKey?.startsWith("unit_price")) {
        let values = data.map(
          (row) => parseFloat(row[column.accessorKey]) || 0
        );
        values.sort((a, b) => a - b);
        let Sum = values.reduce((acc, value) => acc + value, 0).toFixed(2);
        let Count = values.length;
        let Average = Count ? (Sum / Count).toFixed(2) : 0;
        let Max = Math.max(...values);
        let Min = Math.min(...values);
        let Median = 0;
        if (Count) {
          let middle = Math.floor(Count / 2);
          if (Count % 2 === 0) {
            Median = (values[middle - 1] + values[middle]) / 2;
          } else {
            Median = values[middle];
          }
        }
        return {
          ...column,
          Footer: column.Footer
            ? column.Footer(data)
            : {
                Count,
                Sum,
                Average,
                Max,
                Min,
                Median,
              },
        };
      } else if (column?.accessorKey?.startsWith("status")) {
        let values = [];
        values = data.map((row) => row[column.accessorKey] || null);

        let compressedValues = values.reduce((acc, item) => {
          if (item === null || Array.isArray(item)) return acc;
          const key = `${item.name}`;
          if (!acc[key]) {
            acc[key] = { ...item, count: 1 };
          } else {
            acc[key].count += 1;
          }
          return acc;
        }, {});
        return compressedValues;
      }
    };
    return totals();
  };
  const statusData = totalRow();

  const renderStatusBars = () => {
    if (!statusData || typeof statusData !== "object") return null;
    const totalCount = Object.values(statusData).reduce(
      (acc, item) => acc + item.count,
      0
    );
    return Object.values(statusData).map((item, index) => (
      <div
        key={index}
        className={`border ${item.color} h-8 hover:cursor-pointer rounded-md mx-[2px]`}
        style={{
          backgroundColor: item.color,
          width: `${(item.count / totalCount) * 100}%`,
          display: "inline-block",
        }}
        title={`${item.name}: ${item.count}`}
      ></div>
    ));
  };

  return (
    <td
      className={`${
        column.id === "item" && "bg-a-white sm:sticky left-0 z-[11] "
      } h-[40px] 
      `}
    >
      {totalRow()?.accessorKey?.startsWith("unit_price") ? (
        <div className="flex items-center" title={formulaState}>
          <Dropdown className="">
            <DropdownTrigger>
              <button className="h-full  w-full text-center hover:bg-gray-400 flex items-center justify-center p-1 rounded-md border">
                {totalRow()?.Footer &&
                  totalRow()?.Footer[formulaState] &&
                  totalRow()?.Footer[formulaState]}
              </button>
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
              <DropdownItem key="Sum" onClick={() => setFormulaState("Sum")}>
                Sum
              </DropdownItem>
              <DropdownItem
                key="Average"
                onClick={() => setFormulaState("Average")}
              >
                Average
              </DropdownItem>
              <DropdownItem
                key="Count"
                onClick={() => setFormulaState("Count")}
              >
                Count
              </DropdownItem>
              <DropdownItem key="Min" onClick={() => setFormulaState("Min")}>
                Min
              </DropdownItem>
              <DropdownItem key="Max" onClick={() => setFormulaState("Max")}>
                Max
              </DropdownItem>
              <DropdownItem
                key="Median"
                onClick={() => setFormulaState("Median")}
              >
                Median
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      ) : (
        column?.accessorKey?.startsWith("status") && (
          <div style={{ width: "100%", display: "flex" }}>
            {renderStatusBars()}
          </div>
        )
      )}
    </td>
  );
};

export default TableFooter;
