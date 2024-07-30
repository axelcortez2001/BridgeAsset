import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { laptopStatusData } from "../Store/LaptopStore";
const StatusOption = ({ status, setStatus }) => {
  const statusOption = laptopStatusData;
  return (
    <div className='flex flex-col'>
      <p className='text-sm text-gray-500'>Status</p>
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant='bordered'
            className={`${status.color} capitalize text-white`}
          >
            {status.name}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label='Single selection example'
          variant='flat'
          disallowEmptySelection
          selectionMode='single'
        >
          {statusOption.map((statusData) => (
            <DropdownItem
              key={statusData.id}
              className={`${statusData.color} text-white`}
              onClick={() => setStatus(statusData)}
            >
              {statusData.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default StatusOption;
