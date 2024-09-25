import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useState } from "react";

const DropdownFilter = ({ item1Values }) => {
  const [selectedTypeFilter, setSelectedTypeFilter] = useState(
    new Set(["All"])
  );

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered" size="sm" className="w-full border-a-black/80">{selectedTypeFilter}</Button>
        </DropdownTrigger>
        <DropdownMenu
          defaultSelectedKeys={selectedTypeFilter}
          selectedKeys={selectedTypeFilter}
          selectionMode="single"
          onSelectionChange={setSelectedTypeFilter}
          disallowEmptySelection
          variant="flat"
        >
          {item1Values?.map((item) => (
            <DropdownItem onClick={item.action} key={item.value}>
              {item.value}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default DropdownFilter;
