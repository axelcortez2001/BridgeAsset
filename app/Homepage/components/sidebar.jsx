import React, { Children, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "aws-amplify/auth";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  assetDataAtom,
  filteredEmployeesAtom,
  handleReturnEmployeesDefaultAtom,
  selectedAssetDataAtom,
  selectedTypeAtom,
  setSideBarLocation,
  sideBarLocation,
} from "../AssetStore";
import {
  actionHistoryAtom,
  setDataToDefaultAtom,
} from "./Assets/Store/LaptopStore";
import {
  actionMonitorHistoryAtom,
  setMonitorDataToDefaultAtom,
} from "./Assets/Store/MonitorStore";
import {
  actionPeripheralHistoryAtom,
  setPeripheralToDefault,
} from "./Assets/Store/PeripheralStore";
import { expandIndexAtom } from "./Dashboard/DashboardComponents/AllComponents/Charts/AllComponentsStore";
import {
  Accordion,
  AccordionItem,
  Button,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import { Image } from "@nextui-org/image";

const Sidebar = () => {
  const dashboardLocation = useAtomValue(sideBarLocation);
  const setDashboardLocation = useSetAtom(setSideBarLocation);
  const [selectedType, setSelectedType] = useAtom(selectedTypeAtom);

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const setSelectedAssetData = useSetAtom(selectedAssetDataAtom);
  const setLaptopToDefault = useSetAtom(setDataToDefaultAtom);
  const setEmployeesToDefault = useSetAtom(filteredEmployeesAtom);
  const setMonitorToDefault = useSetAtom(setMonitorDataToDefaultAtom);
  const setAssetData = useSetAtom(assetDataAtom);
  const setLaptopHistory = useSetAtom(actionHistoryAtom);
  const setMonitorHistory = useSetAtom(actionMonitorHistoryAtom);
  const setPeripheralHistory = useSetAtom(actionPeripheralHistoryAtom);
  const setHistoryDefault = () => {
    setLaptopHistory([]);
    setMonitorHistory([]);
    setPeripheralHistory([]);
  };
  const setExpandIndex = useSetAtom(expandIndexAtom);
  const setPeripheralDefault = useSetAtom(setPeripheralToDefault);

  const handleNavigation = async (location, type) => {
    setEmployeesToDefault([]);
    setAssetData(null);
    setDashboardLocation(location);
    setSelectedType(type);
    setSelectedAssetData(null);
    setLaptopToDefault();
    setMonitorToDefault();
    setHistoryDefault();
    setPeripheralDefault();
    setExpandIndex(null);
  };

  const toggleAccordion = () => {
    setIsAccordionOpen((prev) => !prev);
  };

  //FrontEnd

  const sidebarOptions = [
    {
      key: "dashboard",
      content: "Dashboard",
      action: () => handleNavigation("dashboard"),
    },
    {
      key: "manage-users",
      content: "Manage Users",
      action: () => handleNavigation("user"),
    },
  ];

  const sidebarAssetOptions = [
    {
      key: "laptop",
      content: "Laptop",
      action: () => handleNavigation("assets", "laptop"),
    },
    {
      key: "monitor",
      content: "Monitor",
      action: () => handleNavigation("assets", "monitor"),
    },
    {
      key: "peripherals",
      content: "Peripherals",
      action: () => handleNavigation("assets", "peripheral"),
    },
  ];

  return (
    <div className="h-full w-[300px] border-r">
      <div className="relative h-full">
        <div className="w-full text-center border p-4 flex items-center justify-center">
          <div>
            <Image
              src="/Image/Header.png"
              alt="Aretex Logo"
              width={160}
              className="h-full w-full "
            />
            <p className="font-bold text-base text-a-blue">Asset Management</p>
          </div>
        </div>

        <div className="w-full">
          <Listbox className="px-2">
            {sidebarOptions.map((item, index) => (
              <ListboxItem
                className="ease-in h-10 my-[2px] rounded-none rounded-r-md"
                classNames={{
                  base: "transition-all border-l-1 data-[hover=true]:border-l-2 border-a-blue data-[hover=true]:border-h-orange bg-a-lightgrey data-[hover=true]:bg-a-darkgrey",
                }}
                key={item.key}
                onPress={item.action}
              >
                {item.content}
              </ListboxItem>
            ))}
          </Listbox>

          <Accordion className="my-0 py-0">
            <AccordionItem
              key="1"
              title={"Assets"}
              className="m-0"
              classNames={{
                heading: "h-10",
                trigger:
                  "transition-all rounded-r-md border-l-1 data-[hover=true]:border-l-2 border-a-blue data-[hover=true]:border-a-orange bg-a-lightgrey data-[hover=true]:bg-a-darkgrey",
                title: "text-sm p-2",
                indicator: "p-2 text-a-black scale-[1.1]",
                content: "p-0 py-1",
              }}
            >
              <Listbox className="p-0 m-0" aria-label="Asset Options">
                {sidebarAssetOptions.map((item, index) => (
                  <ListboxItem
                    key={item.key}
                    onPress={item.action}
                    className="h-10 my-[2px] rounded-none rounded-r-md"
                    classNames={{
                      base: "transition-all border-l-1 data-[hover=true]:border-l-2 border-a-blue data-[hover=true]:border-h-orange bg-a-lightgrey data-[hover=true]:bg-a-darkgrey",
                    }}
                  >
                    {item.content}
                  </ListboxItem>
                ))}
              </Listbox>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="absolute bottom-0 w-full p-2">
          <Button
            onPress={signOut}
            className="w-full h-10 rounded-md text-a-white bg-a-orange hover:bg-h-orange"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
