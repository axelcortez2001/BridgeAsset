import React from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import { IoMdExpand } from "react-icons/io";
import ExpandGatewayModal from "./ExpandGatewayModal";
const ExpandGateway = ({
  chartTitle,
  chartData,
  options,
  type,
  middleContent,
  isOpen,
  onClose,
}) => {
  return (
    <div className="relative w-full h-full flex flex-row justify-between items-center">
      <div className="w-full">
        <p className="w-full font-bold tracking-wide ss:text-lg">
          {chartTitle}
        </p>
      </div>
      {middleContent && (
        <div className="mr-24 w-full">
          <div>{middleContent}</div>
        </div>
      )}
      <div>
        <Button
          isIconOnly
          variant="light"
          onClick={onClose}
          className="absolute top-0 right-0"
        >
          <IoMdExpand size={20} title="Expand" />
        </Button>
      </div>
      
      <ExpandGatewayModal
        isOpen={isOpen}
        onClose={onClose}
        chartData={chartData}
        options={options}
        type={type}
        chartTitle={chartTitle}
      />
    </div>
  );
};

export default ExpandGateway;
