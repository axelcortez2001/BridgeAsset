import React, { useEffect, useState } from "react";
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
import {
  handleAddNewMonitorAtom,
  itemNameAtom,
  setMonitorDataToDefaultAtom,
} from "../Store/MonitorStore";
import { toast } from "sonner";
import { GrPowerReset } from "react-icons/gr";

const Monitor = ({ selectedType, setActionStatus, actionStatus }) => {
  const [loading, setLoading] = useState(false);
  const [itemStatusOption, setItemStatusOption] = useAtom(itemStatusOptionAtom);
  const employeeOptions = useAtomValue(filteredEmployeesAtom);
  const fetchEmployee = useSetAtom(fetchEmployeeAtom);
  const setEmployeesToDefault = useSetAtom(handleReturnEmployeesDefaultAtom);
  const setDataToDefault = useSetAtom(setDataToDefaultAtom);
  const [selectedAssetData, setSelectedAssetData] = useAtom(
    selectedAssetDataAtom
  );
  const handleSetItemStatusOption = (opt) => {
    setItemStatusOption(opt);
  };
  const handleClose = async () => {
    await setDataToDefault();
    setActionStatus(actionStatus);
    setSelectedAssetData(null);
    setEmployeesToDefault();
  };

  //add new monitor
  const addNewMonitor = useSetAtom(handleAddNewMonitorAtom);
  const setMonitorToDefault = useSetAtom(setMonitorDataToDefaultAtom);
  const itemName = useAtomValue(itemNameAtom);
  const handleAddMonitor = async () => {
    setLoading(true);
    try {
      if (itemName !== "") {
        const res = await addNewMonitor();
        if (res?.success) {
          toast.success("Monitor Saved.");
          await setMonitorToDefault();
        }
      } else {
        toast.error("Please enter a item name");
      }
    } catch (e) {
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };
  const handleReset = async () => {
    if (window.confirm("Are you sure you want to change current selected?")) {
      await setDataToDefault();
      setActionStatus(actionStatus);
      setSelectedAssetData(null);
      setEmployeesToDefault();
    }
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
        {selectedAssetData !== null && (
          <div
            className='border rounded-md p-2 text-sm ml-2 hover:cursor-pointer hover:bg-slate-500 hover:text-white transition-all'
            onClick={handleReset}
          >
            <GrPowerReset size={18} />
          </div>
        )}
        <MonitorInputForms
          selectedType={selectedType}
          employeeOptions={employeeOptions}
        />
        <div className=''>
          {selectedAssetData !== null ? (
            <button type='button' className='border p-2 rounded-md'>
              Update
            </button>
          ) : (
            <button
              type='button'
              className='border p-2 rounded-md'
              onClick={handleAddMonitor}
            >
              Add
            </button>
          )}
        </div>
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
