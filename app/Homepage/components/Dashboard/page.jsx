"use client";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";

import {
  dashBoardDataAtom,
  fetchDashboardDataAtom,
} from "./DashboardStore/MainStore";
import DashboardHome from "./DashboardComponents/DashboardHome";
import AssetLoading from "../LoadingComponents/AssetLoading";
import { updateStatusAtom } from "../../AssetStore";

const Dashboard = ({ isSideNavBar, setSideNavBar }) => {
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const fetchDashBoard = useSetAtom(fetchDashboardDataAtom);
  const [updateStatus, setUpdateStatus] = useAtom(updateStatusAtom);
  const dashboardData = useAtomValue(dashBoardDataAtom);

  useEffect(() => {
    const getDashboardData = async () => {
      if (dashboardData === null || updateStatus === true) {
        console.log("Trigger main event");
        setDashboardLoading(true);
        try {
          const res = await fetchDashBoard();
          console.log("res: ", res);
          if (res?.success) {
            console.log("Response: ", res?.message);
          } else {
            console.log("Response: ", res?.error);
          }
        } catch (error) {
          console.log("Error: ", error);
        } finally {
          setDashboardLoading(false);
          setUpdateStatus(false);
        }
      }
    };
    getDashboardData();
  }, [dashboardData]);

  return dashboardLoading ? (
    <AssetLoading />
  ) : dashboardData && dashboardData?.length <= 0 ? (
    <div>No Data Available</div>
  ) : (
    <div className="h-full w-full">
      <DashboardHome
        dashboardLoading={dashboardLoading}
        isSideNavBar={isSideNavBar}
        setSideNavBar={setSideNavBar}
      />
    </div>
  );
};

export default Dashboard;
