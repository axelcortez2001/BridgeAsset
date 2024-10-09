import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { addSupplier, supplierData } from "@/app/Homepage/AssetStore";
import { useAtomValue, useSetAtom } from "jotai";
const LaptopSupplierDropDown = ({ supplier, setSupplier, isDisabled }) => {
  const suppliers = useAtomValue(supplierData);
  const newSupplier = useSetAtom(addSupplier);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");

  const [select, setSelect] = useState(new Set([supplier?.name]));

  const [isAddSupplier, setAddSupplier] = useState(false);

  const handleAddSupplierModal = () => {
    setAddSupplier((prev) => !prev);
    setSelect([]);
  };

  const clearModalFields = () => {
    setName("");
    setAddress("");
    setContact("");
    setEmail("");
  };

  const handleAddSupplier = () => {
    if (name !== "" && address !== "" && contact !== "" && email !== "") {
      const data = {
        name: name,
        address: address,
        contact: contact,
        email: email,
      };
      clearModalFields();
      handleAddSupplierModal();
      newSupplier(data);
    } else {
      alert("All fields are required");
    }
  };

  const defaultSupplier = () => {
    return suppliers.filter((sup) => sup.name === "Default");
  };

  return (
    <>
      <Select
        selectedKeys={select}
        onSelectionChange={setSelect}
        placeholder="Add Supplier"
        classNames={{ trigger: "h-[48px] rounded-lg" }}
        aria-label="selectOption"
      >
        {suppliers.map((sup) => (
          <SelectItem
            className="h-[40px]"
            key={sup.name}
            onClick={() => setSupplier(sup)}
          >
            {sup.name}
          </SelectItem>
        ))}
        <SelectItem
          textValue="Add New"
          key={" "}
          onClick={handleAddSupplierModal}
          className="h-[40px] bg-a-blue text-a-white"
        >
          Add New Supplier
        </SelectItem>
      </Select>

      <Modal isOpen={isAddSupplier} onClose={handleAddSupplierModal}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Add New Supplier
          </ModalHeader>
          <ModalBody>
            <Input
              isRequired
              type="text"
              label="Name"
              size={"sm"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className=" w-full"
            />
            <Input
              isRequired
              type="text"
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              size={"sm"}
              className=" w-full"
            />{" "}
            <Input
              isRequired
              type="text"
              label="Contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              size={"sm"}
              className=" w-full"
            />{" "}
            <Input
              isRequired
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size={"sm"}
              className=" w-full"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={handleAddSupplierModal}
            >
              Close
            </Button>
            <Button color="primary" onPress={() => handleAddSupplier()}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LaptopSupplierDropDown;
