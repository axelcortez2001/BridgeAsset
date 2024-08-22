import { selectedAssetDataAtom } from "@/app/Homepage/AssetStore";
import { useAtomValue } from "jotai";
import React from "react";
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
import AssetHistoryData from "./AssetHistoryData";
import UserAssetHistory from "./UserAssetHistory";
import AssetModalData from "./AssetModalData";
const ViewModal = ({ isOpen, onOpenChange, asset, selectAsset }) => {
  const selectedAssetData = useAtomValue(selectedAssetDataAtom);
  const history = asset?.asset_history;
  const userHistory = asset?.asset_holder_history;
  
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size='4xl'
      className='min-h-[500px]'
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1 text-xl font-bold'>
              {asset?.item}
            </ModalHeader>
            <ModalBody>
              <div className='w-full flex flex-col gap-5 max-h-screen overflow-y-auto'>
                <Tabs>
                  <Tab key='data' title='Asset Data'>
                    <AssetModalData asset={asset} />
                  </Tab>
                  <Tab key='histoy' title='Asset History'>
                    <div className='w-full h-full max-h-screen overflow-y-auto p-2 '>
                      <div className='border rounded-md p-2'>
                        <Tabs aria-label='Options'>
                          <Tab key='Asset History' title='Asset History'>
                            <AssetHistoryData history={history} />
                          </Tab>
                          <Tab key='User History' title='User History'>
                            <UserAssetHistory userHistory={userHistory} />
                          </Tab>
                        </Tabs>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
                <Button className='w-32' onClick={selectAsset}>
                  Update asset
                </Button>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color='danger' variant='light' onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ViewModal;
