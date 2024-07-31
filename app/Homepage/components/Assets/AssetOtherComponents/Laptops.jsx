import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import ItemStatusOption from "../DropDownComponents/ItemStatusOption";
import LaptopInputForms from "../AssetComponents/LaptopInputForms";
import { getUsers } from "@/app/utils";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  employeeOptionsAtom,
  fetchEmployeeAtom,
} from "@/app/Homepage/AssetStore";
import {
  itemNameAtom,
  itemStatusOptionAtom,
  SaveLaptopAtom,
  serialNumberAtom,
  setDataToDefaultAtom,
} from "../Store/LaptopStore";
import { toast } from "sonner";

const Laptops = ({ selectedType, setActionStatus, actionStatus }) => {
  //for item selection Status
  const [itemStatusOption, setItemStatusOption] = useAtom(itemStatusOptionAtom);
  const employeeOptions = useAtomValue(employeeOptionsAtom);
  const fetchEmployee = useSetAtom(fetchEmployeeAtom);
  const saveLaptopData = useSetAtom(SaveLaptopAtom);
  const itemName = useAtomValue(itemNameAtom);
  const serial_No = useAtomValue(serialNumberAtom);
  const setDataToDefault = useSetAtom(setDataToDefaultAtom);
  const handleSetItemStatusOption = (opt) => {
    setItemStatusOption(opt);
  };
  //close component
  const handleClose = async () => {
    await setDataToDefault();
    setActionStatus(actionStatus);
  };
  //save new asset
  const handlesave = async (e) => {
    e.preventDefault();
    try {
      if (itemName !== "" && serial_No !== "") {
        const res = await saveLaptopData();
        console.log("res: ", res);
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
      (itemStatusOption === "Active" || itemStatusOption === "Transfer") &&
      employeeOptions &&
      employeeOptions.length === 0
    ) {
      const getAllUsers = async () => {
        try {
          await fetchEmployee();
        } catch (e) {
          console.log("Error getting users");
        }
      };
      getAllUsers();
    }
  }, [employeeOptions, itemStatusOption]);

  return (
    <form
      className='w-full flex flex-col h-full'
      onSubmit={(e) => handlesave(e)}
    >
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
          itemStatusOption === "Update" && (
            <LaptopInputForms
              selectedType={selectedType}
              itemStatusOption={itemStatusOption}
              employeeOptions={employeeOptions}
            />
          )
        )}
      </div>
      <div className='w-full flex p-2 gap-2'>
        {itemStatusOption !== "NONE" && (
          <div className=''>
            <button type='submit' className='border p-2 rounded-md'>
              Save
            </button>
          </div>
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
    </form>
  );
};

export default Laptops;
