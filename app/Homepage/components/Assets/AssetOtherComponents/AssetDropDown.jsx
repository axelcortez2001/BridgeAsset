import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
const AssetDropDown = ({ selectedType, setSelectedType }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant='bordered' className='capitalize'>
          {selectedType}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label='Single selection example'
        variant='flat'
        disallowEmptySelection
        selectionMode='single'
      >
        <DropdownItem key='laptop' onClick={() => setSelectedType("laptop")}>
          Laptop
        </DropdownItem>
        <DropdownItem key='monitor' onClick={() => setSelectedType("monitor")}>
          Monitor
        </DropdownItem>
        <DropdownItem
          key='peripheral'
          onClick={() => setSelectedType("peripheral")}
        >
          Peripheral
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default AssetDropDown;
