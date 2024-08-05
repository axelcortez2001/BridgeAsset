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

const ViewAssetHistoryModal = ({ selectedHistory }) => {
  const formatDate = (opt) => {
    let formattedDate = format(new Date(opt), "MMM d, yyyy");
    return formattedDate;
  };
  return (
    <>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              History Logs at {formatDate(selectedHistory?.date_updated)}
            </ModalHeader>
            <ModalBody className='overflow-y-auto'>
              <p>
                Current User during this log:{" "}
                <span>
                  {selectedHistory?.user_holder !== null
                    ? selectedHistory?.user_holder?.name
                    : "None"}
                </span>
              </p>
              <div>
                <p>Actions Taken: </p>
                {selectedHistory?.actions_taken !== null
                  ? selectedHistory?.actions_taken?.map((action, index) => (
                      <div key={index}>{action}.</div>
                    ))
                  : "None"}
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

export default ViewAssetHistoryModal;
