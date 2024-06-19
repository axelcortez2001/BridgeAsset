import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
const AssetDropDown = ({ selectedKeys, setSelectedKeys }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant='bordered' className='capitalize'>
          {selectedKeys}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label='Single selection example'
        variant='flat'
        disallowEmptySelection
        selectionMode='single'
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem key='laptops'>Laptops</DropdownItem>
        <DropdownItem key='monitor'>Monitors</DropdownItem>
        <DropdownItem key='peripherals'>Peripherals</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default AssetDropDown;
