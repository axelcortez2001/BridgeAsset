import React from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import { IoMdExpand } from "react-icons/io";
import ExpandGatewayModal from "./ExpandGatewayModal";
const ExpandGateway = ({
  chartTitle,
  chartData,
  options,
  type,
  isOpen,
  onOpen,
  onOpenChange,
  handleModal,
}) => {
  return (
    <div className='w-full flex flex-row justify-between'>
      <p>{chartTitle}</p>
      <IoMdExpand
        size={20}
        title='Expand'
        className='hover:cursor-pointer hover:bg-gray-200'
        onClick={handleModal}
      />
      <ExpandGatewayModal
        onOpen={onOpen}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className='p-2 max-h-screen'
        chartData={chartData}
        options={options}
        type={type}
        chartTitle={chartTitle}
      />
    </div>
  );
};

export default ExpandGateway;
