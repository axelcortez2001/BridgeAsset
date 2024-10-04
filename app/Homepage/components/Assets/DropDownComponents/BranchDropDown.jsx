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
const BranchDropDown = ({ branch, setBranch, isDisabled }) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set([branch]));

  const selectOption = [
    {
      label: "Australia",
      action: () => setBranch("Australia"),
    },
    {
      label: "Makati",
      action: () => setBranch("Makati"),
    },
    {
      label: "Laoag",
      action: () => setBranch("Laoag"),
    },
  ];

  return (
    <Select
      classNames={{ trigger: "min-h-[0px] h-[48px] rounded-lg" }}
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      aria-label="selectOption"
      label="Location"
    >
      {selectOption.map((item, index) => (
        <SelectItem key={item.label} onClick={item.action} className="h-[40px]">
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default BranchDropDown;
