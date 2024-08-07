import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { monitorStatusData } from "../Store/MonitorStore";
const MonitorStatus = ({ status, setStatus }) => {
  const statusOption = monitorStatusData;
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

export default MonitorStatus;
