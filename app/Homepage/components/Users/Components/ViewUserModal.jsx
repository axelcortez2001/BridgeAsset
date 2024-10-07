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
  Image,
  Tab,
  Divider,
} from "@nextui-org/react";
import UserDetails from "./UserDetails";
import UserHistory from "./UserHistory";

const ViewUserModal = ({ isOpen, onClose, user }) => {
  const userDetails = (
    <>
      <div className="p-2 flex flex-row gap-2 items-center">
        <Image
          src={user?.picture}
          alt="user picture"
          className="rounded-full h-[40px] w-[40px]"
        />
        <div className="flex flex-col leading-none">
          <p className="text-lg font-medium">{user?.name}</p>
          <p className="-mt-[4px] text-a-blue">{user?.email}</p>
        </div>
      </div>
      <Divider className="my-[1px]" />
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onClose()}
      className="min-w-[80%] md:min-w-[50%] max-h-[80%] p-0"
    >
      <ModalContent>
        <ModalHeader className="flex items-center border-b border-a-grey bg-a-lightgrey h-[40px]">
          <p>User&apos;s Asset Details </p>
        </ModalHeader>
        <ModalBody className="overflow-y-auto">
          {userDetails}

          <Tabs
            classNames={{
              tabList: "w-full p-[2px]",
              panel: "p-0",
            }}
          >
            <Tab key="Details" title="Details">
              <UserDetails userData={user} />
            </Tab>
            <Tab key="History Details" title="History Details">
              <UserHistory userData={user} />
            </Tab>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ViewUserModal;
