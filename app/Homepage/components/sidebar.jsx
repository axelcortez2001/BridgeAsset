import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "aws-amplify/auth";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  selectedAssetDataAtom,
  selectedTypeAtom,
  setSideBarLocation,
  sideBarLocation,
} from "../AssetStore";
import { setDataToDefaultAtom } from "./Assets/Store/LaptopStore";
import { setMonitorDataToDefaultAtom } from "./Assets/Store/MonitorStore";

const Sidebar = () => {
  const dashboardLocation = useAtomValue(sideBarLocation);
  const setDashboardLocation = useSetAtom(setSideBarLocation);
  const [selectedType, setSelectedType] = useAtom(selectedTypeAtom);

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const setSelectedAssetData = useSetAtom(selectedAssetDataAtom);
  const setLaptopToDefault = useSetAtom(setDataToDefaultAtom);
  const setMonitorToDefault = useSetAtom(setMonitorDataToDefaultAtom);
  const handleNavigation = (location, type) => {
    setDashboardLocation(location);
    setSelectedType(type);
    setSelectedAssetData(null);
    setLaptopToDefault();
    setMonitorToDefault();
  };

  const toggleAccordion = () => {
    setIsAccordionOpen((prev) => !prev);
  };

  return (
    <div className='h-screen w-80 border flex flex-col justify-start items-center relative p-2'>
      <div className='w-full text-center'>
        <p className='text-xl font-semibold'>Asset Management</p>
      </div>
      <div className='w-full flex-col space-y-3'>
        <div
          onClick={() => handleNavigation("dashboard")}
          className='border text-left p-2 w-full rounded-md mt-3 hover:cursor-pointer'
        >
          Dashboard
        </div>

        <div className='border p-2 w-full text-center rounded-md mt-3 hover:cursor-pointer'>
          <div
            onClick={toggleAccordion}
            className='Accordion flex justify-between'
          >
            <span className='ml-2'>Assets</span>
            <motion.div
              className='font-semibold'
              initial={{ rotate: 0 }}
              animate={{ rotate: isAccordionOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {">"}
            </motion.div>
          </div>
          <AnimatePresence>
            {isAccordionOpen && (
              <motion.div
                className='mt-2'
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className='pl-4 flex flex-col text-left gap-2'>
                  <div
                    className={`${
                      selectedType === "laptop" && "bg-gray-300"
                    } p-2 border rounded-md`}
                    onClick={() => handleNavigation("assets", "laptop")}
                  >
                    Laptop
                  </div>
                  <div
                    className={`${
                      selectedType === "monitor" && "bg-gray-300"
                    } p-2 border rounded-md`}
                    onClick={() => handleNavigation("assets", "monitor")}
                  >
                    Monitor
                  </div>
                  <div
                    className={`${
                      selectedType === "peripheral" && "bg-gray-300"
                    } p-2 border rounded-md`}
                    onClick={() => handleNavigation("assets", "peripheral")}
                  >
                    Peripherals
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <button
        className='absolute bottom-2 p-2 border rounded-md'
        onClick={signOut}
      >
        Signout
      </button>
    </div>
  );
};

export default Sidebar;
