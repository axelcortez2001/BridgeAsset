import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import AssetDropDown from "./AssetDropDown";
import AddLaptops from "./AddLaptops";
import AddMonitors from "./AddMonitors";
import { useAtom, useAtomValue } from "jotai";
import { selectedTypeAtom } from "@/app/Homepage/AssetStore";

const AddAsset = ({ setActionStatus, actionStatus }) => {
  //category selection state management
  const [selectedType, setSelectedType] = useAtom(selectedTypeAtom);
  const handleSelectedType = (opt) => {
    setSelectedType(opt);
  };

  return (
    <div className='h-full w-full flex flex-col relative p-2'>
      <div>
        <AssetDropDown
          selectedType={selectedType}
          setSelectedType={handleSelectedType}
        />
      </div>
      {selectedType === "laptop" ? (
        <AddLaptops
          selectedType={selectedType}
          actionStatus={actionStatus}
          setActionStatus={setActionStatus}
        />
      ) : (
        <AddMonitors />
      )}
      {/* Close Button */}
    </div>
  );
};

export default AddAsset;
