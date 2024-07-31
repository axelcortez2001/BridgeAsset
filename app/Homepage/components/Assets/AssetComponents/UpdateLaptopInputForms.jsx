import {
  assetDataAtom,
  selectedAssetDataAtom,
} from "@/app/Homepage/AssetStore";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Input } from "@nextui-org/react";
import React from "react";
import {
  assetHolderAtom,
  branchAtom,
  doiAtom,
  dopAtom,
  FACodeAtom,
  itemNameAtom,
  serialNumberAtom,
  setDataFromSelectedAtom,
  setDataToDefaultAtom,
  statusAtom,
  supplierAtom,
  unitPriceAtom,
  userTypeAtom,
  warrantyPeriodAtom,
} from "../Store/LaptopStore";
import AssetDataSelection from "../DropDownComponents/AssetDataSelection";
import EmployeeDropDown from "../DropDownComponents/EmployeeDropDown";
import LaptopSupplierDropDown from "../DropDownComponents/LaptopSupplierDropDown";
import BranchDropDown from "../DropDownComponents/BranchDropDown";
import UserRadioOption from "../DropDownComponents/UserRadioOption";
import StatusOption from "../DropDownComponents/StatusOption";

const UpdateLaptopInputForms = ({
  selectedType,
  itemStatusOption,
  employeeOptions,
}) => {
  const [selectedAssetData, setSelectedAssetData] = useAtom(
    selectedAssetDataAtom
  );
  const setDataFromSelected = useSetAtom(setDataFromSelectedAtom);
  const setDataToDefault = useSetAtom(setDataToDefaultAtom);
  const assetData = useAtomValue(assetDataAtom);

  //asset data holder
  const [item, setItem] = useAtom(itemNameAtom);
  const [serialNo, setSerialNo] = useAtom(serialNumberAtom);
  const [faCode, setFaCode] = useAtom(FACodeAtom);
  const [unitPrice, setUnitPrice] = useAtom(unitPriceAtom);
  const [dop, setDop] = useAtom(dopAtom);
  const [warrantyPeriod, setWarrantyPeriod] = useAtom(warrantyPeriodAtom);
  const [assetHolder, setAssetHolder] = useAtom(assetHolderAtom);
  const [doi, setDoi] = useAtom(doiAtom);
  const [supplier, setSupplier] = useAtom(supplierAtom);
  const [branch, setBranch] = useAtom(branchAtom);
  const [userType, setUserType] = useAtom(userTypeAtom);
  const [status, setStatus] = useAtom(statusAtom);

  //handlers
  const handleSelecData = async (opt) => {
    setSelectedAssetData(opt);
    await setDataFromSelected();
  };
  const handleReset = async () => {
    setSelectedAssetData(null);
    await setDataToDefault();
  };
  const handleAssetHolder = (opt) => {
    setAssetHolder(opt);
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
  const handleStatus = (opt) => {
    setStatus(opt);
  };

  return (
    <div className='w-full flex flex-wrap p-1 gap-3'>
      {selectedAssetData !== null && (
        <div className='flex'>
          <div
            className='border rounded-md p-2 text-sm ml-2 hover:cursor-pointer hover:bg-slate-500 hover:text-white transition-all'
            onClick={handleReset}
          >
            Reset
          </div>
          <div className='border rounded-md p-2 text-sm ml-2 hover:cursor-pointer hover:bg-slate-500 hover:text-white transition-all'>
            View Asset History
          </div>
        </div>
      )}
      {selectedAssetData === null ? (
        <AssetDataSelection setData={handleSelecData} />
      ) : (
        <div className='p-1 border rounded-md'>
          <p className='p-2 font-bold'>Asset Data</p>
          <div className='w-full flex flex-wrap p-1 gap-3  bg-'>
            <Input
              isRequired
              type='text'
              label='Item'
              size={"sm"}
              value={item}
              onChange={(e) => setItem(e.target.value)}
              className='w-auto'
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
            <Input
              type='number'
              size={"sm"}
              label='Price'
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              className='w-auto'
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
              className='w-auto max-w-32'
            />
            <LaptopSupplierDropDown
              supplier={supplier}
              setSupplier={handleSupplier}
            />
            <BranchDropDown branch={branch} setBranch={handleBranch} />
            <UserRadioOption userType={userType} setUserType={handleUserType} />
          </div>
          <div className='flex flex-col'>
            <p className='p-2 font-bold'>Asset Holder Data</p>
            <div className='flex flex-wrap gap-3 items-center'>
              <EmployeeDropDown
                employeeOptions={employeeOptions}
                assetHolder={assetHolder}
                setAssetHolder={handleAssetHolder}
                size={"sm"}
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
          </div>
          <div className='flex flex-col'>
            <p className='p-2 font-bold'>Asset Status</p>
            <div className='flex flex-wrap gap-3 items-center p-2'>
              <div
                className={`border rounded-md p-2 ${
                  selectedAssetData?.item_stats === "Active" &&
                  "border-green-500 text-green-500"
                }`}
              >
                {selectedAssetData?.item_stats}
              </div>
              <StatusOption status={status} setStatus={handleStatus} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateLaptopInputForms;
