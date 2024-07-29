import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import LaptopSupplierDropDown from "../DropDownComponents/LaptopSupplierDropDown";
import BranchDropDown from "../DropDownComponents/BranchDropDown";
import EmployeeDropDown from "../DropDownComponents/EmployeeDropDown";

const LaptopInputForms = ({
  selectedType,
  itemStatusOption,
  employeeOptions,
}) => {
  const dateToday = new Date();
  const [item, setItem] = useState("");
  const [faCode, setFaCode] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [employee, setEmployee] = useState("None");
  const [doi, setDoi] = useState("");
  const [supplier, setSupplier] = useState("");
  const [inventoryFiled, setInventoryFiled] = useState(dateToday);
  const [unitPrice, setUnitPrice] = useState("");
  const [dop, setDop] = useState("");
  console.log("EmployeeOptions: ", employeeOptions);
  return (
    <div className='w-full flex flex-wrap p-1 gap-3'>
      <div className='w-full flex flex-wrap p-1 gap-3'>
        <Input
          isRequired
          type='text'
          label='Item'
          size={"sm"}
          value={item}
          onChange={(e) => setItem(e.target.value)}
          className='max-w-[500px]'
        />
        <Input
          isRequired
          type='text'
          size={"sm"}
          label='Serial Number'
          value={serialNo}
          onChange={(e) => setSerialNo(e.target.value)}
          className='max-w-xs'
        />
        <Input
          type='number'
          label='FA CODE'
          value={faCode}
          size={"sm"}
          className='max-w-xs'
        />

        {itemStatusOption === "Active" && (
          <>
            <EmployeeDropDown employeeOptions={employeeOptions} />
            <Input
              type='date'
              size={"sm"}
              label='DOI Current User'
              value={doi}
              className='max-w-xs'
            />
          </>
        )}
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
        value={selectedType.toUpperCase()}
        className='max-w-xs'
      />
      <LaptopSupplierDropDown />
      <BranchDropDown />
    </div>
  );
};

export default LaptopInputForms;
