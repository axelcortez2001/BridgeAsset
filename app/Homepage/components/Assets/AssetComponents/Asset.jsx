import React, { useEffect, useState } from "react";
import AssetDropDown from "../AssetOtherComponents/AssetDropDown";
import AllAssets from "../Laptop/AllAssets";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  handleReturnEmployeesDefaultAtom,
  selectedAssetDataAtom,
  selectedTypeAtom,
} from "@/app/Homepage/AssetStore";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import {
  itemStatusOptionAtom,
  setDataToDefaultAtom,
} from "../Store/LaptopStore";
import { setMonitorDataToDefaultAtom } from "../Store/MonitorStore";
import { setPeripheralToDefault } from "../Store/PeripheralStore";

const AddAsset = ({
  setActionStatus,
  actionStatus,
  isOpen,
  onclose,
  type = "add",
  from,
  asset,
}) => {
  //category selection state management
  const selectedType = useAtomValue(selectedTypeAtom);

  const setEmployeesToDefault = useSetAtom(handleReturnEmployeesDefaultAtom);
  const setDataToDefault = useSetAtom(setDataToDefaultAtom);
  const setItemStatusOption = useSetAtom(itemStatusOptionAtom);
  const clearLaptopFields = useSetAtom(selectedAssetDataAtom);
  const clearMonitorFields = useSetAtom(setMonitorDataToDefaultAtom);
  const clearPeripheralFields = useSetAtom(setPeripheralToDefault);

  const handleClose = async () => {
    onclose();
    setTimeout(() => {
      setDataToDefault();
      setEmployeesToDefault();
      setItemStatusOption("");

      clearLaptopFields(null);
      clearMonitorFields(null);
      clearPeripheralFields(null);
    }, 200);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => handleClose()}
        className="min-w-[80%] md:min-w-[50%] max-h-[80%]"
      >
        <ModalContent>
          <ModalHeader className="h-[40px] border-b flex flex-col bg-a-lightgrey justify-center">
            <p className="capitalize">
              {type} {selectedType}
            </p>
          </ModalHeader>
          <ModalBody className="overflow-y-auto py-4">
            <AllAssets
              selectedType={selectedType}
              actionStatus={actionStatus}
              setActionStatus={setActionStatus}
              from={from}
              handleClose={() => handleClose()}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddAsset;
