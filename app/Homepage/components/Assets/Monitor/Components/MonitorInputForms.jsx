import React, { useEffect, useState } from "react";
import { Input, Textarea } from "@nextui-org/react";
import EmployeeDropDown from "../../DropDownComponents/EmployeeDropDown";
import { format } from "date-fns";
import { useAtom } from "jotai";
import { branchAtom, supplierAtom } from "../../Store/LaptopStore";
import LaptopSupplierDropDown from "../../DropDownComponents/LaptopSupplierDropDown";
import BranchDropDown from "../../DropDownComponents/BranchDropDown";
import MonitorStatus from "../../DropDownComponents/MonitorStatus";
import { statusAtom } from "../../Store/MonitorStore";
const MonitorInputForms = ({ selectedType, employeeOptions }) => {
  const [item, setItem] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [faCode, setFaCode] = useState("");
  const [tagCode, setTagCode] = useState("");
  const [remarks, setRemarks] = useState("");
  const [assetHolder, setAssetHolder] = useState(null);
  const [doi, setDoi] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [dop, setDop] = useState("");
  const [branch, setBranch] = useAtom(branchAtom);
  const [supplier, setSupplier] = useAtom(supplierAtom);
  const [status, setStatus] = useAtom(statusAtom);
  //handlers
  const handleAssetHolder = (opt) => {
    console.log(opt);
    if (opt !== null) {
      const dateToday = new Date();
      setDoi(format(dateToday, "yyyy-MM-dd"));
    } else {
      setDoi("");
    }
    setAssetHolder(opt);
  };
  const handleBranch = (opt) => {
    setBranch(opt);
  };
  const handleSupplier = (opt) => {
    setSupplier(opt);
  };
  const handleStatus = (opt) => {
    setStatus(opt);
  };
  return (
    <div className='w-full flex flex-wrap p-1 gap-3'>
      <div className='p-2 border rounded-md'>
        <p className='p-1 font-bold'>Asset Data</p>
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
            type='number'
            label='FA CODE'
            value={faCode}
            onChange={(e) => setFaCode(e.target.value)}
            size={"sm"}
            className='max-w-40'
          />
          <Input
            type='text'
            label='Tag Code'
            value={tagCode}
            onChange={(e) => setTagCode(e.target.value)}
            size={"sm"}
            className='max-w-40'
          />
          <Input
            type='text'
            size={"sm"}
            label='Serial Number'
            value={serialNo}
            onChange={(e) => setSerialNo(e.target.value)}
            className='max-w-xs'
          />
          <Input
            type='number'
            label='Unit Price'
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
            size={"sm"}
            className='max-w-40'
          />
          <Input
            type='date'
            size={"sm"}
            label='DOP'
            value={dop}
            onChange={(e) => setDop(e.target.value)}
            className='w-auto'
          />
          <Input
            isDisabled
            type='text'
            label='Category'
            size={"sm"}
            value={selectedType.toUpperCase()}
            className='max-w-xs'
          />
          <LaptopSupplierDropDown
            supplier={supplier}
            setSupplier={handleSupplier}
          />
          <Textarea
            type='text'
            label='Remarks'
            size={"sm"}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className='w-full'
          />
        </div>
        <p className='p-1 font-bold'>User Data</p>
        <div className='w-full flex flex-wrap p-1 gap-3'>
          <EmployeeDropDown
            employeeOptions={employeeOptions}
            assetHolder={assetHolder}
            setAssetHolder={handleAssetHolder}
          />
          <Input
            type='date'
            size={"sm"}
            label='DOI Current User'
            value={doi}
            onChange={(e) => setDoi(e.target.value)}
            className='max-w-xs'
          />
        </div>
        <p className='p-1 font-bold'>Status</p>
        <div className='w-full flex flex-wrap p-1 gap-3'>
          <BranchDropDown branch={branch} setBranch={handleBranch} />
          <MonitorStatus status={status} setStatus={handleStatus} />
        </div>
      </div>
    </div>
  );
};

export default MonitorInputForms;
