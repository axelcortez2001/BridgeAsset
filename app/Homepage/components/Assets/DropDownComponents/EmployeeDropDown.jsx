import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Select,
  SelectItem,
  Image,
} from "@nextui-org/react";
const EmployeeDropDown = ({
  employeeOptions,
  assetHolder,
  setAssetHolder,
  isDisabled,
  label = "Current User",
}) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set([assetHolder]));

  return (
    <Select
      classNames={{ trigger: "min-h-[0px] h-[48px] rounded-lg bg-a-lightgrey" }}
      aria-label="selectOption"
      isDisabled={isDisabled}
      label={label}
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
    >
      <SelectItem
        aria-label="selectOption"
        className="hidden"
        key={assetHolder}
      >
        {assetHolder}
      </SelectItem>
      {employeeOptions &&
        employeeOptions.length > 0 &&
        employeeOptions.map((employee) => (
          <SelectItem
            key={employee?.name}
            className="h-[40px]"
            textValue={employee?.name}
            value={employee?.name}
            onClick={() => setAssetHolder(employee)}
          >
            <div className="flex flex-row gap-2 items-center ">
              <Image
                src={employee?.picture}
                alt={"employee name"}
                className="h-[28px] w-[28px] rounded-full"
              />
              <p>{employee?.name}</p>
            </div>
          </SelectItem>
        ))}
    </Select>
  );
};

export default EmployeeDropDown;
