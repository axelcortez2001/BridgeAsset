import React from "react";
import AssetDropDown from "../AssetOtherComponents/AssetDropDown";
import Laptops from "../Laptop/Laptops";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  handleReturnEmployeesDefaultAtom,
  selectedTypeAtom,
} from "@/app/Homepage/AssetStore";
import Monitor from "../Monitor/Monitor";

const AddAsset = ({ setActionStatus, actionStatus }) => {
  //category selection state management
  const [selectedType, setSelectedType] = useAtom(selectedTypeAtom);
  const setEmployeesToDefault = useSetAtom(handleReturnEmployeesDefaultAtom);
  const handleSelectedType = (opt) => {
    setEmployeesToDefault();
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
        <Laptops
          selectedType={selectedType}
          actionStatus={actionStatus}
          setActionStatus={setActionStatus}
        />
      ) : selectedType === "monitor" ? (
        <Monitor
          selectedType={selectedType}
          actionStatus={actionStatus}
          setActionStatus={setActionStatus}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default AddAsset;
