import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { laptopStatusData } from "../Store/LaptopStore";
import { monitorStatusData } from "../Store/MonitorStore";
const StatusOption = ({ status, setStatus, isDisabled, selectedType }) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set([status?.name]));

  const checkStatusData = () => {
    if (selectedType === "laptop") {
      return laptopStatusData;
    } else if (selectedType === "monitor" || selectedType === "peripheral") {
      return monitorStatusData;
    }
  };

  const optionStatus = checkStatusData();

  return (
    <Select
      classNames={{ trigger: "min-h-[0px] h-[48px] rounded-lg" }}
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      label="Status"
    >
      {optionStatus?.map((statusData) => (
        <SelectItem
          key={statusData?.name}
          className={`${statusData?.color} text-white h-[40px]`}
          onClick={() => setStatus(statusData)}
        >
          {statusData?.name}
        </SelectItem>
      ))}
    </Select>
  );
};

export default StatusOption;
