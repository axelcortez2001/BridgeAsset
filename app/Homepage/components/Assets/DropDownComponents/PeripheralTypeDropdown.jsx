import React from "react";
import { Select, SelectItem, Avatar } from "@nextui-org/react";
import {
  peripheralStatusData,
  peripheralTypeData,
} from "../Store/PeripheralStore";
import { useSetAtom } from "jotai";
import { fetchEmployeeAtom } from "@/app/Homepage/AssetStore";
const PeripheralTypeDropdown = ({ peripheralType, setPeripheralType }) => {
  const peripheralData = peripheralTypeData;
  const fetchEmployee = useSetAtom(fetchEmployeeAtom);

  const handleSelectItem = async (opt) => {
    setPeripheralType(opt);
    await fetchEmployee("peripheral");
  };

  const selectOption = [
    {
      label: "Mouse",
      action: () => handleSelectItem("Mouse"),
    },
    {
      label: "Keyboard",
      action: () => handleSelectItem("Keyboard"),
    },
    {
      label: "Headset",
      action: () => handleSelectItem("Headset"),
    },
    {
      label: "Others",
      action: () => handleSelectItem("Others"),
    },
  ];

  return (
    <Select
      label="Select Type"
      selectedKeys={[peripheralType]}
      aria-label="selectOption"
      classNames={{ trigger: "min-h-[0px] h-[48px] rounded-lg bg-a-lightgrey" }}
    >
      {selectOption.map((item) => (
        <SelectItem
          key={item.label}
          textValue={item.label}
          onClick={item.action}
          className="h-[40px]"
        >
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default PeripheralTypeDropdown;
