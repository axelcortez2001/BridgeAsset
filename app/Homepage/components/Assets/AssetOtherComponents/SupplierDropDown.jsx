import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { addSupplier, supplierData } from "@/app/Homepage/AssetStore";
import { useAtomValue, useSetAtom } from "jotai";

const SupplierDropDown = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const supplier = useAtomValue(supplierData);
  const newSupplier = useSetAtom(addSupplier);
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["None"]));
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  const handleSelectedKeys = (stat) => {
    setSelectedKeys(stat);
  };

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const handleAddSupplier = () => {
    if (name !== "" && address !== "" && contact !== "" && email !== "") {
      const data = {
        name: name,
        address: address,
        contact: contact,
        email: email,
      };
      newSupplier(data);
      onOpenChange(false);
    } else {
      alert("All fields are required");
    }
  };
  return (
    <div className='flex flex-col'>
      <p className='text-sm text-gray-500'>Supplier</p>
      <Dropdown>
        <DropdownTrigger>
          <Button variant='bordered' className='capitalize'>
            {selectedKeys}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label='Single selection example'
          variant='flat'
          disallowEmptySelection
          selectionMode='single'
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          {supplier.map((supplier) => (
            <DropdownItem key={supplier.name}>{supplier.name}</DropdownItem>
          ))}

          <DropdownItem key='None'>None</DropdownItem>
          <DropdownItem textValue='Add New' key={" "} onClick={onOpen}>
            Add
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Add New Supplier
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  type='text'
                  label='Name'
                  size={"sm"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className=' w-full'
                />
                <Input
                  isRequired
                  type='text'
                  label='Address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  size={"sm"}
                  className=' w-full'
                />{" "}
                <Input
                  isRequired
                  type='text'
                  label='Contact'
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  size={"sm"}
                  className=' w-full'
                />{" "}
                <Input
                  isRequired
                  type='email'
                  label='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size={"sm"}
                  className=' w-full'
                />
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
                <Button color='primary' onPress={handleAddSupplier}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SupplierDropDown;
