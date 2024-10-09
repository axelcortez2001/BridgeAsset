import {
  assetDataAtom,
  globalSelectedassetAtom,
  selectedAssetDataAtom,
  setLogicAssetHolderAtom,
} from "@/app/Homepage/AssetStore";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Button, Textarea } from "@nextui-org/react";
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
  remarksAtom,
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
import { GrPowerReset } from "react-icons/gr";
import { historyActionfunction } from "../../Functions/functionAtom";
import InputFields from "@/app/SharedComponents/InputFields";
import AssetHistory from "../../AssetOtherComponents/AssetHistory";
import AssetModalData from "../../AssetOtherComponents/AssetModalData";
import ConfirmationModal from "@/app/SharedComponents/ConfirmationModal";

const UpdateLaptopInputForms = ({
  selectedType,
  itemStatusOption,
  employeeOptions,
  from,
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
  const [remarks, setRemarks] = useAtom(remarksAtom);
  const setLogicAssetHolder = useSetAtom(setLogicAssetHolderAtom);
  const setHistory = useSetAtom(historyActionfunction);
  const globalSelected = useAtomValue(globalSelectedassetAtom);

  const [isConfirmationModal, setConfirmationModal] = useState(false);

  const handleConfirmationModal = () => {
    setConfirmationModal((prev) => !prev);
  };

  useEffect(() => {
    if (globalSelected !== null) {
      setSelectedAssetData(globalSelected);
      setDataFromSelected(globalSelected);
    }
  }, [globalSelected, setSelectedAssetData]);

  const handleSelecData = async (opt) => {
    setSelectedAssetData(opt);
    setActionHistoryAtom([]);
    await setDataFromSelected();
  };

  const handleReset = async () => {
    setViewAssetHistory(false);
    setSelectedAssetData(null);
    setActionHistoryAtom([]);
    await setDataToDefault();
    handleConfirmationModal();
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

  const history = selectedAssetData?.asset_history;
  const currentUser = selectedAssetData?.asset_holder?.name;

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
        <AssetDataSelection setData={handleSelecData} />
      ) : !viewAssetHistory ? (
        <>
          <div className={`py-2 ${!checkDisabled(["Update"]) && "hidden"}`}>
            <AssetModalData asset={selectedAssetData} />
          </div>
          <div>
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-2 py-2 ${
                checkDisabled(["Update"]) && "hidden"
              }`}
            >
              <InputFields
                isDisabled={checkDisabled(["Update"])}
                isRequired={true}
                label={"Item"}
                value={item}
                setValue={setItem}
              />

              <InputFields
                isDisabled={checkDisabled(["Update"])}
                isRequired={true}
                label={"Serial Number"}
                value={serialNo}
                setValue={setSerialNo}
              />

              <InputFields
                isDisabled={checkDisabled(["Update"])}
                isRequired={true}
                type="number"
                label={"Price"}
                value={unitPrice}
                setValue={setUnitPrice}
              />

              <InputFields
                isDisabled={checkDisabled(["Update"])}
                isRequired={true}
                type="date"
                label={"DOP"}
                value={dop}
                setValue={setDop}
              />

              <InputFields
                isDisabled={checkDisabled(["Update"])}
                isRequired={true}
                type="date"
                label={"Warranty Period"}
                value={warrantyPeriod}
                setValue={setWarrantyPeriod}
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

              <StatusOption
                status={status}
                setStatus={handleStatus}
                isDisabled={checkDisabled(["Update"])}
                selectedType={selectedType}
              />

              <div className="md:col-span-2">
                <Textarea
                  type="text"
                  label="Remarks"
                  size={"sm"}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="flex flex-col md:col-span-2">
                <UserRadioOption
                  userType={userType}
                  setUserType={handleUserType}
                  isDisabled={checkDisabled(["Update"])}
                />
              </div>
            </div>
          </div>
          <div
            className={`flex flex-col gap-2 ${
              !checkDisabled(["Update"]) && "hidden"
            }`}
          >
            <p className="font-bold px-2">Transfer To:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <EmployeeDropDown
                employeeOptions={employeeOptions}
                assetHolder={currentUser}
                setAssetHolder={handleAssetHolder}
                // isDisabled={checkDisabled(["Transfer"])}
                size={"sm"}
                label={"New User"}
              />

              <InputFields
                isRequired={true}
                type="date"
                label={"DOI Current User"}
                value={doi}
                setValue={setDoi}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="py-2">
          <AssetHistory history={history} type={"asset"} />
        </div>
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

export default UpdateLaptopInputForms;
