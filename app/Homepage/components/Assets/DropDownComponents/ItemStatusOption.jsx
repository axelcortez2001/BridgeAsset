import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  selectedAssetDataAtom,
  selectedTypeAtom,
} from "@/app/Homepage/AssetStore";
const ItemStatusOption = ({ itemStatusOption, setItemStatusOption }) => {
  const selectedType = useAtomValue(selectedTypeAtom);
  const setSelectedAssetData = useSetAtom(selectedAssetDataAtom);
  const handleSelect = (opt) => {
    if (opt === "SOH" || opt === "Active") {
      setSelectedAssetData(null);
    }
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
            Add SOH
          </DropdownItem>
          <DropdownItem key='Active' onClick={() => handleSelect("Active")}>
            Add Active
          </DropdownItem>
          {selectedType !== "laptop" && (
            <DropdownItem key='Issued' onClick={() => handleSelect("Issued")}>
              Issued(WFH)
            </DropdownItem>
          )}

          <DropdownItem key='Transfer' onClick={() => handleSelect("Transfer")}>
            Transfer Asset
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
