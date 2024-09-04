import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import CustomChart from "../ChartComponents/CustomChart";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { isBranchOpenAtom, selectedValueDataAtom } from "./ExpandStore";
import {
  globalActionStatusAtom,
  sideBarLocation,
} from "@/app/Homepage/AssetStore";
import Table from "../../../Assets/TableComponents/Table";
const ExpandGatewayModal = ({
  isOpen,
  onOpen,
  onOpenChange,
  chartData,
  options,
  type,
  chartTitle,
}) => {
  const [valueData, setValueData] = useAtom(selectedValueDataAtom);
  const setActionStatus = useSetAtom(globalActionStatusAtom);
  const setSideBar = useSetAtom(sideBarLocation);
  const setIsBranchOpen = useSetAtom(isBranchOpenAtom);

  // Detect if modal was closed unexpectedly.
  useEffect(() => {
    if (!isOpen) {
      if (valueData?.location === "branch") {
        setValueData(null);
        setIsBranchOpen(false);
      }
    }
  }, [isOpen, setValueData, setIsBranchOpen]);
  const handleActionStatus = () => {
    onOpenChange(false);
    setValueData(null);
    setSideBar("assets");
    setActionStatus(true);
    setIsBranchOpen(false);
  };
  const handleClose = () => {
    onOpenChange(false);
    setValueData(null);
    setIsBranchOpen(false);
  };
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      className='max-h-[95%] overflow-y-auto min-w-[60%] w-auto max-w-[90%]'
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1 sticky top-0 w-full bg-white'>
              {chartTitle}
            </ModalHeader>

            <ModalBody>
              <div className='flex flex-col border items-center  p-2'>
                <div className='border flex items-center justify-center w-1/2 max-h-[400px]'>
                  <CustomChart
                    chartData={chartData}
                    options={options}
                    type={type}
                  />
                </div>
                {valueData !== null && (
                  <>
                    <p className='capitalize mt-3 text-xl font-bold'>
                      {valueData?.label}
                    </p>
                    <div className='mt-4 p-2 text-xs w-full max-h-[500px] overflow-y-auto'>
                      <Table
                        assetData={valueData?.data}
                        setActionStatus={handleActionStatus}
                      />
                    </div>
                  </>
                )}
              </div>
            </ModalBody>
            <ModalFooter className='sticky bottom-0'>
              <Button color='danger' variant='light' onPress={handleClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ExpandGatewayModal;
