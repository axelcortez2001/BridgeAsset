import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
} from "@nextui-org/react";
import CustomChart from "../ChartComponents/CustomChart";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { isBranchOpenAtom, selectedValueDataAtom } from "./ExpandStore";
import {
  globalActionStatusAtom,
  sideBarLocation,
} from "@/app/Homepage/AssetStore";
import Table from "../../../Assets/TableComponents/Table";
import AddAsset from "../../../Assets/AssetComponents/Asset";
const ExpandGatewayModal = ({
  isOpen,
  onClose,
  chartData,
  options,
  type,
  chartTitle,
}) => {
  const [valueData, setValueData] = useAtom(selectedValueDataAtom);
  const setActionStatus = useSetAtom(globalActionStatusAtom);
  const [isAddModal, setAddModal] = useState(false);

  const handleAddModal = () => {
    setAddModal((prev) => !prev);
  };

  const handleActionStatus = () => {
    handleAddModal();
    setActionStatus(true);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => onClose()}
        className="!m-0 overflow-hidden rounded-md pb-2"
      >
        <ModalContent className="min-w-[90%] h-[calc(100%-80px)]">
          <ModalHeader className="flex flex-col justify-center w-full h-[40px] border-b border-a-grey bg-a-lightgrey">
            {chartTitle}
          </ModalHeader>
          <ModalBody className="flex lg:flex-row w-full gap-2 p-0 md:p-2 overflow-y-auto">
            <div
              className={` w-full ${
                valueData !== null
                  ? `h-[calc(50%-8px)] lg:h-full ${
                      type === "Pie"
                        ? "lg:w-[calc(32%-9px)]"
                        : "lg:w-[calc(40%-9px)]"
                    }
                `
                  : "h-full"
              } flex-none flex items-center justify-center`}
            >
              <CustomChart
                chartData={chartData}
                options={options}
                type={type}
                className={`${type === "Pie" && "max-h-[76%] max-w-[76%]"} ${
                  type === "Line" && "max-h-[80%] max-w-[80%]"
                }`}
              />
            </div>

            {valueData !== null && (
              <>
                <div className="lg:h-full lg:py-8 px-4 lg:px-0">
                  <Divider orientation="vertical" className="hidden lg:block" />
                  <Divider
                    orientation="horizontal"
                    className="block lg:hidden"
                  />
                </div>
                <div
                  className={`p-4 flex-initial h-[calc(50%-4px)] lg:h-full w-full ${
                    type === "Pie"
                      ? "lg:w-[calc(68%-9px)]"
                      : "lg:w-[calc(60%-9px)]"
                  } `}
                >
                  <div className="flex flex-row items-center">
                    <p className={`tracking-widest font-bold p-2`}>
                      {valueData?.label.toUpperCase()}
                    </p>
                  </div>

                  <div className="text-sm">
                    <Table
                      assetData={valueData?.data}
                      setActionStatus={handleActionStatus}
                    />
                  </div>
                </div>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      <AddAsset isOpen={isAddModal} onclose={handleAddModal} />
    </>
  );
};

export default ExpandGatewayModal;
