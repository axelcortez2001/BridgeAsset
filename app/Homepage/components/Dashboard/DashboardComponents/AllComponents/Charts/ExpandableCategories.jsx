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

const ExpandableCategories = ({
  isOpen,
  onOpen,
  onOpenChange,
  chartData,
  data,
}) => {
  const [expandIndex, setExpandIndex] = useAtom(expandIndexAtom);
  const [filteredData, setFilteredData] = useState(null);
  const [actionStatus, setActionStatus] = useAtom(globalActionStatusAtom);
  const tabLocation = useAtomValue(tabLocationAtom);
  const [tabLocationState, setTabLocationState] = useState(tabLocation);
  const setSideBar = useSetAtom(sideBarLocation);
  const handleActionStatus = (stat) => {
    onOpenChange(false);
    setSideBar("assets");
    setActionStatus(!stat);
  };

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
        console.log("Filtered data: ", filterD);
        setFilteredData(filterD);
        setTabLocationState(tabLocation);
      }
    };
    triggerFunctions();
  }, [filteredData, tabLocation, data]);

  const returnText = indexDir.find((ind) => ind.id === expandIndex)?.name;

  const handleCloseModal = () => {
    setExpandIndex(null);
    onOpenChange(false);
  };
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className='max-h-[95%] overflow-y-auto max-w-[90%]'
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1 sticky top-0 w-full bg-white'>
              Asset Categories
            </ModalHeader>
            <ModalBody>
              <div className='border rounded-md p-2 flex w-full flex-col items-center justify-start'>
                <div className='w-3/4'>
                  <AllComponentsGateway
                    chartData={chartData}
                    chartOpen={true}
                  />
                </div>

                {expandIndex !== null && (
                  <>
                    <div className='w-full flex flex-col'>
                      <p>Informations</p>
                    </div>
                    <div className='max-w-full'>
                      <div className='w-full flex flex-col items-center mt-3 border '>
                        <div className='w-full border'>
                          <div>
                            <p>Laptop</p>
                            <div className='text-xs'>
                              <Table
                                assetData={filteredData?.laptop?.[returnText]}
                                setActionStatus={handleActionStatus}
                              />
                            </div>
                          </div>
                        </div>

                        <div className='w-full border'>
                          <div>
                            <p>Monitor</p>
                            <div className='text-xs'>
                              <Table
                                assetData={filteredData?.monitor?.[returnText]}
                                setActionStatus={handleActionStatus}
                              />
                            </div>
                          </div>
                        </div>

                        <div className='w-full border'>
                          <div>
                            <p>Peripheral</p>
                            <div className='text-xs'>
                              <Table
                                assetData={
                                  filteredData?.peripheral?.[returnText]
                                }
                                setActionStatus={handleActionStatus}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </ModalBody>
            <ModalFooter className='sticky bottom-0'>
              <Button color='danger' variant='light' onPress={handleCloseModal}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ExpandableCategories;
