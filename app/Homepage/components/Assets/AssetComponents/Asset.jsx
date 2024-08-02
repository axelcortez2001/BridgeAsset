import React from "react";
import AssetDropDown from "../AssetOtherComponents/AssetDropDown";
import Laptops from "../Laptop/Laptops";

import { useAtom, useAtomValue } from "jotai";
import { selectedTypeAtom } from "@/app/Homepage/AssetStore";
import Monitor from "../Monitor/Monitor";

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
        <Laptops
          selectedType={selectedType}
          actionStatus={actionStatus}
          setActionStatus={setActionStatus}
        />
      ) : (
        <Monitor />
      )}
    </div>
  );
};

export default AddAsset;
