import React, { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import Table from "./Table";
const SubTableGateWay = ({
  assetData,
  setActionStatus,
  actionStatus,
  assetLoading,
}) => {
  const [accordionArray, setAccordionArray] = useState([]);
  const toggleAccordion = (opt) => {
    if (accordionArray.some((acc) => acc === opt)) {
      setAccordionArray(accordionArray.filter((acc) => acc !== opt));
    } else {
      setAccordionArray([...accordionArray, opt]);
    }
  };
  const tableOptions = [
    "Stock",
    "Issued",
    "Active",
    "Defective",
    "Archive",
    "Transfer",
  ];
  const filterLaptopAsset = (opt) => {
    const newFilteredLaptopAsset = assetData?.filter((asset) => {
      return asset?.status?.name === opt;
    });
    return newFilteredLaptopAsset;
  };
  return (
    <>
      {tableOptions.map((option, index) => (
        <div className='flex flex-col  w-full p-2 gap-2' key={index}>
          <div className='border rounded-md p-2 max-w-full '>
            <div
              className='flex items-center gap-3 hover:cursor-pointer'
              onClick={() => toggleAccordion(option)}
            >
              <motion.div
                className='font-semibold'
                initial={{ rotate: 0 }}
                animate={{
                  rotate:
                    accordionArray &&
                    accordionArray.some((acc) => acc === option)
                      ? 90
                      : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                {">"}
              </motion.div>
              <p>
                {option} -{" "}
                <span>
                  {filterLaptopAsset(option)?.length} item
                  {filterLaptopAsset(option)?.length > 1 ? "s" : ""}
                </span>
              </p>
            </div>
            <AnimatePresence>
              {accordionArray &&
                accordionArray.some((acc) => acc === option) && (
                  <motion.div
                    className=' w-full overflow-x-auto resize-y'
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Table
                      assetData={filterLaptopAsset(option)}
                      setActionStatus={setActionStatus}
                      actionStatus={actionStatus}
                      assetLoading={assetLoading}
                    />
                  </motion.div>
                )}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </>
  );
};

export default SubTableGateWay;
