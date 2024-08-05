import {
  assetDataAtom,
  selectedAssetDataAtom,
  setLogicAssetHolderAtom,
} from "@/app/Homepage/AssetStore";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import {
  actionHistoryAtom,
  assetHolderAtom,
  branchAtom,
  doiAtom,
  dopAtom,
  FACodeAtom,
  item_statsAtom,
  itemNameAtom,
  laptopStatusData,
  serialNumberAtom,
  setDataFromSelectedAtom,
  setDataToDefaultAtom,
  statusAtom,
  supplierAtom,
  unitPriceAtom,
  userTypeAtom,
  viewAssetHistoryAtom,
  warrantyPeriodAtom,
} from "../../Store/LaptopStore";
import AssetDataSelection from "../../DropDownComponents/AssetDataSelection";
import EmployeeDropDown from "../../DropDownComponents/EmployeeDropDown";
import LaptopSupplierDropDown from "../../DropDownComponents/LaptopSupplierDropDown";
import BranchDropDown from "../../DropDownComponents/BranchDropDown";
import UserRadioOption from "../../DropDownComponents/UserRadioOption";
import StatusOption from "../../DropDownComponents/StatusOption";
import { format } from "date-fns";
import AssetHistory from "../../AssetComponents/AssetHistory";
import { GrPowerReset } from "react-icons/gr";
import { historyActionfunction } from "../../Functions/functionAtom";

const UpdateLaptopInputForms = ({
  selectedType,
  itemStatusOption,
  employeeOptions,
}) => {
  const laptopStatus = laptopStatusData;
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
  const [item_stats, setItemStats] = useAtom(item_statsAtom);
  const [actionHistory, setActionHistoryAtom] = useAtom(actionHistoryAtom);
  const [viewAssetHistory, setViewAssetHistory] = useAtom(viewAssetHistoryAtom);
  const setLogicAssetHolder = useSetAtom(setLogicAssetHolderAtom);
  const setHistory = useSetAtom(historyActionfunction);

  //handlers
  const handleInput = (field, newData, oldData) => {
    if (newData !== oldData) {
      setHistory(field, newData, oldData);
    }
    console.log("History: ", actionHistory);
  };
  const handleSelecData = async (opt) => {
    setSelectedAssetData(opt);
    setActionHistoryAtom([]);
    await setDataFromSelected();
  };
  const handleReset = async () => {
    if (window.confirm("Are you sure you want to change current selected?")) {
      setViewAssetHistory(false);
      setSelectedAssetData(null);
      setActionHistoryAtom([]);
      await setDataToDefault();
    }
  };
  const handleAssetHolder = (opt) => {
    setAssetHolder(opt);
    setLogicAssetHolder(selectedAssetData?.asset_holder);
    if (opt !== null) {
      if (selectedAssetData?.status?.id === 5) {
        setStatus(selectedAssetData?.status);
      } else {
        setStatus(laptopStatus[0]);
        setItemStats("Active");
      }
      if (selectedAssetData?.asset_holder?.name === opt.name) {
        setDoi(selectedAssetData?.doi);
      } else {
        const dateToday = new Date();
        setDoi(format(dateToday, "yyyy-MM-dd"));
      }
    } else {
      if (selectedAssetData?.status?.id === 0) {
        setItemStats("SOH");
      } else {
        setStatus(selectedAssetData?.status);
        setItemStats(selectedAssetData?.item_stats);
      }
      setDoi("");
    }

    handleInput(" Asset Holder ", opt?.name, assetHolder?.name);
  };
  const handleSupplier = (opt) => {
    setSupplier(opt);
    handleInput(" Supplier ", opt?.name, supplier?.name);
  };
  const handleBranch = (opt) => {
    setBranch(opt);
    handleInput(" Branch ", opt, branch);
  };
  const handleUserType = (opt) => {
    setUserType(opt);
    handleInput(" User Type ", opt, userType);
  };
  const handleStatus = (opt) => {
    setStatus(opt);
    handleInput(" Status ", opt?.name, status?.name);
    if (opt.name === "Defective" || opt.name === "Irreparable") {
      setItemStats(opt.name === "Defective" ? "For Repair" : opt.name);
      setAssetHolder(null);
      setDoi("");
    } else if (opt.name === "Working") {
      if (selectedAssetData?.asset_holder !== null) {
        setAssetHolder(selectedAssetData?.asset_holder);
        setDoi(selectedAssetData?.doi);
        setItemStats("Active");
      } else {
        setItemStats("SOH");
      }
    } else if (opt.name === "Good to Issue") {
      setItemStats("SOH");
    } else if (opt.id === 4 || opt.id === 5) {
      if (selectedAssetData?.asset_holder !== null) {
        setAssetHolder(selectedAssetData?.asset_holder);
        setDoi(selectedAssetData?.doi);
        setItemStats("Active");
      } else {
        setItemStats("SOH");
      }
    } else {
      setItemStats("OTHERS");
    }
  };
  const checkDisabled = (opt) => {
    if (opt.includes(itemStatusOption)) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className='w-full flex flex-wrap p-1 gap-3'>
      {selectedAssetData !== null && (
        <div className='flex'>
          <div
            className='border rounded-md p-2 text-sm ml-2 hover:cursor-pointer hover:bg-slate-500 hover:text-white transition-all'
            onClick={handleReset}
          >
            <GrPowerReset size={18} />
          </div>
          {!viewAssetHistory ? (
            <div
              onClick={() => setViewAssetHistory(true)}
              className='border rounded-md p-2 text-sm ml-2 hover:cursor-pointer hover:bg-slate-500 hover:text-white transition-all'
            >
              View Asset History
            </div>
          ) : (
            <div
              onClick={() => setViewAssetHistory(false)}
              className='border rounded-md p-2 text-sm ml-2 hover:cursor-pointer hover:bg-slate-500 hover:text-white transition-all'
            >
              Back to Asset Component
            </div>
          )}
        </div>
      )}
      {selectedAssetData === null ? (
        <AssetDataSelection setData={handleSelecData} />
      ) : !viewAssetHistory ? (
        <div className='p-1 border rounded-md'>
          <p className='p-2 font-bold'>Asset Data</p>
          <div className='w-full flex flex-wrap p-1 gap-3  bg-'>
            <Input
              disabled={checkDisabled(["Update"])}
              isRequired
              type='text'
              label='Item'
              size={"sm"}
              value={item}
              onChange={(e) => setItem(e.target.value)}
              onBlur={() =>
                handleInput(" Item ", item, selectedAssetData?.item)
              }
              className='w-auto'
            />
            <Input
              isRequired
              disabled={checkDisabled(["Update"])}
              type='text'
              size={"sm"}
              label='Serial Number'
              value={serialNo}
              onChange={(e) => setSerialNo(e.target.value)}
              className='max-w-xs'
              onBlur={() =>
                handleInput(
                  " Serial Number ",
                  serialNo,
                  selectedAssetData?.serial_number
                )
              }
            />
            <Input
              type='number'
              disabled={checkDisabled(["Update"])}
              label='FA CODE'
              value={faCode}
              onChange={(e) => setFaCode(e.target.value)}
              size={"sm"}
              className='max-w-xs'
              onBlur={() =>
                handleInput(" FA Code ", faCode, selectedAssetData?.fa_code)
              }
            />
            <Input
              type='number'
              disabled={checkDisabled(["Update"])}
              size={"sm"}
              label='Price'
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              onBlur={() =>
                handleInput(
                  " Unit Price ",
                  unitPrice,
                  selectedAssetData?.unit_price
                )
              }
              className='w-auto'
            />
            <Input
              type='date'
              disabled={checkDisabled(["Update"])}
              size={"sm"}
              label='DOP'
              value={dop}
              onChange={(e) => setDop(e.target.value)}
              onBlur={() => handleInput(" DOP ", dop, selectedAssetData?.dop)}
              className='max-w-xs'
            />
            <Input
              type='number'
              disabled={checkDisabled(["Update"])}
              size={"sm"}
              label='Warranty Period'
              value={warrantyPeriod}
              onChange={(e) => setWarrantyPeriod(e.target.value)}
              onBlur={() =>
                handleInput(
                  " Warranty Period ",
                  warrantyPeriod,
                  selectedAssetData?.warranty_period
                )
              }
              className='w-auto max-w-32'
            />
            <LaptopSupplierDropDown
              supplier={supplier}
              setSupplier={handleSupplier}
              isDisabled={checkDisabled(["Update"])}
            />
            <BranchDropDown
              branch={branch}
              setBranch={handleBranch}
              isDisabled={checkDisabled(["Update"])}
            />
            <UserRadioOption
              userType={userType}
              setUserType={handleUserType}
              isDisabled={checkDisabled(["Update"])}
            />
          </div>
          <div className='flex flex-col'>
            <p className='p-2 font-bold'>Asset Holder Data</p>
            <div className='flex flex-wrap gap-3 items-center'>
              <EmployeeDropDown
                employeeOptions={employeeOptions}
                assetHolder={assetHolder}
                setAssetHolder={handleAssetHolder}
                isDisabled={checkDisabled(["Transfer"])}
                size={"sm"}
              />
              <Input
                type='date'
                size={"sm"}
                disabled={checkDisabled(["Transfer"])}
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
                  item_stats === "Active" && "border-green-500 text-green-500"
                }`}
              >
                {item_stats}
              </div>
              <StatusOption
                status={status}
                setStatus={handleStatus}
                isDisabled={checkDisabled(["Update"])}
              />
            </div>
          </div>
        </div>
      ) : (
        <AssetHistory asset={selectedAssetData} />
      )}
    </div>
  );
};

export default UpdateLaptopInputForms;
