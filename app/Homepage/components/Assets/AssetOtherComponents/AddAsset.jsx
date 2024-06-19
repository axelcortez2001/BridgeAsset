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

const AddAsset = ({ setActionStatus, actionStatus }) => {
  //category selection state management
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["laptops"]));
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  const handleSelectedKeys = (stat) => {
    setSelectedKeys(stat);
  };

  return (
    <div className='h-full w-full flex flex-col relative p-2'>
      <div>
        <AssetDropDown
          selectedKeys={selectedKeys}
          setSelectedKeys={handleSelectedKeys}
        />
      </div>
      {selectedValue === "laptops" ? (
        <AddLaptops
          selectedValue={selectedValue}
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
