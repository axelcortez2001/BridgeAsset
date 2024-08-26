import React from "react";
import SubTableGateWay from "./SubTableGateWay";
const MonitorTableGateWay = ({
  assetData,
  setActionStatus,
  actionStatus,
  assetLoading,
}) => {
  return (
    <SubTableGateWay
      assetData={assetData}
      setActionStatus={setActionStatus}
      actionStatus={actionStatus}
      assetLoading={assetLoading}
    />
  );
};

export default MonitorTableGateWay;
