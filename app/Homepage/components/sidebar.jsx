import React, { Children, useEffect, useState } from "react";
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
import {
  dashboardIcon,
  userIcon,
  assetIcon,
  laptopIcon,
  monitorIcon,
  peripheralsIcon,
  menuIcon,
} from "@/public/Icon";

const Sidebar = ({ onClose }) => {
  const dashboardLocation = useAtomValue(sideBarLocation);
  const setDashboardLocation = useSetAtom(setSideBarLocation);
  const [selectedType, setSelectedType] = useAtom(selectedTypeAtom);

  const [selectedOption, setSelectedOption] = useState("dashboard");

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

  const handleSelectedTab = (tab) => {
    setSelectedOption(tab);
    onClose(false);
  };

  //FrontEnd

  const colorWhenHovered = "bg-a-grey/80 text-a-blue border-a-blue border-l-2";
  const optionText = "text-base font-medium text-a-black";
  const listBoxItem =
    "data-[hover=true]:text-h-orange ease-in h-10 my-[2px] rounded-none rounded-r-md";
  const listBoxItemBase =
    "transition-all border-l-1 data-[hover=true]:border-l-2 border-a-blue data-[hover=true]:border-h-orange bg-a-lightgrey data-[hover=true]:bg-a-grey";
  const sidebarMinimizeAnimation = "";

  const sidebarOptions = [
    {
      key: "dashboard",
      content: "Dashboard",
      className: `${selectedOption === "dashboard" && `${colorWhenHovered}`}`,
      icon: dashboardIcon(),
      action: () => {
        handleNavigation("dashboard");
        handleSelectedTab("dashboard");
      },
    },
    {
      key: "manage-users",
      content: "Manage Users",
      className: `${selectedOption === "user" && `${colorWhenHovered}`}`,
      icon: userIcon(),
      action: () => {
        handleNavigation("user");
        handleSelectedTab("user");
      },
    },
  ];

  const sidebarAssetOptions = [
    {
      key: "laptop",
      content: "Laptop",
      className: `${selectedOption === "laptop" && `${colorWhenHovered}`}`,
      icon: laptopIcon(),
      action: () => {
        handleNavigation("assets", "laptop");
        handleSelectedTab("laptop");
      },
    },
    {
      key: "monitor",
      content: "Monitor",
      className: `${selectedOption === "monitor" && `${colorWhenHovered}`}`,
      icon: monitorIcon(),
      action: () => {
        handleNavigation("assets", "monitor");
        handleSelectedTab("monitor");
      },
    },
    {
      key: "peripherals",
      content: "Peripherals",
      className: `${selectedOption === "peripheral" && `${colorWhenHovered}`}`,
      icon: peripheralsIcon(),
      action: () => {
        handleNavigation("assets", "peripheral");
        handleSelectedTab("peripheral");
      },
    },
  ];

  return (
    <div className="h-full w-[300px] border-r bg-a-white">
      <div className="relative h-full">
        <div className="w-full text-center border p-2 flex items-center justify-center">
          <div
            className="absolute left-2 block md:hidden"
            onClick={() => onClose(false)}
          >
            {menuIcon(
              "transition-all duration-[.4s] text-a-blue/80 hover:text-a-blue h-[32px] w-[32px] cursor-pointer hover:scale-[1.05]"
            )}
          </div>
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

        <div className="w-full py-2">
          <Listbox className="px-2" aria-label="sidebar options">
            {sidebarOptions.map((item, index) => (
              <ListboxItem
                aria-label="sidebar options"
                startContent={item.icon}
                className={`${listBoxItem} ${item.className}`}
                classNames={{
                  base: listBoxItemBase,
                }}
                key={item.key}
                onPress={item.action}
              >
                <p className={optionText}>{item.content}</p>
              </ListboxItem>
            ))}
          </Listbox>

          <Accordion className="my-0 py-0">
            <AccordionItem
              key="1"
              aria-label="dropdown for asset options"
              title={
                <div className="flex items-center">
                  {assetIcon()} <span className="ml-2 text-a-black">Asset</span>
                </div>
              }
              classNames={{
                heading: "h-10 border-l-1",
                trigger:
                  selectedOption === "laptop" ||
                  selectedOption === "monitor" ||
                  selectedOption === "peripheral"
                    ? "bg-a-grey transition-all rounded-r-md data-[hover=true]:bg-a-darkgrey"
                    : "bg-a-lightgrey transition-all rounded-r-md data-[hover=true]:bg-a-darkgrey",
                title:
                  "border-l border-a-blue text-sm p-2 hover:text-h-orange hover:border-a-orange hover:border-l-2 text-base data-[open=true]:text-a-blue data-[open=true]:border-a-blue data-[open=true]:border-l-2",
                indicator: "p-2 text-a-black scale-[1.1]",
                content: "p-0 py-1",
              }}
            >
              <Listbox className="p-0 m-0 pl-4">
                {sidebarAssetOptions.map((item, index) => (
                  <ListboxItem
                    key={item.key}
                    startContent={item.icon}
                    onPress={item.action}
                    className={`${listBoxItem} ${item.className}`}
                    classNames={{
                      base: listBoxItemBase,
                    }}
                  >
                    <p className={optionText}>{item.content}</p>
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
