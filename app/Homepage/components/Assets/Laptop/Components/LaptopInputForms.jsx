import React, { useEffect, useState } from "react";
import { Button, Divider, Input, Textarea } from "@nextui-org/react";
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
import {
  selectedAssetDataAtom,
  selectedTypeAtom,
} from "@/app/Homepage/AssetStore";
import { format } from "date-fns";
import InputFields from "@/app/SharedComponents/InputFields";

const LaptopInputForms = ({ itemStatusOption, employeeOptions }) => {
  const selectedType = useAtomValue(selectedTypeAtom);

  const dateToday = new Date();
  const [item, setItem] = useAtom(itemNameAtom);
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
    <div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
        <InputFields
          isRequired={true}
          label={"Item"}
          value={item}
          setValue={setItem}
        />

        <InputFields
          isRequired={true}
          label={"Serial Number"}
          value={serialNo}
          setValue={setSerialNo}
        />

        {itemStatusOption === "Active" && (
          <>
            <EmployeeDropDown
              employeeOptions={employeeOptions}
              assetHolder={assetHolder}
              setAssetHolder={handleAssetHolder}
            />

            <InputFields
              isRequired={true}
              type="date"
              label={"DOI Current User"}
              value={doi}
              setValue={setDoi}
            />
          </>
        )}
        <InputFields
          isRequired={true}
          type="number"
          label={"Price"}
          value={unitPrice}
          setValue={setUnitPrice}
        />

        <InputFields
          isRequired={true}
          type="date"
          label={"DOP"}
          value={dop}
          setValue={setDop}
        />

        <InputFields
          isRequired={true}
          type="date"
          label={"Warranty Period"}
          value={warrantyPeriod}
          setValue={setWarrantyPeriod}
        />

        <InputFields
          isDisabled={true}
          label={"Category"}
          value={selectedType}
        />

        <div className="md:col-span-2">
          <InputFields
            textArea={true}
            isRequired={true}
            type="text"
            label={"Remarks"}
            value={remarks}
            setValue={setRemarks}
          />
        </div>

        <div className="md:col-span-2 px-2 py-4">
          <UserRadioOption userType={userType} setUserType={handleUserType} />
        </div>

        <LaptopSupplierDropDown
          supplier={supplier}
          setSupplier={handleSupplier}
        />

        <BranchDropDown branch={branch} setBranch={handleBranch} />
        <StatusOption status={status} setStatus={handleStatus} selectedType={selectedType} />
      </div>
    </div>
  );
};

export default LaptopInputForms;
