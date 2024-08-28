import React, { useState, useEffect } from "react";
import AssetLoading from "../../LoadingComponents/AssetLoading";
import { Tab, Tabs } from "@nextui-org/react";
import AllComponent from "./AllComponents/AllComponent";
import LaptopComponent from "./LaptopComponents/LaptopComponent";
import MonitorComponent from "./MonitorComponents/MonitorComponent";
import PeripheralComponent from "./PeripheralComponents/PeripheralComponent";

const DashboardHome = ({ dashboardData }) => {
  const [tabLocation, setTabLocation] = useState("All");
  const [filteredData, setFileteredData] = useState([]);
  const handleChange = (e) => {
    setTabLocation(e);
  };

  useEffect(() => {
    const handleFilterData = () => {
      if (dashboardData) {
        if (tabLocation !== "All") {
          const filtered = dashboardData.filter(
            (data) => data?.category.toLowerCase() === tabLocation.toLowerCase()
          );
          setFileteredData(filtered);
        } else {
          setFileteredData(dashboardData);
        }
      }
    };
    handleFilterData();
  }, [tabLocation]);

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
        {filteredData && filteredData?.length > 0 ? (
          tabLocation === "All" ? (
            <AllComponent dashboardData={filteredData} />
          ) : tabLocation === "Laptop" ? (
            <LaptopComponent dashboardData={filteredData} />
          ) : tabLocation === "Monitor" ? (
            <MonitorComponent dashboardData={filteredData} />
          ) : (
            <PeripheralComponent dashboardData={filteredData} />
          )
        ) : (
          <div>No data available</div>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
