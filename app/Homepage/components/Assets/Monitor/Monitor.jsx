import React, { useEffect } from "react";
import ItemStatusOption from "../DropDownComponents/ItemStatusOption";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  itemStatusOptionAtom,
  setDataToDefaultAtom,
} from "../Store/LaptopStore";
import MonitorInputForms from "./Components/MonitorInputForms";
import {
  fetchEmployeeAtom,
  filteredEmployeesAtom,
  handleReturnEmployeesDefaultAtom,
  selectedAssetDataAtom,
} from "@/app/Homepage/AssetStore";

const Monitor = ({ selectedType, setActionStatus, actionStatus }) => {
  const [itemStatusOption, setItemStatusOption] = useAtom(itemStatusOptionAtom);
  const employeeOptions = useAtomValue(filteredEmployeesAtom);
  const fetchEmployee = useSetAtom(fetchEmployeeAtom);
  const setEmployeesToDefault = useSetAtom(handleReturnEmployeesDefaultAtom);
  const setDataToDefault = useSetAtom(setDataToDefaultAtom);
  const setSelectedAssetData = useSetAtom(selectedAssetDataAtom);
  const handleSetItemStatusOption = (opt) => {
    setItemStatusOption(opt);
  };
  const handleClose = async () => {
    await setDataToDefault();
    setActionStatus(actionStatus);
    setSelectedAssetData(null);
    setEmployeesToDefault();
  };

  //get users for monitor
  useEffect(() => {
    if (employeeOptions && employeeOptions.length === 0) {
      const getAllUsers = async () => {
        try {
          await fetchEmployee("monitor");
        } catch (error) {
          console.log("Error: ", error);
        }
      };
      getAllUsers();
    }
  }, [employeeOptions]);
  return (
    <div className='w-full flex flex-col h-full'>
      <div className='w-full flex flex-wrap p-1 gap-3'>
        <p>Add Monitor</p>
        <MonitorInputForms
          selectedType={selectedType}
          employeeOptions={employeeOptions}
        />
        <div className=''>
          <button
            type='button'
            className='border p-2 rounded-md'
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Monitor;
