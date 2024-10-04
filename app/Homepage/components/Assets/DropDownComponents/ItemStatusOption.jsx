import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  selectedAssetDataAtom,
  selectedTypeAtom,
} from "@/app/Homepage/AssetStore";
const ItemStatusOption = ({
  statusOption,
  setStatusOption,
  className,
  from,
}) => {
  const selectedType = useAtomValue(selectedTypeAtom);
  const setSelectedAssetData = useSetAtom(selectedAssetDataAtom);

  const handleSelect = (opt) => {
    setStatusOption(opt);
  };

  const itemOption = [
    {
      key: "soh",
      title: "Add Stock on Hand",
      action: () => handleSelect("SOH"),
      className: from === "modal" && "hidden",
    },
    {
      key: "active",
      title: "Add Active Asset",
      action: () => handleSelect("Active"),
      className: from === "modal" && "hidden",
    },
    {
      key: "transfer",
      title: "Transfer Asset",
      action: () => handleSelect("Transfer"),
    },
    {
      key: "update",
      title: "Update Asset",
      action: () => handleSelect("Update"),
    },
  ];

  const [selectedKey, setSelectedKeys] = useState(
    new Set([`${from === "modal" ? "update" : ""}`])
  );

  return (
    <Select
      disallowEmptySelection
      placeholder="Select Status Type"
      classNames={{ trigger: "h-[48px] bg-a-lightgrey rounded-lg" }}
      aria-label="selectOption"
      selectedKeys={selectedKey}
      onSelectionChange={setSelectedKeys}
    >
      {itemOption.map((item, index) => (
        <SelectItem
          className={`h-[40px] ${item.className}`}
          key={item.key}
          value={item.key}
          onPress={item.action}
        >
          {item.title}
        </SelectItem>
      ))}
    </Select>
  );
};

export default ItemStatusOption;
