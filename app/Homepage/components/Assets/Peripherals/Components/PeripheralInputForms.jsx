import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React, { useEffect } from "react";
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
  userTypeAtom,
  setPeripheralFromDataSelectedAtom,
} from "../../Store/PeripheralStore";
import { Input, Textarea } from "@nextui-org/react";
import LaptopSupplierDropDown from "../../DropDownComponents/LaptopSupplierDropDown";
import BranchDropDown from "../../DropDownComponents/BranchDropDown";
import PeripheralTypeDropdown from "../../DropDownComponents/PeripheralTypeDropdown";
import EmployeeDropDown from "../../DropDownComponents/EmployeeDropDown";
import {
  globalSelectedassetAtom,
  selectedAssetDataAtom,
  setLogicAssetHolderAtom,
} from "@/app/Homepage/AssetStore";
import { format } from "date-fns";
import { historyPeripheralActionFunction } from "../../Functions/functionAtom";
import UserRadioOption from "../../DropDownComponents/UserRadioOption";
import InputFields from "@/app/SharedComponents/InputFields";
import StatusOption from "../../DropDownComponents/StatusOption";

const PeripheralInputForms = ({
  selectedType,
  itemStatusOption,
  employeeOptions,
}) => {
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
  const [userType, setUserType] = useAtom(userTypeAtom);

  //get Atom

  //set atoms
  const setLogicAssetHolder = useSetAtom(setLogicAssetHolderAtom);
  const globalSelected = useAtomValue(globalSelectedassetAtom);
  const [selectedAssetData, setSelectedAssetData] = useAtom(
    selectedAssetDataAtom
  );
  const setAssetDataFromSelected = useSetAtom(
    setPeripheralFromDataSelectedAtom
  );
  useEffect(() => {
    if (globalSelected !== null) {
      setSelectedAssetData(globalSelected);
      setAssetDataFromSelected(globalSelected);
    }
  }, [globalSelected, setSelectedAssetData]);

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

  const handleUserType = (opt) => {
    setUserType(opt);
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
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="md:col-span-2">
          <p className="font-bold text-lg px-2">Basic Information</p>
        </div>

        <div className="col-span-2">
          <PeripheralTypeDropdown
            peripheralType={peripheralType}
            setPeripheralType={handlePeripheral}
          />
        </div>
        {peripheralType !== "" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <InputFields
                isRequired={true}
                label={"Item"}
                value={item}
                setValue={setItem}
              />

              <InputFields
                isRequired={false}
                label={"Tag Code"}
                value={tagCode}
                setValue={setTagCode}
              />

              <InputFields
                isRequired={false}
                label={"Serial Number"}
                value={serialNo}
                setValue={setSerialNo}
              />

              <InputFields
                type="number"
                isRequired={false}
                label={"Unit Price"}
                value={unitPrice}
                setValue={setUnitPrice}
              />

              <InputFields
                type="date"
                isRequired={false}
                label={"Warranty Period"}
                value={warrantyPeriod}
                setValue={setWarrantyPeriod}
              />

              <InputFields
                type="date"
                isRequired={false}
                label={"DOP"}
                value={dop}
                setValue={setDop}
              />

              <div className="md:col-span-2">
                <LaptopSupplierDropDown
                  supplier={supplier}
                  setSupplier={handleSupplier}
                />
              </div>

              <div className="md:col-span-2">
                <InputFields
                  isRequired={false}
                  label={"Remarks"}
                  value={remarks}
                  setValue={setRemarks}
                  textArea={true}
                />
              </div>
            </div>

            {itemStatusOption === "Active" && (
              <div>
                <p className="font-bold text-lg px-2">User Data</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <EmployeeDropDown
                    employeeOptions={employeeOptions}
                    assetHolder={assetHolder}
                    setAssetHolder={handleAssetHolder}
                  />

                  <InputFields
                    type="date"
                    isRequired={false}
                    label={"DOI Current User"}
                    value={doi}
                    setValue={setDoi}
                  />
                </div>
              </div>
            )}

            <div>
              <p className="font-bold text-lg px-2">Status</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <BranchDropDown branch={branch} setBranch={handleBranch} />
                <StatusOption
                  status={status}
                  setStatus={handleStatus}
                  selectedType={selectedType}
                />
                <div className="px-2 md:col-span-2">
                  <UserRadioOption
                    userType={userType}
                    setUserType={handleUserType}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PeripheralInputForms;
