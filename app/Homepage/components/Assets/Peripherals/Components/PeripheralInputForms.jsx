import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React from "react";
import {
  itemNameAtom,
  serialNumberAtom,
  FACodeAtom,
  tagCodeAtom,
  remarksAtom,
  assetHolderAtom,
  doiAtom,
  unitPriceAtom,
  dopAtom,
  branchAtom,
  supplierAtom,
  statusAtom,
  peripheralTypeAtom,
  warrantyPeriodAtom,
} from "../../Store/PeripheralStore";
import { Input, Textarea } from "@nextui-org/react";
import LaptopSupplierDropDown from "../../DropDownComponents/LaptopSupplierDropDown";
import BranchDropDown from "../../DropDownComponents/BranchDropDown";
import MonitorStatus from "../../DropDownComponents/MonitorStatus";
import PeripheralTypeDropdown from "../../DropDownComponents/PeripheralTypeDropdown";
import EmployeeDropDown from "../../DropDownComponents/EmployeeDropDown";
import {
  selectedAssetDataAtom,
  setLogicAssetHolderAtom,
} from "@/app/Homepage/AssetStore";
import { format } from "date-fns";

const PeripheralInputForms = ({ employeeOptions }) => {
  const [item, setItem] = useAtom(itemNameAtom);
  const [serialNo, setSerialNo] = useAtom(serialNumberAtom);
  const [tagCode, setTagCode] = useAtom(tagCodeAtom);
  const [remarks, setRemarks] = useAtom(remarksAtom);
  const [assetHolder, setAssetHolder] = useAtom(assetHolderAtom);
  const [doi, setDoi] = useAtom(doiAtom);
  const [unitPrice, setUnitPrice] = useAtom(unitPriceAtom);
  const [dop, setDop] = useAtom(dopAtom);
  const [branch, setBranch] = useAtom(branchAtom);
  const [supplier, setSupplier] = useAtom(supplierAtom);
  const [status, setStatus] = useAtom(statusAtom);
  const [peripheralType, setPeripheralType] = useAtom(peripheralTypeAtom);
  const [warrantyPeriod, setWarrantyPeriod] = useAtom(warrantyPeriodAtom);

  //get Atom
  const selectedAssetData = useAtomValue(selectedAssetDataAtom);
  //set atoms
  const setLogicAssetHolder = useSetAtom(setLogicAssetHolderAtom);

  //handlers
  const handleSupplier = (opt) => {
    setSupplier(opt);
  };
  const handleBranch = (opt) => {
    setBranch(opt);
  };
  const handleStatus = (opt) => {
    setStatus(opt);
  };
  const handlePeripheral = (opt) => {
    console.log(opt);
    setPeripheralType(opt);
  };
  const handleAssetHolder = (opt) => {
    console.log("beofre: ", employeeOptions);
    setLogicAssetHolder(selectedAssetData?.asset_holder);
    if (opt !== null) {
      const dateToday = new Date();
      setDoi(format(dateToday, "yyyy-MM-dd"));
    } else {
      setDoi("");
    }
    setAssetHolder(opt);
    console.log("After: ", employeeOptions);
  };
  return (
    <div className='w-full flex flex-wrap p-1 gap-3'>
      <div className='p-2 border rounded-md'>
        <p className='p-1 font-bold'>Asset Data</p>
        <PeripheralTypeDropdown
          peripheralType={peripheralType}
          setPeripheralType={handlePeripheral}
        />
        {peripheralType !== "" && (
          <div>
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
                type='text'
                label='Tag Code'
                value={tagCode}
                onChange={(e) => setTagCode(e.target.value)}
                size={"sm"}
                className='max-w-40'
              />{" "}
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
                type='number'
                label='Warranty Period'
                value={warrantyPeriod}
                onChange={(e) => setWarrantyPeriod(e.target.value)}
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
        )}
      </div>
    </div>
  );
};

export default PeripheralInputForms;
