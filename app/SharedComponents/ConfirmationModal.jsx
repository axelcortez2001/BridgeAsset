import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

const ConfirmationModal = ({ isOpen, onClose, message, header, action }) => {
  return (
    <div>
      <Modal isOpen={isOpen} onClose={() => onClose()}>
        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalBody>{message}</ModalBody>
          <ModalFooter>
            <div className="flex gap-2">
              <Button
                className="text-a-white bg-a-blue"
                onPress={() => action()}
              >
                Confirm
              </Button>
              <Button
                className="text-a-white bg-a-red"
                onPress={() => onClose()}
              >
                Cancel
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ConfirmationModal;
