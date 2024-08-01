import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
const EmployeeDropDown = ({
  employeeOptions,
  assetHolder,
  setAssetHolder,
  isDisabled,
}) => {
  console.log(isDisabled);
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant='bordered'
          className='capitalize'
          isDisabled={isDisabled}
        >
          {assetHolder === null ? "None" : assetHolder?.name}
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label='Single selection example'
        variant='flat'
        disallowEmptySelection
        selectionMode='single'
      >
        {employeeOptions &&
          employeeOptions.length > 0 &&
          employeeOptions.map((employee) => (
            <DropdownItem
              key={employee._id}
              onClick={() => setAssetHolder(employee)}
            >
              {employee.name}
            </DropdownItem>
          ))}
        <DropdownItem key='none' onClick={() => setAssetHolder(null)}>
          None
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default EmployeeDropDown;
