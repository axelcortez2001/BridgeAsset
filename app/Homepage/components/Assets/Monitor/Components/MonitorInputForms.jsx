import React, { useEffect, useState } from "react";
import { Input, Textarea } from "@nextui-org/react";
import EmployeeDropDown from "../../DropDownComponents/EmployeeDropDown";
import { format } from "date-fns";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import LaptopSupplierDropDown from "../../DropDownComponents/LaptopSupplierDropDown";
import BranchDropDown from "../../DropDownComponents/BranchDropDown";
import MonitorStatus from "../../DropDownComponents/MonitorStatus";
import {
  assetHolderAtom,
  doiAtom,
  dopAtom,
  FACodeAtom,
  itemNameAtom,
  remarksAtom,
  serialNumberAtom,
  statusAtom,
  tagCodeAtom,
  unitPriceAtom,
  viewMonitorHistoryAtom,
  supplierAtom,
  branchAtom,
} from "../../Store/MonitorStore";
import {
  selectedAssetDataAtom,
  setLogicAssetHolderAtom,
} from "@/app/Homepage/AssetStore";
import { historyMonitorActionFunction } from "../../Functions/functionAtom";
const MonitorInputForms = ({ selectedType, employeeOptions }) => {
  const [item, setItem] = useAtom(itemNameAtom);
  const [serialNo, setSerialNo] = useAtom(serialNumberAtom);
  const [faCode, setFaCode] = useAtom(FACodeAtom);
  const [tagCode, setTagCode] = useAtom(tagCodeAtom);
  const [remarks, setRemarks] = useAtom(remarksAtom);
  const [assetHolder, setAssetHolder] = useAtom(assetHolderAtom);
  const [doi, setDoi] = useAtom(doiAtom);
  const [unitPrice, setUnitPrice] = useAtom(unitPriceAtom);
  const [dop, setDop] = useAtom(dopAtom);
  const [branch, setBranch] = useAtom(branchAtom);
  const [supplier, setSupplier] = useAtom(supplierAtom);
  const [status, setStatus] = useAtom(statusAtom);
  const [viewMonitorHistory, setViewMonitorHistory] = useAtom(
    viewMonitorHistoryAtom
  );
  const setLogicAssetHolder = useSetAtom(setLogicAssetHolderAtom);
  const selectedAssetData = useAtomValue(selectedAssetDataAtom);
  const setHistory = useSetAtom(historyMonitorActionFunction);
  //handlers
  const handleAssetHolder = (opt) => {
    console.log("Holder: ", opt);
    setLogicAssetHolder(selectedAssetData?.asset_holder);
    if (opt !== null) {
      const dateToday = new Date();
      setDoi(format(dateToday, "yyyy-MM-dd"));
    } else {
      setDoi("");
    }
    setAssetHolder(opt);
    handleInput(" Asset Holder ", opt?.name, assetHolder?.name);
  };
  const handleBranch = (opt) => {
    setBranch(opt);
    handleInput(" Branch ", opt, branch);
  };
  const handleSupplier = (opt) => {
    setSupplier(opt);
    handleInput(" Supplier ", opt?.name, supplier?.name);
  };
  const handleStatus = (opt) => {
    setStatus(opt);
    handleInput(" Status ", opt?.name, status?.name);
  };
  const handleInput = (field, newData, oldData) => {
    if (selectedAssetData !== null) {
      if (newData !== oldData) {
        setHistory(field, newData, oldData);
      }
    }
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
            onBlur={() => handleInput(" Item ", item, selectedAssetData?.item)}
            onChange={(e) => setItem(e.target.value)}
            className='max-w-[500px]'
          />

          <Input
            type='number'
            label='FA CODE'
            value={faCode}
            onBlur={() =>
              handleInput(" FA Code ", faCode, selectedAssetData?.fa_code)
            }
            onChange={(e) => setFaCode(e.target.value)}
            size={"sm"}
            className='max-w-40'
          />
          <Input
            type='text'
            label='Tag Code'
            value={tagCode}
            onBlur={() =>
              handleInput(" Tag Code ", tagCode, selectedAssetData?.tagCode)
            }
            onChange={(e) => setTagCode(e.target.value)}
            size={"sm"}
            className='max-w-40'
          />
          <Input
            type='text'
            size={"sm"}
            label='Serial Number'
            value={serialNo}
            onBlur={() =>
              handleInput(
                " Serial Number ",
                serialNo,
                selectedAssetData?.serial_number
              )
            }
            onChange={(e) => setSerialNo(e.target.value)}
            className='max-w-xs'
          />
          <Input
            type='number'
            label='Unit Price'
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
            onBlur={() =>
              handleInput(
                " Unit Price ",
                unitPrice,
                selectedAssetData?.unit_price
              )
            }
            size={"sm"}
            className='max-w-40'
          />
          <Input
            type='date'
            size={"sm"}
            label='DOP'
            value={dop}
            onChange={(e) => setDop(e.target.value)}
            onBlur={() => handleInput(" DOP ", dop, selectedAssetData?.dop)}
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
            onBlur={() =>
              handleInput(" Remarks ", remarks, selectedAssetData?.remarks)
            }
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
