import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
const BranchDropDown = ({ branch, setBranch, isDisabled }) => {
  return (
    <div className='flex flex-col'>
      <p className='text-sm text-gray-500'>Branch</p>
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant='bordered'
            className='capitalize'
            isDisabled={isDisabled}
          >
            {branch}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label='Single selection example'
          variant='flat'
          disallowEmptySelection
          selectionMode='single'
        >
          <DropdownItem key='Australia' onClick={() => setBranch("Australia")}>
            Australia
          </DropdownItem>
          <DropdownItem key='Makati' onClick={() => setBranch("Makati")}>
            Makati
          </DropdownItem>
          <DropdownItem key='Laoag' onClick={() => setBranch("Laoag")}>
            Laoag
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default BranchDropDown;
