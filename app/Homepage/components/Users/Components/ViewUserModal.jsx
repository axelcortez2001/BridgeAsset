import React from "react";
import {
  Avatar,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tabs,
  Tab,
} from "@nextui-org/react";
import UserDetails from "./UserDetails";
import UserHistory from "./UserHistory";
const ViewUserModal = ({ isOpen, onClose, user }) => {
  return (
    <Modal isOpen={isOpen} onClose={() => onClose()} size="xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex w-full items-center gap-3">
            <Avatar src={user?.picture} />
            {user.name}
          </div>
        </ModalHeader>
        <ModalBody>
          <Tabs>
            <Tab key="Details" title="Details">
              <UserDetails userData={user} />
            </Tab>
            <Tab key="History Details" title="History Details">
              <UserHistory userData={user} />
            </Tab>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={() => onClose()}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ViewUserModal;
