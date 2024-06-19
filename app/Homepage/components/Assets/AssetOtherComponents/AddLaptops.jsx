import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import SupplierDropDown from "./SupplierDropDown";
import BranchDropDown from "./BranchDropDown";

const AddLaptops = ({ selectedValue, setActionStatus, actionStatus }) => {
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const dateToday = new Date();
  const [item, setItem] = useState("");
  const [faCode, setFaCode] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [employee, setEmployee] = useState("");
  const [doi, setDoi] = useState("");
  const [supplier, setSupplier] = useState("");
  const [inventoryFiled, setInventoryFiled] = useState(dateToday);
  const [lastUpdated, setLastUpdated] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [dop, setDop] = useState("");
  return (
    <div className='w-full flex flex-col h-full'>
      <div className='w-full flex flex-wrap p-1 gap-3'>
        <div className='w-full flex flex-wrap p-1 gap-3'>
          <Input
            isRequired
            type='text'
            label='Item'
            size={"sm"}
            value={item}
            className='max-w-[500px]'
          />
          <Input
            type='number'
            label='FA CODE'
            value={faCode}
            size={"sm"}
            className='max-w-xs'
          />
          <Input
            isRequired
            type='text'
            size={"sm"}
            label='Serial Number'
            value={serialNo}
            className='max-w-xs'
          />
          <Input
            type='text'
            size={"sm"}
            label='Employee'
            value={employee}
            className='max-w-[500px]'
          />
          <Input
            type='date'
            size={"sm"}
            label='DOI Current User'
            value={doi}
            className='max-w-xs'
          />

          <Input
            type='date'
            size={"sm"}
            label='Last Updated'
            value={lastUpdated}
            className='max-w-xs'
          />
          <Input
            type='number'
            size={"sm"}
            label='Price'
            value={unitPrice}
            className='max-w-xs'
          />
          <Input
            type='date'
            size={"sm"}
            label='DOP'
            value={dop}
            className='max-w-xs'
          />
        </div>
        <Input
          isDisabled
          type='text'
          label='Category'
          size={"sm"}
          value={selectedValue.toUpperCase()}
          className='max-w-xs'
        />
        <SupplierDropDown />
        <BranchDropDown />
      </div>
      <div className='w-full flex p-2 gap-2'>
        <div className=''>
          {" "}
          <button className='border p-2 rounded-md'>Save</button>
        </div>
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
