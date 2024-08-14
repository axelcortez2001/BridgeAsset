import React, { useEffect, useState } from "react";
import ItemStatusOption from "../DropDownComponents/ItemStatusOption";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  itemStatusOptionAtom,
  setDataToDefaultAtom,
} from "../Store/LaptopStore";
import MonitorInputForms from "./Components/MonitorInputForms";
import {
  assetDataAtom,
  deleteAssetDataAtom,
  fetchEmployeeAtom,
  filteredEmployeesAtom,
  handleReturnEmployeesDefaultAtom,
  selectedAssetDataAtom,
} from "@/app/Homepage/AssetStore";
import {
  actionMonitorHistoryAtom,
  handleAddNewMonitorAtom,
  itemNameAtom,
  setMonitorDataToDefaultAtom,
  updateMonitorAtom,
  viewMonitorHistoryAtom,
} from "../Store/MonitorStore";
import { toast } from "sonner";
import { GrPowerReset } from "react-icons/gr";
import AssetHistory from "../AssetComponents/AssetHistory";
import AssetLoading from "../../LoadingComponents/AssetLoading";

const Monitor = ({ selectedType, setActionStatus, actionStatus }) => {
  const [loading, setLoading] = useState(false);
  const [itemStatusOption, setItemStatusOption] = useAtom(itemStatusOptionAtom);
  const employeeOptions = useAtomValue(filteredEmployeesAtom);
  const fetchEmployee = useSetAtom(fetchEmployeeAtom);
  const setEmployeesToDefault = useSetAtom(handleReturnEmployeesDefaultAtom);
  const setDataToDefault = useSetAtom(setDataToDefaultAtom);
  const setMonitorDataToDefault = useSetAtom(setMonitorDataToDefaultAtom);
  const [selectedAssetData, setSelectedAssetData] = useAtom(
    selectedAssetDataAtom
  );
  const [viewMonitorHistory, setViewMonitorHistory] = useAtom(
    viewMonitorHistoryAtom
  );
  const assetData = useAtomValue(assetDataAtom);
  const setHistoryToDefault = useSetAtom(actionMonitorHistoryAtom);
  const handleSetItemStatusOption = (opt) => {
    setItemStatusOption(opt);
  };
  const handleClose = async () => {
    await setDataToDefault();
    setActionStatus(actionStatus);
    setSelectedAssetData(null);
    setEmployeesToDefault();
    setMonitorDataToDefault();
    setHistoryToDefault([]);
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
  const updateMonitor = useSetAtom(updateMonitorAtom);
  const handleUpdate = async () => {
    setLoading(true);
    try {
      if (itemName !== "") {
        const res = await updateMonitor();
        const category = "monitor";
        await fetchEmployee({ category });
        if (res.success) {
          toast.success("Monitor saved successfully.");
          await setDataToDefault();
          setActionStatus(actionStatus);
          setSelectedAssetData(null);
          setMonitorDataToDefault();
          setHistoryToDefault([]);
        }
      } else {
        toast.error("Please fill up required fields.");
      }
    } catch (error) {
      console.log("Error: ", error);
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
      setMonitorDataToDefault();
      setHistoryToDefault([]);
    }
  };
  //delete
  const deleteAssetData = useSetAtom(deleteAssetDataAtom);
  const handleDeleteAsset = async () => {
    if (window.confirm("Are you sure you want to change current selected?")) {
      if (selectedAssetData !== null) {
        const _id = selectedAssetData._id;
        const res = await deleteAssetData(_id);
        if (res?.success === true) {
          await setDataToDefault();
          setActionStatus(actionStatus);
          setSelectedAssetData(null);
          setMonitorDataToDefault();
          setHistoryToDefault([]);
          await fetchEmployee("monitor");
          toast.success("Asset deleted successfully.");
        } else {
          toast.error("Failed to delete asset.");
        }
      } else {
        toast.error("No asset selected to delete.");
      }
    }
  };
  //get users for monitor
  useEffect(() => {
    console.log("AssetData: ", assetData);
    if (employeeOptions && employeeOptions.length === 0 && assetData !== null) {
      const getAllUsers = async () => {
        try {
          console.log("Trigger");
          await fetchEmployee("monitor");
        } catch (error) {
          console.log("Error: ", error);
        }
      };
      getAllUsers();
    }
  }, [employeeOptions, selectedAssetData, selectedType, assetData]);
  return (
    <div className='w-full flex flex-col h-full'>
      {loading ? (
        <AssetLoading />
      ) : (
        <div className='w-full flex flex-wrap p-1 gap-3'>
          {selectedAssetData !== null && (
            <>
              <div
                className='border rounded-md p-2 text-sm ml-2 hover:cursor-pointer hover:bg-slate-500 hover:text-white transition-all'
                onClick={handleReset}
              >
                <GrPowerReset size={18} />
              </div>
              {!viewMonitorHistory ? (
                <div
                  onClick={() => setViewMonitorHistory(true)}
                  className='border rounded-md p-2 text-sm ml-2 hover:cursor-pointer hover:bg-slate-500 hover:text-white transition-all'
                >
                  View Asset History
                </div>
              ) : (
                <div
                  onClick={() => setViewMonitorHistory(false)}
                  className='border rounded-md p-2 text-sm ml-2 hover:cursor-pointer hover:bg-slate-500 hover:text-white transition-all'
                >
                  Back to Asset Component
                </div>
              )}
            </>
          )}
          {selectedAssetData !== null && viewMonitorHistory === true ? (
            <AssetHistory asset={selectedAssetData} />
          ) : (
            <MonitorInputForms
              selectedType={selectedType}
              employeeOptions={employeeOptions}
            />
          )}

          <div className=''>
            {selectedAssetData !== null ? (
              <>
                <button
                  type='button'
                  className='border p-2 rounded-md bg-green-400'
                  onClick={handleUpdate}
                >
                  Update
                </button>
                <button
                  type='button'
                  className='border p-2 rounded-md bg-red-400'
                  onClick={handleDeleteAsset}
                >
                  Delete
                </button>
              </>
            ) : (
              <button
                type='button'
                className='border p-2 rounded-md  bg-green-400'
                onClick={handleAddMonitor}
              >
                Add
              </button>
            )}
          </div>
          <div className=''>
            <button
              type='button'
              className='border p-2 rounded-md bg-red-400'
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Monitor;
