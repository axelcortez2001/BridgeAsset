import React, { useCallback, useEffect, useState } from "react";
import { Button, Divider, Input } from "@nextui-org/react";
import ItemStatusOption from "../DropDownComponents/ItemStatusOption";
import LaptopInputForms from "./Components/LaptopInputForms";
import { getUsers } from "@/app/utils";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  assetDataAtom,
  deleteAssetDataAtom,
  employeeOptionsAtom,
  fetchEmployeeAtom,
  filteredEmployeesAtom,
  handleReturnEmployeesDefaultAtom,
  selectedAssetDataAtom,
} from "@/app/Homepage/AssetStore";
import {
  assetHolderAtom,
  doiAtom,
  itemNameAtom,
  itemStatusOptionAtom,
  SaveLaptopAtom,
  serialNumberAtom,
  setDataToDefaultAtom,
  updateLaptopAtom,
  viewAssetHistoryAtom,
} from "../Store/LaptopStore";

import {
  handleAddNewMonitorAtom,
  itemNameAtom as monitorItemName,
  updateMonitorAtom,
} from "../Store/MonitorStore";

import {
  itemNameAtom as peripheralItemName,
  updatePeripheralAtom,
} from "../Store/PeripheralStore";

import { toast } from "sonner";
import UpdateLaptopInputForms from "./Components/UpdateLaptopInputForms";
import ConfirmationModal from "@/app/SharedComponents/ConfirmationModal";
import MonitorInputForms from "../Monitor/Components/MonitorInputForms";
import UpdateMonitorInputForms from "../Monitor/Components/UpdateMonitorInputForms";

import PeripheralInputForms from "../Peripherals/Components/PeripheralInputForms";

import { setMonitorDataToDefaultAtom } from "../Store/MonitorStore";
import UpdatePeripheralInputForms from "../Peripherals/Components/UpdatePeripheralInputForms";
import { handleAddPeripheralAtom } from "../Store/PeripheralStore";

const AllAssets = ({ selectedType, setActionStatus, from, handleClose }) => {
  const [isLoading, setLoading] = useState(false);
  const [isConfirmationModal, setConfirmationModal] = useState(false);

  const [itemStatusOption, setItemStatusOption] = useAtom(itemStatusOptionAtom);

  const handleConfirmationModal = () => {
    setConfirmationModal((prev) => !prev);
  };

  useEffect(() => {
    if (from === "modal") setItemStatusOption("Update");
    else setItemStatusOption("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const employeeOptions = useAtomValue(filteredEmployeesAtom);
  const fetchEmployee = useSetAtom(fetchEmployeeAtom);
  const saveLaptopData = useSetAtom(SaveLaptopAtom);
  const updateLaptopData = useSetAtom(updateLaptopAtom);

  const itemName = useAtomValue(itemNameAtom);
  const monitorName = useAtomValue(monitorItemName);
  const peripheralName = useAtomValue(peripheralItemName);

  const serial_No = useAtomValue(serialNumberAtom);

  const setDataToDefault = useSetAtom(setDataToDefaultAtom);
  const assetHolder = useAtomValue(assetHolderAtom);
  const doi = useAtomValue(doiAtom);
  const [selectedAssetData, setSelectedAssetData] = useAtom(
    selectedAssetDataAtom
  );
  const viewAssetHistory = useAtomValue(viewAssetHistoryAtom);
  const setEmployeesToDefault = useSetAtom(handleReturnEmployeesDefaultAtom);
  const assetData = useAtomValue(assetDataAtom);

  const handleSetItemStatusOption = (opt) => {
    setItemStatusOption(opt);
  };

  //monitor:
  const setMonitorToDefault = useSetAtom(setMonitorDataToDefaultAtom);
  const addNewMonitor = useSetAtom(handleAddNewMonitorAtom);
  const updateMonitor = useSetAtom(updateMonitorAtom);

  //peripheral
  const addPeripheralAtom = useSetAtom(handleAddPeripheralAtom);
  const updatePeripheral = useSetAtom(updatePeripheralAtom);

  const deleteAssetData = useSetAtom(deleteAssetDataAtom);

  //save new asset
  const handlesave = async () => {
    if (
      selectedType === "laptop"
        ? itemName !== ""
        : selectedType === "monitor"
        ? monitorName !== ""
        : selectedType === "peripheral" && peripheralName !== ""
    ) {
      setLoading(true);
      const category = selectedType;

      async function promise() {
        try {
          let status;

          if (selectedType === "laptop") {
            status = await saveLaptopData();
          } else if (selectedType === "monitor") {
            status = await addNewMonitor();
          } else if (selectedType === "peripheral") {
            status = await addPeripheralAtom();
          } else {
            console.log("empty selected type");
          }

          if (status.success) {
            await fetchEmployee({ category });
            return "Successfully Added a new Asset";
          } else {
            throw new Error("Encountered an Error While Adding Asset");
          }
        } catch (e) {
          throw e;
        }
      }

      toast.promise(promise, {
        loading: "Adding New Asset Data",
        success: (message) => {
          setLoading(false);
          handleClose();
          return `${message}`;
        },
        error: (message) => {
          setLoading(false);
          handleClose();
          return `${message}`;
        },
      });
    } else {
      toast.warning("No Item Name or Serial Number");
    }
  };

  const handleUpdate = async () => {
    if (
      selectedType === "laptop"
        ? itemName !== ""
        : selectedType === "monitor"
        ? monitorName !== ""
        : selectedType === "peripheral" && peripheralName !== ""
    ) {
      setLoading(true);
      const category = "laptop";

      async function promise() {
        try {
          let status;

          if (selectedType === "laptop") {
            status = await updateLaptopData();
          } else if (selectedType === "monitor") {
            status = await updateMonitor();
          } else if (selectedType === "peripheral") {
            status = await updatePeripheral();
          } else {
            console.log("empty selected type");
          }

          await fetchEmployee({ category });

          if (status && status.success) {
            return "Successfully Updated Asset Data";
          } else {
            throw new Error("Encountered an Error While Updating Asset");
          }
        } catch (e) {
          throw e;
        }
      }

      toast.promise(promise, {
        loading: "Updating Asset Data",
        success: (message) => {
          setLoading(false);
          handleClose();
          return `${message}`;
        },
        error: (message) => {
          setLoading(false);
          handleClose();
          return `${message}`;
        },
      });
    } else {
      toast.error("fill up fields");
    }
  };

  const handleDeleteAsset = async () => {
    if (selectedAssetData !== null) {
      setLoading(true);
      const _id = selectedAssetData._id;

      async function promise() {
        try {
          const status = await deleteAssetData(_id);

          if (status.success) {
            await setDataToDefault();
            await fetchEmployee("laptop");
            setSelectedAssetData(null);
            return "Successfully Deleted Asset";
          } else {
            throw new Error("Encountered an Error While Deleting Asset");
          }
        } catch (e) {
          throw e;
        }
      }

      toast.promise(promise, {
        loading: "Deleting Asset Data",
        success: (message) => {
          setLoading(false);
          handleClose();
          return `${message}`;
        },
        error: (message) => {
          setLoading(false);
          handleClose();
          return `${message}`;
        },
      });
    } else {
      toast.error("No asset selected to delete.");
    }
  };

  //getUsers with validation
  useEffect(() => {
    if (employeeOptions && employeeOptions.length === 0 && assetData !== null) {
      const getAllUsers = async () => {
        try {
          await fetchEmployee("laptop");
        } catch (e) {
          console.log("Error getting users");
        }
      };
      getAllUsers();
    }
  }, [employeeOptions, itemStatusOption, assetData]);

  return (
    <div>
      <div>
        <div className={`flex flex-col text-sm `}>
          <p className="flex-none font-medium px-2">Status Type</p>
          <ItemStatusOption
            statusOption={itemStatusOption}
            setStatusOption={handleSetItemStatusOption}
            from={from}
            className={"flex-1"}
          />
        </div>

        {itemStatusOption !== "" && (
          <>
            <Divider className="my-2 bg-a-lightgrey" />
          </>
        )}

        <div>
          {itemStatusOption === "Active" || itemStatusOption === "SOH" ? (
            <>
              <div className="flex justify-center text-lg font-bold pb-2">
                <p>Asset Information</p>
              </div>
              {selectedType === "laptop" ? (
                <LaptopInputForms
                  selectedType={selectedType}
                  itemStatusOption={itemStatusOption}
                  employeeOptions={employeeOptions}
                />
              ) : selectedType === "monitor" ? (
                <MonitorInputForms
                  selectedType={selectedType}
                  itemStatusOption={itemStatusOption}
                  employeeOptions={employeeOptions}
                />
              ) : (
                selectedType === "peripheral" && (
                  <PeripheralInputForms
                    selectedType={selectedType}
                    itemStatusOption={itemStatusOption}
                    employeeOptions={employeeOptions}
                  />
                )
              )}
            </>
          ) : (
            (itemStatusOption === "Update" ||
              itemStatusOption === "Repair" ||
              itemStatusOption === "Irreperable" ||
              itemStatusOption === "Transfer") &&
            (selectedType === "laptop" ? (
              <UpdateLaptopInputForms
                selectedType={selectedType}
                itemStatusOption={itemStatusOption}
                employeeOptions={employeeOptions}
                from={from}
              />
            ) : selectedType === "monitor" ? (
              <UpdateMonitorInputForms
                selectedType={selectedType}
                itemStatusOption={itemStatusOption}
                employeeOptions={employeeOptions}
                from={from}
              />
            ) : (
              selectedType === "peripheral" && (
                <UpdatePeripheralInputForms
                  selectedType={selectedType}
                  itemStatusOption={itemStatusOption}
                  employeeOptions={employeeOptions}
                  from={from}
                />
              )
            ))
          )}
        </div>
      </div>
      <div className="w-full flex flex-row gap-2 justify-end py-2 pt-4">
        {itemStatusOption === "SOH" || itemStatusOption === "Active" ? (
          <div className="">
            <Button
              type="button"
              onClick={() => handlesave()}
              className="rounded-md bg-a-blue text-a-white px-12"
            >
              SAVE
            </Button>
          </div>
        ) : (
          !viewAssetHistory &&
          itemStatusOption !== "NONE" &&
          selectedAssetData !== null && (
            <div className="flex flex-row gap-2">
              <Button
                type="submit"
                className="rounded-md bg-a-blue text-a-white px-12"
                onClick={handleUpdate}
              >
                Update
              </Button>
              <Button
                type="button"
                className={`rounded-md bg-a-red text-a-white px-12 ${
                  itemStatusOption === "Transfer" && "hidden"
                }`}
                onClick={handleConfirmationModal}
              >
                Delete
              </Button>
            </div>
          )
        )}
      </div>

      <ConfirmationModal
        isOpen={isConfirmationModal}
        onClose={handleConfirmationModal}
        message={
          <p>
            Are you sure you want to delete
            <span className="font-bold capitalize">
              {" "}
              {selectedAssetData?.item}{" "}
            </span>
            Asset?
          </p>
        }
        header={"Confirm Delete"}
        action={handleDeleteAsset}
      />
    </div>
  );
};

export default AllAssets;
