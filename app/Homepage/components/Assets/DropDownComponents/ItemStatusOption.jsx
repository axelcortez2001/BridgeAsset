import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
const ItemStatusOption = ({ itemStatusOption, setItemStatusOption }) => {
  return (
    <div className='flex flex-row items-center gap-3'>
      <p className='text-sm text-gray-500'>Select Item Status</p>
      <Dropdown>
        <DropdownTrigger>
          <Button variant='bordered' className='capitalize'>
            {itemStatusOption}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label='Single selection example'
          variant='flat'
          disallowEmptySelection
          selectionMode='single'
        >
          <DropdownItem
            key='Active'
            onClick={() => setItemStatusOption("Active")}
          >
            Active
          </DropdownItem>
          <DropdownItem key='SOH' onClick={() => setItemStatusOption("SOH")}>
            SOH
          </DropdownItem>
          <DropdownItem
            key='Repair'
            onClick={() => setItemStatusOption("Repair")}
          >
            For Repair
          </DropdownItem>
          <DropdownItem
            key='Irreperable'
            onClick={() => setItemStatusOption("Irreperable")}
          >
            Irreperable
          </DropdownItem>
          <DropdownItem
            key='Transfer'
            onClick={() => setItemStatusOption("Transfer")}
          >
            Transfers
          </DropdownItem>
          <DropdownItem key='NONE' onClick={() => setItemStatusOption("NONE")}>
            NONE
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ItemStatusOption;
