import React from "react";
import { Select, SelectItem, Avatar } from "@nextui-org/react";
import {
  peripheralStatusData,
  peripheralTypeData,
} from "../Store/PeripheralStore";
const PeripheralTypeDropdown = ({ peripheralType, setPeripheralType }) => {
  const peripheralData = peripheralTypeData;
  return (
    <Select
      variant='bordered'
      label='Select Type'
      className='w-60'
      size='sm'
      selectedKeys={[peripheralType]}
    >
      <SelectItem
        key='Mouse'
        textValue='Mouse'
        onClick={() => setPeripheralType("Mouse")}
      >
        <div className='flex'>
          <img
            alt='Mouse'
            className='flex-shrink-0 h-5 w-5 mr-4'
            src='/mouse.png'
          />
          <div className='flex flex-col'>
            <span className='text-small'>Mouse</span>
          </div>
        </div>
      </SelectItem>
      <SelectItem
        key='Keyboard'
        textValue='Keyboard'
        onClick={() => setPeripheralType("Keyboard")}
      >
        <div className='flex'>
          <img
            alt='Keyboard'
            className='flex-shrink-0 h-5 w-5 mr-4'
            src='/keyboard.png'
          />
          <div className='flex flex-col'>
            <span className='text-small'>Keyboard</span>
          </div>
        </div>
      </SelectItem>
      <SelectItem
        key='Headset'
        textValue='Headset'
        onClick={() => setPeripheralType("Headset")}
      >
        <div className='flex'>
          <img
            alt='Headset'
            className='flex-shrink-0 h-5 w-5 mr-4'
            src='/headset.png'
          />
          <div className='flex flex-col'>
            <span className='text-small'>Headset</span>
          </div>
        </div>
      </SelectItem>
      <SelectItem
        key='Others'
        textValue='Others'
        onClick={() => setPeripheralType("Others")}
      >
        <div className='flex'>
          <img
            alt='Others'
            className='flex-shrink-0 h-5 w-5 mr-4'
            src='/ellipsis.png'
          />
          <div className='flex flex-col'>
            <span className='text-small'>Others</span>
          </div>
        </div>
      </SelectItem>
    </Select>
  );
};

export default PeripheralTypeDropdown;
