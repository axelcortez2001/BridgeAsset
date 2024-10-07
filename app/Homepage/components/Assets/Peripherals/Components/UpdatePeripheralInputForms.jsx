import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
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
  setPeripheralToDefault,
} from "../../Store/PeripheralStore";
import { Button, Input, Textarea } from "@nextui-org/react";
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
import { GrPowerReset } from "react-icons/gr";
import ConfirmationModal from "@/app/SharedComponents/ConfirmationModal";
import { viewAssetHistoryAtom } from "../../Store/LaptopStore";
import AssetDataSelection from "../../DropDownComponents/AssetDataSelection";
import AssetModalData from "../../AssetOtherComponents/AssetModalData";

const UpdatePeripheralInputForms = ({
  selectedType,
  itemStatusOption,
  employeeOptions,
  from,
}) => {
  const [isConfirmationModal, setConfirmationModal] = useState(false);

  const handleConfirmationModal = () => {
    setConfirmationModal((prev) => !prev);
  };

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
  const [viewAssetHistory, setViewAssetHistory] = useAtom(viewAssetHistoryAtom);
  const setDataToDefault = useSetAtom(setPeripheralToDefault);

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

  const handleSelectData = async (opt) => {
    setSelectedAssetData(opt);
    await setAssetDataFromSelected();
  };

  const handleReset = async () => {
    setSelectedAssetData(null);
    await setDataToDefault();
    handleConfirmationModal();
  };

  return (
    <>
      {selectedAssetData !== null && (
        <div className={`grid grid-cols-4`}>
          <div className={`${from === "modal" && "hidden"}`}>
            <Button onClick={handleConfirmationModal} className="w-full">
              <GrPowerReset size={18} />
              <p className="hidden md:block">Change Asset</p>
            </Button>
          </div>
          <div
            className={`flex justify-center items-center font-bold ${
              from === "modal" ? "col-span-4" : "col-span-2"
            } `}
          >
            <p> Update Information</p>
          </div>
          <div className={`${from === "modal" && "hidden"}`}>
            {!viewAssetHistory ? (
              <Button
                className="w-full rounded-lg"
                onClick={() => setViewAssetHistory(true)}
              >
                History
              </Button>
            ) : (
              <Button
                className="w-full rounded-lg"
                onClick={() => setViewAssetHistory(false)}
              >
                Back to Asset
              </Button>
            )}
          </div>
        </div>
      )}

      {selectedAssetData === null ? (
        <AssetDataSelection setData={handleSelectData} />
      ) : (
        <>
          <div className={`py-2 ${itemStatusOption === "Update" && "hidden"} `}>
            <AssetModalData asset={selectedAssetData} />
          </div>
          <div className="flex flex-col gap-2">
            <div className={`${itemStatusOption === "Transfer" && "hidden"}`}>
              <div className="md:col-span-2">
                <p className="font-bold text-lg px-2">Basic Information</p>
              </div>

              <div className="col-span-2">
                <PeripheralTypeDropdown
                  peripheralType={peripheralType}
                  setPeripheralType={handlePeripheral}
                />
              </div>
            </div>
            {peripheralType !== "" && (
              <>
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 gap-2 ${
                    itemStatusOption === "Transfer" && "hidden"
                  }`}
                >
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

                {(itemStatusOption === "Active" ||
                  itemStatusOption === "Transfer") && (
                  <div>
                    <p className="font-bold text-lg px-2">User Data</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <EmployeeDropDown
                        employeeOptions={employeeOptions}
                        assetHolder={assetHolder?.name}
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

                <div
                  className={`${itemStatusOption === "Transfer" && "hidden"}`}
                >
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
        </>
      )}

      <ConfirmationModal
        isOpen={isConfirmationModal}
        onClose={handleConfirmationModal}
        message={<p>Confirm to change asset to be modified</p>}
        header={"Confirmation"}
        action={handleReset}
      />
    </>
  );
};

export default UpdatePeripheralInputForms;
