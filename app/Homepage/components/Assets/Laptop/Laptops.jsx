import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import ItemStatusOption from "../DropDownComponents/ItemStatusOption";
import LaptopInputForms from "./Components/LaptopInputForms";
import { getUsers } from "@/app/utils";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  employeeOptionsAtom,
  fetchEmployeeAtom,
  filteredEmployeesAtom,
  handleReturnEmployeesDefaultAtom,
  selectedAssetDataAtom,
} from "@/app/Homepage/AssetStore";
import {
  assetHolderAtom,
  doiAtom,
  itemNameAtom,
  itemStatusOptionAtom,
  SaveLaptopAtom,
  serialNumberAtom,
  setDataToDefaultAtom,
  updateLaptopAtom,
  viewAssetHistoryAtom,
} from "../Store/LaptopStore";
import { toast } from "sonner";
import UpdateLaptopInputForms from "./Components/UpdateLaptopInputForms";

const Laptops = ({ selectedType, setActionStatus, actionStatus }) => {
  //for item selection Status
  const [itemStatusOption, setItemStatusOption] = useAtom(itemStatusOptionAtom);
  const employeeOptions = useAtomValue(filteredEmployeesAtom);
  const fetchEmployee = useSetAtom(fetchEmployeeAtom);
  const saveLaptopData = useSetAtom(SaveLaptopAtom);
  const updateLaptopData = useSetAtom(updateLaptopAtom);
  const itemName = useAtomValue(itemNameAtom);
  const serial_No = useAtomValue(serialNumberAtom);
  const setDataToDefault = useSetAtom(setDataToDefaultAtom);
  const assetHolder = useAtomValue(assetHolderAtom);
  const doi = useAtomValue(doiAtom);
  const [selectedAssetData, setSelectedAssetData] = useAtom(
    selectedAssetDataAtom
  );
  const viewAssetHistory = useAtomValue(viewAssetHistoryAtom);
  const setEmployeesToDefault = useSetAtom(handleReturnEmployeesDefaultAtom);

  const handleSetItemStatusOption = (opt) => {
    setItemStatusOption(opt);
  };
  //close component
  const handleClose = async () => {
    await setDataToDefault();
    setActionStatus(actionStatus);
    setSelectedAssetData(null);
    setEmployeesToDefault();
  };
  //save new asset
  const handlesave = async () => {
    try {
      if (itemName !== "" && serial_No !== "") {
        if (itemStatusOption === "Active") {
          if (assetHolder === null && doi === "") {
            return toast.error("Please Select an asset holder and DOI");
          }
        }
        const res = await saveLaptopData();
        if (res.success) {
          toast.success("Laptop saved successfully.");
          await setDataToDefault();
          setActionStatus(actionStatus);
        }
      } else {
        toast.error("Please fill up required fields.");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleUpdate = async () => {
    try {
      if (itemName !== "" && serial_No !== "") {
        const res = await updateLaptopData();
        const category = "laptop";
        await fetchEmployee({ category });
        if (res.success) {
          toast.success("Laptop saved successfully.");
          await setDataToDefault();
          setActionStatus(actionStatus);
        }
      } else {
        toast.error("Please fill up required fields.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  //getUsers with validation
  useEffect(() => {
    if (
      (itemStatusOption === "Active" ||
        itemStatusOption === "Transfer" ||
        itemStatusOption === "Update") &&
      employeeOptions &&
      employeeOptions.length === 0
    ) {
      const getAllUsers = async () => {
        try {
          console.log("Trigger");
          await fetchEmployee("laptop");
        } catch (e) {
          console.log("Error getting users");
        }
      };
      getAllUsers();
    }
  }, [employeeOptions, itemStatusOption]);

  return (
    <div className='w-full flex flex-col h-full'>
      <div className='w-full flex flex-wrap p-1 gap-3'>
        <ItemStatusOption
          itemStatusOption={itemStatusOption}
          setItemStatusOption={handleSetItemStatusOption}
        />
        {itemStatusOption === "Active" || itemStatusOption === "SOH" ? (
          <LaptopInputForms
            selectedType={selectedType}
            itemStatusOption={itemStatusOption}
            employeeOptions={employeeOptions}
          />
        ) : (
          (itemStatusOption === "Update" ||
            itemStatusOption === "Repair" ||
            itemStatusOption === "Irreperable" ||
            itemStatusOption === "Transfer") && (
            <UpdateLaptopInputForms
              selectedType={selectedType}
              itemStatusOption={itemStatusOption}
              employeeOptions={employeeOptions}
            />
          )
        )}
      </div>
      <div className='w-full flex p-2 gap-2'>
        {itemStatusOption === "SOH" || itemStatusOption === "Active" ? (
          <div className=''>
            <button
              type='button'
              onClick={() => handlesave()}
              className='border p-2 rounded-md'
            >
              Add
            </button>
          </div>
        ) : (
          !viewAssetHistory &&
          itemStatusOption !== "NONE" &&
          selectedAssetData !== null && (
            <div className=''>
              <button
                type='submit'
                className='border p-2 rounded-md'
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          )
        )}

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

export default Laptops;
