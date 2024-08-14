import React, { useEffect, useState } from "react";
import { Input, Textarea } from "@nextui-org/react";
import LaptopSupplierDropDown from "../../DropDownComponents/LaptopSupplierDropDown";
import BranchDropDown from "../../DropDownComponents/BranchDropDown";
import EmployeeDropDown from "../../DropDownComponents/EmployeeDropDown";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  assetHolderAtom,
  branchAtom,
  doiAtom,
  dopAtom,
  FACodeAtom,
  itemNameAtom,
  remarksAtom,
  SaveLaptopAtom,
  serialNumberAtom,
  setDataToDefaultAtom,
  statusAtom,
  supplierAtom,
  unitPriceAtom,
  userTypeAtom,
  warrantyPeriodAtom,
} from "../../Store/LaptopStore";
import StatusOption from "../../DropDownComponents/StatusOption";
import UserRadioOption from "../../DropDownComponents/UserRadioOption";
import { selectedAssetDataAtom } from "@/app/Homepage/AssetStore";
import { format } from "date-fns";

const LaptopInputForms = ({
  selectedType,
  itemStatusOption,
  employeeOptions,
}) => {
  const dateToday = new Date();
  const [item, setItem] = useAtom(itemNameAtom);
  const [faCode, setFaCode] = useAtom(FACodeAtom);
  const [serialNo, setSerialNo] = useAtom(serialNumberAtom);
  const [doi, setDoi] = useAtom(doiAtom);
  const [warrantyPeriod, setWarrantyPeriod] = useAtom(warrantyPeriodAtom);
  const [unitPrice, setUnitPrice] = useAtom(unitPriceAtom);
  const [dop, setDop] = useAtom(dopAtom);
  const [assetHolder, setAssetHolder] = useAtom(assetHolderAtom);
  const [status, setStatus] = useAtom(statusAtom);
  const [supplier, setSupplier] = useAtom(supplierAtom);
  const [branch, setBranch] = useAtom(branchAtom);
  const [userType, setUserType] = useAtom(userTypeAtom);
  const [remarks, setRemarks] = useAtom(remarksAtom);
  const selectedAssetData = useAtomValue(selectedAssetDataAtom);
  const setDataToDefault = useSetAtom(setDataToDefaultAtom);
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
  const handleStatus = (opt) => {
    setStatus(opt);
  };
  const handleSupplier = (opt) => {
    setSupplier(opt);
  };
  const handleBranch = (opt) => {
    setBranch(opt);
  };
  const handleUserType = (opt) => {
    setUserType(opt);
  };
  useEffect(() => {
    const handleResetInput = async () => {
      if (itemStatusOption !== "Update") {
        await setDataToDefault();
      }
    };
    handleResetInput();
  }, [itemStatusOption]);
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
          onChange={(e) => setFaCode(e.target.value)}
          size={"sm"}
          className='max-w-xs'
        />

        {itemStatusOption === "Active" && (
          <>
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
          </>
        )}
        <Input
          type='number'
          size={"sm"}
          label='Price'
          value={unitPrice}
          onChange={(e) => setUnitPrice(e.target.value)}
          className='max-w-xs'
        />
        <Input
          type='date'
          size={"sm"}
          label='DOP'
          value={dop}
          onChange={(e) => setDop(e.target.value)}
          className='max-w-xs'
        />
        <Input
          type='number'
          size={"sm"}
          label='Warranty Period'
          value={warrantyPeriod}
          onChange={(e) => setWarrantyPeriod(e.target.value)}
          className='max-w-xs'
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
      <BranchDropDown branch={branch} setBranch={handleBranch} />
      <StatusOption status={status} setStatus={handleStatus} />
      <UserRadioOption userType={userType} setUserType={handleUserType} />
    </div>
  );
};

export default LaptopInputForms;
