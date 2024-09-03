import React, { useState, useEffect } from "react";
import AssetLoading from "../../LoadingComponents/AssetLoading";
import { Tab, Tabs } from "@nextui-org/react";
import AllComponent from "./AllComponents/AllComponent";
import LaptopComponent from "./LaptopComponents/LaptopComponent";
import MonitorComponent from "./MonitorComponents/MonitorComponent";
import PeripheralComponent from "./PeripheralComponents/PeripheralComponent";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  expandIndexAtom,
  tabLocationAtom,
} from "./AllComponents/Charts/AllComponentsStore";
import { dashBoardDataAtom } from "../DashboardStore/MainStore";

const DashboardHome = () => {
  const dashboardData = useAtomValue(dashBoardDataAtom);
  const [tabLocation, setTabLocation] = useAtom(tabLocationAtom);
  const [filteredData, setFileteredData] = useState([]);
  const setExpandIndex = useSetAtom(expandIndexAtom);
  const handleChange = (e) => {
    setExpandIndex(null);
    setTabLocation(e);
  };
  const [allData, setAllData] = useState([]);
  const [laptopData, setLaptopData] = useState([]);
  const [monitorData, setMonitorData] = useState([]);
  const [peripheralData, setPeripheralData] = useState([]);

  useEffect(() => {
    const handleFilterData = () => {
      if (dashboardData) {
        if (tabLocation !== "All") {
          const filtered = dashboardData.filter(
            (data) => data?.category.toLowerCase() === tabLocation.toLowerCase()
          );
          setFileteredData(filtered);
        } else {
          setAllData(dashboardData);
        }
      }
    };
    handleFilterData();
  }, [tabLocation, dashboardData]);

  return (
    <div className='w-full h-screen  flex items-start justify-start flex-col p-2 gap-4'>
      <div className='w-full sticky top-0'>
        <Tabs onSelectionChange={handleChange}>
          <Tab title='All' key='All' />
          <Tab title='Laptop' key='Laptop' />
          <Tab title='Monitor' key='Monitor' />
          <Tab title='Peripheral' key='Peripheral' />
        </Tabs>
      </div>
      <div className='w-full'>
        {(filteredData && filteredData?.length > 0) ||
        (dashboardData && dashboardData?.length > 0) ? (
          tabLocation === "All" ? (
            allData && <AllComponent dashboardData={allData} />
          ) : tabLocation === "Laptop" ? (
            <LaptopComponent dashboardData={filteredData} />
          ) : tabLocation === "Monitor" ? (
            <MonitorComponent dashboardData={filteredData} />
          ) : (
            tabLocation === "Peripheral" && (
              <PeripheralComponent dashboardData={filteredData} />
            )
          )
        ) : (
          <div>No data available</div>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
