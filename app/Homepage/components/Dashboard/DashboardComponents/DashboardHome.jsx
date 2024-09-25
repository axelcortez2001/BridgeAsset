import React, { useState, useEffect } from "react";
import { Listbox, ListboxItem, Skeleton, Tab, Tabs } from "@nextui-org/react";
import AllComponent from "./AllComponents/AllComponent";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  expandIndexAtom,
  tabLocationAtom,
} from "./AllComponents/Charts/AllComponentsStore";
import { dashBoardDataAtom } from "../DashboardStore/MainStore";
import DropdownFilter from "@/app/SharedComponents/DropdownFilter";
import FilteredComponents from "./FilteredComponents/FilteredComponents";

const DashboardHome = ({ isSideNavBar, setSideNavBar, dashboardLoading }) => {
  const dashboardData = useAtomValue(dashBoardDataAtom);
  const [tabLocation, setTabLocation] = useAtom(tabLocationAtom);
  const [filteredData, setFileteredData] = useState([]);
  const setExpandIndex = useSetAtom(expandIndexAtom);

  const handleChange = (e) => {
    setExpandIndex(null);
    setTabLocation(e);
    setSideNavBar(false);
  };

  const [allData, setAllData] = useState([]);

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

  const dropdownOption = [
    {
      value: "All",
      action: () => handleChange("All"),
    },
    {
      value: "Laptop",
      action: () => handleChange("Laptop"),
    },
    {
      value: "Monitor",
      action: () => handleChange("Monitor"),
    },
    {
      value: "Peripheral",
      action: () => handleChange("Peripheral"),
    },
  ];

  const sidebarNavOptions = {
    All: [
      "Cost",
      "Asset Categories",
      "Branches Asset Collection",
      "Asset Warranty Status",
      "Cost Accumulated",
    ],
    Other: [
      "Cost",
      "Status Asset Collection",
      "Branches Asset Collection",
      "Asset Warranty Status",
      "Cost Accumulated",
      "Ytd Chart Data",
    ],
  };

  const handleSideNavbarClose = () => {
    if (isSideNavBar) {
      setSideNavBar(false);
    }
  };

  return (
    <div className="w-full h-full flex items-start justify-start flex-col gap-4">
      <div className="flex w-full">
        <div className={`w-full lg:w-[calc(100%-240px)] h-full`}>
          {((filteredData && filteredData?.length > 0) ||
            (dashboardData && dashboardData?.length)) > 0 && (
            <>
              {tabLocation === "All" ? (
                allData && <AllComponent dashboardData={allData} />
              ) : (
                <FilteredComponents dashboardData={filteredData} />
              )}
            </>
          )}
        </div>

        <div
          className={`w-[240px] transition-all duration-[.40s] p-4 ${
            isSideNavBar
              ? "translate-x-[0px]  lg:translate-x-[0px]"
              : "translate-x-[240px]  lg:translate-x-[0px]"
          } h-[calc(100vh-48px)] fixed p-2 right-0 top-[48px] drop-shadow-lg space-y-2 z-[48] bg-a-white`}
        >
          <div>
            <p className="font-semibold">Filter:</p>
            <div className="flex items-center justify-start gap-2">
              <p>item:</p>
              <DropdownFilter item1Values={dropdownOption} />
            </div>
          </div>
          <div>
            <p className="font-bold">On this page</p>
            <Listbox aria-label="mini sidebar options">
              {tabLocation === "All"
                ? sidebarNavOptions["All"]?.map((item) => (
                    <ListboxItem
                      aria-label="mini sidebar options"
                      key={item}
                      href={`#${item}`}
                      onPress={handleSideNavbarClose}
                    >
                      <p>{item}</p>
                    </ListboxItem>
                  ))
                : sidebarNavOptions["Other"]?.map((item) => (
                    <ListboxItem
                      key={item}
                      href={`#${item}`}
                      onPress={handleSideNavbarClose}
                    >
                      {item}
                    </ListboxItem>
                  ))}
            </Listbox>
          </div>
        </div>

        <div
          className={` transition duration-[.40s] ${
            isSideNavBar
              ? "bg-a-black/40 backdrop-blur-sm z-[47] lg:bg-transparent lg:backdrop-blur-none"
              : "bg-transparent backdrop-blur-none z-[-1]"
          }  w-full h-[calc(100%-48px)] fixed `}
          onClick={handleSideNavbarClose}
        />
      </div>
    </div>
  );
};

export default DashboardHome;
