import React, { useEffect, useState } from "react";
import AssetLoading from "../../LoadingComponents/AssetLoading";
import PeripheralInputForms from "./Components/PeripheralInputForms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  actionPeripheralHistoryAtom,
  handleAddPeripheralAtom,
  itemNameAtom,
  peripheralTypeAtom,
  setPeripheralToDefault,
  updatePeripheralAtom,
  viewPeripheralHistoryAtom,
} from "../Store/PeripheralStore";
import { toast } from "sonner";
import {
  assetDataAtom,
  deleteAssetDataAtom,
  employeeOptionsAtom,
  fetchEmployeeAtom,
  filteredEmployeesAtom,
  handleReturnEmployeesDefaultAtom,
  selectedAssetDataAtom,
} from "@/app/Homepage/AssetStore";
import AssetHistory from "../AssetComponents/AssetHistory";

const Peripherals = ({ selectedType, setActionStatus, actionStatus }) => {
  const [loading, setLoading] = useState(false);
  const itemName = useAtomValue(itemNameAtom);
  const employeeOptions = useAtomValue(filteredEmployeesAtom);
  const assetData = useAtomValue(assetDataAtom);
  const peripheralType = useAtomValue(peripheralTypeAtom);
  const [peripheralState, setPeripheralState] = useState(peripheralType);
  const [selectedAssetData, setSelectedAssetData] = useAtom(
    selectedAssetDataAtom
  );
  const [viewPeripheralHistory, setViewPeripheralHistory] = useAtom(
    viewPeripheralHistoryAtom
  );

  //setatoms
  const fetchEmployee = useSetAtom(fetchEmployeeAtom);
  const setToDefault = useSetAtom(setPeripheralToDefault);
  const addPeripheralAtom = useSetAtom(handleAddPeripheralAtom);
  const setEmployeesToDefault = useSetAtom(handleReturnEmployeesDefaultAtom);
  const setHistoryToDefault = useSetAtom(actionPeripheralHistoryAtom);
  const deleteAssetData = useSetAtom(deleteAssetDataAtom);
  const updatePeripheral = useSetAtom(updatePeripheralAtom);

  //add
  const handleAdd = async () => {
    setLoading(true);
    try {
      if (itemName !== "") {
        const res = await addPeripheralAtom();
        if (res?.success) {
          toast.success("Monitor Saved.");
          await setToDefault();
        }
      } else {
        toast.error("Please enter a item name");
      }
    } catch (e) {
      console.log("Error: ", e);
    } finally {
      setLoading(false);
    }
  };

  //reset or close
  const handleClose = async () => {
    await setToDefault();
    setSelectedAssetData(null);
    setActionStatus(actionStatus);
    setHistoryToDefault([]);
  };
  //delete
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete?")) {
      if (selectedAssetData !== null) {
        const _id = selectedAssetData._id;
        const res = await deleteAssetData(_id);
        if (res?.success === true) {
          await handleClose();
          await fetchEmployee("peripheral");
          toast.success("Asset deleted successfully.");
        } else {
          toast.error("Failed to delete asset.");
        }
      } else {
        toast.error("No asset selected to delete.");
      }
    }
  };
  //update
  const handleUpdate = async () => {
    setLoading(true);
    try {
      if (itemName !== "") {
        const res = await updatePeripheral();
        const category = "peripheral";
        await fetchEmployee({ category });
        if (res.success) {
          toast.success("Peripheral updated successfully.");
          await handleClose();
        }
      }
    } catch (e) {
      console.log("Error: ", e);
    } finally {
      setLoading(false);
    }
  };

  //get users with validation
  useEffect(() => {
    console.log("ASsetData :", assetData);
    if (employeeOptions && employeeOptions.length === 0 && assetData !== null) {
      const getAllUsers = async () => {
        console.log("EmployeeL", employeeOptions);
        try {
          await fetchEmployee("peripheral");
        } catch (e) {
          console.log("Error getting users");
        }
      };
      getAllUsers();
    }
  }, [
    employeeOptions,
    assetData,
    selectedAssetData,
    selectedType,
    peripheralType,
    peripheralState,
    actionStatus,
  ]);
  return (
    <div className='w-full flex flex-col h-full'>
      {loading ? (
        <AssetLoading />
      ) : (
        <div className='w-full flex flex-wrap p-1 gap-3'>
          {!viewPeripheralHistory ? (
            <div
              onClick={() => setViewPeripheralHistory(true)}
              className='border rounded-md p-2 text-sm ml-2 hover:cursor-pointer hover:bg-slate-500 hover:text-white transition-all'
            >
              View Asset History
            </div>
          ) : (
            <div
              onClick={() => setViewPeripheralHistory(false)}
              className='border rounded-md p-2 text-sm ml-2 hover:cursor-pointer hover:bg-slate-500 hover:text-white transition-all'
            >
              Back to Asset Component
            </div>
          )}
          {selectedAssetData !== null && viewPeripheralHistory === true ? (
            <AssetHistory asset={selectedAssetData} />
          ) : (
            <PeripheralInputForms employeeOptions={employeeOptions} />
          )}

          <div className=''>
            {selectedAssetData === null ? (
              <button
                type='button'
                className='border p-2 rounded-md bg-green-400'
                onClick={handleAdd}
              >
                Add
              </button>
            ) : (
              <div>
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
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            )}

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

export default Peripherals;
