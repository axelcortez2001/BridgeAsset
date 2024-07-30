import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
const EmployeeDropDown = ({ employeeOptions, assetHolder, setAssetHolder }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant='bordered' className='capitalize'>
          {assetHolder === null ? "Select Employee" : assetHolder?.name}
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
      </DropdownMenu>
    </Dropdown>
  );
};

export default EmployeeDropDown;
