import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useSetAtom } from "jotai";
import { setDataFromSelectedAtom } from "../Store/LaptopStore";
import { selectedAssetDataAtom } from "@/app/Homepage/AssetStore";
const AssetDropDown = ({ selectedType, setSelectedType }) => {
  const setSelectedData = useSetAtom(selectedAssetDataAtom);
  const handleSelectoption = (opt) => {
    setSelectedData(null);
    setSelectedType(opt);
  };
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
        <DropdownItem key='laptop' onClick={() => handleSelectoption("laptop")}>
          Laptop
        </DropdownItem>
        <DropdownItem
          key='monitor'
          onClick={() => handleSelectoption("monitor")}
        >
          Monitor
        </DropdownItem>
        <DropdownItem
          key='peripheral'
          onClick={() => handleSelectoption("peripheral")}
        >
          Peripheral
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default AssetDropDown;
