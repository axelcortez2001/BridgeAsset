import React from "react";
import LaptopTableGateWay from "./LaptopTableGateWay";
import MonitorTableGateWay from "./MonitorTableGateWay";
import PeripheralTableGateWay from "./PeripheralTableGateWay";

const TableGateWay = ({
  assetData,
  setActionStatus,
  actionStatus,
  assetLoading,
  selectedType,
}) => {
  return (
    <div className='flex flex-col w-full'>
      {selectedType === "laptop" ? (
        <LaptopTableGateWay
          assetData={assetData}
          setActionStatus={setActionStatus}
          actionStatus={actionStatus}
          assetLoading={assetLoading}
        />
      ) : selectedType === "monitor" ? (
        <MonitorTableGateWay
          assetData={assetData}
          setActionStatus={setActionStatus}
          actionStatus={actionStatus}
          assetLoading={assetLoading}
        />
      ) : (
        selectedType === "peripheral" && (
          <PeripheralTableGateWay
            assetData={assetData}
            setActionStatus={setActionStatus}
            actionStatus={actionStatus}
            assetLoading={assetLoading}
          />
        )
      )}
    </div>
  );
};

export default TableGateWay;
