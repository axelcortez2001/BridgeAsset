import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { computeStat, expandAllFiltering } from "../function";
import Table from "@/app/Homepage/components/Assets/TableComponents/Table";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { expandIndexAtom, tabLocationAtom } from "./AllComponentsStore";
import {
  globalActionStatusAtom,
  sideBarLocation,
} from "@/app/Homepage/AssetStore";
import AllComponentsGateway from "../../ChartComponents/ChartGateWay/AllComponentsGateway";
import { laptopIcon, monitorIcon, peripheralsIcon } from "@/public/Icon";

const ExpandableCategories = ({ isOpen, onClose, chartData, data }) => {
  const [expandIndex, setExpandIndex] = useAtom(expandIndexAtom);
  const [filteredData, setFilteredData] = useState(null);
  const [actionStatus, setActionStatus] = useAtom(globalActionStatusAtom);
  const tabLocation = useAtomValue(tabLocationAtom);
  const [tabLocationState, setTabLocationState] = useState(tabLocation);
  const setSideBar = useSetAtom(sideBarLocation);

  const indexDir = [
    { id: 0, name: "Stock" },
    { id: 1, name: "Active" },
    { id: 2, name: "Defective" },
    { id: 3, name: "Others" },
  ];

  useEffect(() => {
    const triggerFunctions = () => {
      if (filteredData === null) {
        const filterD = expandAllFiltering(data, expandIndex);

        setFilteredData(filterD);
        setTabLocationState(tabLocation);
      }
    };
    triggerFunctions();
  }, [filteredData, tabLocation, data]);

  const returnText = indexDir.find((ind) => ind.id === expandIndex)?.name;

  const handleCloseModal = () => {
    setExpandIndex(null);
    onClose();
  };

  const titleSharedStyle = "tracking-widest font-bold p-2";

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      className="!m-0 overflow-hidden pb-2 "
    >
      <ModalContent className="min-w-[90%] h-[calc(100%-80px)]">
        <ModalHeader className="flex flex-col justify-center w-full h-[40px] border-b border-a-grey bg-a-lightgrey">
          Asset Categories
        </ModalHeader>
        <ModalBody className="flex lg:flex-row w-full gap-2 p-0 md:p-4 overflow-y-auto">
          <div
            className={` w-full ${
              expandIndex !== null
                ? "lg:w-[calc(40%-4px)] h-[calc(50%-4px)] lg:h-full"
                : "h-full"
            } flex-none`}
          >
            <AllComponentsGateway chartData={chartData} chartOpen={true} />
          </div>
          {expandIndex !== null && (
            <div className="flex-initial w-full lg:w-[calc(60%-4px)] h-[calc(50%-4px)] lg:h-full">
              <div
                className={`text-center bg-a-lightgrey rounded-t-lg ${titleSharedStyle}`}
              >
                INFORMATION
              </div>
              <div className="p-4 space-y-4 border border-a-lightgrey">
                <div>
                  <div className="flex flex-row items-center">
                    {laptopIcon()}
                    <p className={`${titleSharedStyle}`}>LAPTOP</p>
                  </div>
                  <div className="text-sm">
                    <Table assetData={filteredData?.laptop?.[returnText]} />
                  </div>
                </div>

                <div>
                  <div className="flex flex-row items-center">
                    {monitorIcon()}
                    <p className={`${titleSharedStyle}`}>MONITOR</p>
                  </div>
                  <div className="text-sm">
                    <Table assetData={filteredData?.monitor?.[returnText]} />
                  </div>
                </div>

                <div>
                  <div className="flex flex-row items-center">
                    {peripheralsIcon()}
                    <p className={`${titleSharedStyle}`}>PERIPHERAL</p>
                  </div>
                  <div className="text-sm">
                    <Table assetData={filteredData?.peripheral?.[returnText]} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ExpandableCategories;
