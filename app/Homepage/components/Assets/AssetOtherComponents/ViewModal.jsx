import { selectedAssetDataAtom } from "@/app/Homepage/AssetStore";
import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Tabs,
  Tab,
} from "@nextui-org/react";
import AssetModalData from "./AssetModalData";
import { editIcon } from "@/public/Icon";
import AssetHistory from "./AssetHistory";
import AddAsset from "../AssetComponents/Asset";
const ViewModal = ({ isOpen, onClose, asset, handleSelectAsset }) => {
  const selectedAssetData = useAtomValue(selectedAssetDataAtom);
  const history = asset?.asset_history;
  const userHistory = asset?.asset_holder_history;

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => onClose()} className="rounded-lg">
        <ModalContent className="min-w-[80%] md:min-w-[50%] h-full max-h-[728px]">
          <ModalHeader className="flex flex-row items-center justify-between bg-a-lightgrey h-[40px] border-b border-a-grey">
            <p className="tracking-widest font-bold">
              {asset?.item.toUpperCase()}
            </p>
            <Button
              isIconOnly
              // onClick={selectAsset}
              onClick={handleSelectAsset}
              variant="light"
              className="mr-4"
            >
              {editIcon("text-h-darkgrey")}
            </Button>
          </ModalHeader>
          <ModalBody className="p-4 pb-6 overflow-y-auto h-full">
            <Tabs
              aria-label="assetOptions"
              classNames={{
                tabList: "w-full",
                panel:
                  "p-0 overflow-y-auto h-full flex items-center justify-center",
              }}
            >
              <Tab key="data" title="Asset Data">
                <div className="h-full w-full">
                  <AssetModalData asset={asset} />
                </div>
              </Tab>
              <Tab key="histoy" title="Asset History">
                <div className="h-full w-full">
                  <AssetHistory history={history} type={"asset"} />
                </div>
              </Tab>
              <Tab key={"userHistory"} title="User History">
                <AssetHistory history={userHistory} type={"user"} />
              </Tab>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewModal;
