import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import ItemStatusOption from "../DropDownComponents/ItemStatusOption";
import LaptopInputForms from "../AssetComponents/LaptopInputForms";
import { getUsers } from "@/app/utils";
import { useAtomValue, useSetAtom } from "jotai";
import {
  employeeOptionsAtom,
  fetchEmployeeAtom,
} from "@/app/Homepage/AssetStore";

const AddLaptops = ({ selectedType, setActionStatus, actionStatus }) => {
  //for item selection Status
  const [itemStatusOption, setItemStatusOption] = useState("NONE");
  const employeeOptions = useAtomValue(employeeOptionsAtom);
  const fetchEmployee = useSetAtom(fetchEmployeeAtom);
  const handleSetItemStatusOption = (opt) => {
    setItemStatusOption(opt);
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
    <div className='w-full flex flex-col h-full'>
      <div className='w-full flex flex-wrap p-1 gap-3'>
        <ItemStatusOption
          itemStatusOption={itemStatusOption}
          setItemStatusOption={handleSetItemStatusOption}
        />
        {(itemStatusOption === "Active" || itemStatusOption === "SOH") && (
          <LaptopInputForms
            selectedType={selectedType}
            itemStatusOption={itemStatusOption}
            employeeOptions={employeeOptions}
          />
        )}
      </div>
      <div className='w-full flex p-2 gap-2'>
        {itemStatusOption !== "NONE" && (
          <div className=''>
            <button className='border p-2 rounded-md'>Save</button>
          </div>
        )}

        <div className=''>
          <button
            className='border p-2 rounded-md'
            onClick={() => setActionStatus(actionStatus)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLaptops;
