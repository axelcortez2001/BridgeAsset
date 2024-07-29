import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
const BranchDropDown = () => {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["None"]));
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  const handleSelectedKeys = (stat) => {
    setSelectedKeys(stat);
  };
  return (
    <div className='flex flex-col'>
      <p className='text-sm text-gray-500'>Branch</p>
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
          <DropdownItem key='Australia'>Australia</DropdownItem>
          <DropdownItem key='Makati'>Makati</DropdownItem>
          <DropdownItem key='Laoag'>Laoag</DropdownItem>
          <DropdownItem key='None'>None</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default BranchDropDown;
