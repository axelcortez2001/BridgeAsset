import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { format } from "date-fns";
const ViewUserAssetHistoryModal = ({ selectedHistory }) => {
  const formatDate = (opt) => {
    let formattedDate = format(new Date(opt), "MMM d, yyyy");
    return formattedDate;
  };
  console.log(selectedHistory);
  return (
    <>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              User History
            </ModalHeader>
            <ModalBody className='overflow-y-auto'>
              <div>
                <div
                  className='flex flex-col
                 w-full'
                >
                  <div className='flex gap-2 items-center  w-full'>
                    <img
                      src={selectedHistory.picture}
                      alt='user'
                      className='rounded-full h-8 w-8'
                    />
                    <div className='w-full pl-3'>
                      <p className='font-semibold'>{selectedHistory?.name}</p>
                      <p className='text-blue-400'>{selectedHistory?.email}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                Date Received: {formatDate(selectedHistory?.date_received)}
              </div>
              <div>
                Date Returned: {formatDate(selectedHistory?.date_return)}
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
    </>
  );
};

export default ViewUserAssetHistoryModal;
