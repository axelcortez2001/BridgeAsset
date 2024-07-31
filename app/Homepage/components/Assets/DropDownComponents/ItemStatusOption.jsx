import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useSetAtom } from "jotai";
import { selectedAssetDataAtom } from "@/app/Homepage/AssetStore";
const ItemStatusOption = ({ itemStatusOption, setItemStatusOption }) => {
  const setSelectedAssetData = useSetAtom(selectedAssetDataAtom);
  const handleSelect = (opt) => {
    setSelectedAssetData(null);
    setItemStatusOption(opt);
  };
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
          <DropdownItem key='SOH' onClick={() => handleSelect("SOH")}>
            SOH
          </DropdownItem>
          <DropdownItem key='Active' onClick={() => handleSelect("Active")}>
            Active
          </DropdownItem>
          <DropdownItem key='Repair' onClick={() => handleSelect("Repair")}>
            For Repair
          </DropdownItem>
          <DropdownItem
            key='Irreperable'
            onClick={() => handleSelect("Irreperable")}
          >
            Irreperable
          </DropdownItem>
          <DropdownItem key='Transfer' onClick={() => handleSelect("Transfer")}>
            Transfers
          </DropdownItem>
          <DropdownItem key='Update' onClick={() => handleSelect("Update")}>
            Update Asset
          </DropdownItem>
          <DropdownItem key='NONE' onClick={() => handleSelect("NONE")}>
            NONE
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ItemStatusOption;
