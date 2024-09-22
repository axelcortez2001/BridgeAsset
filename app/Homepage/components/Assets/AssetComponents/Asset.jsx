import React from "react";
import AssetDropDown from "../AssetOtherComponents/AssetDropDown";
import Laptops from "../Laptop/Laptops";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  handleReturnEmployeesDefaultAtom,
  selectedTypeAtom,
} from "@/app/Homepage/AssetStore";
import Monitor from "../Monitor/Monitor";
import Peripherals from "../Peripherals/Peripherals";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

const AddAsset = ({ setActionStatus, actionStatus, isOpen, onclose }) => {
  //category selection state management
  const [selectedType, setSelectedType] = useAtom(selectedTypeAtom);
  const setEmployeesToDefault = useSetAtom(handleReturnEmployeesDefaultAtom);
  const handleSelectedType = (opt) => {
    setEmployeesToDefault();
    setSelectedType(opt);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => onclose()}>
        <ModalContent>
          <ModalHeader>header</ModalHeader>
          <ModalBody>
            {selectedType === "laptop" ? (
              <Laptops
                selectedType={selectedType}
                actionStatus={actionStatus}
                setActionStatus={setActionStatus}
              />
            ) : selectedType === "monitor" ? (
              <Monitor
                selectedType={selectedType}
                actionStatus={actionStatus}
                setActionStatus={setActionStatus}
              />
            ) : (
              <Peripherals
                selectedType={selectedType}
                actionStatus={actionStatus}
                setActionStatus={setActionStatus}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddAsset;
