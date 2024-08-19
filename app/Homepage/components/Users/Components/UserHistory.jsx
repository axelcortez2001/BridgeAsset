import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { isValid } from "date-fns";
import { Tabs, Tab } from "@nextui-org/react";

const UserHistory = ({ userData }) => {
  const [accordionArray, setAccordionArray] = useState([]);
  const [tabLocation, setTabLocation] = useState("All");
  const historyArray = userData?.asset_holder_history;
  const [filteredHistoryArray, setFilteredHistoryArray] =
    useState(historyArray);
  console.log("History Array: ", historyArray);
  const formatDate = (opt) => {
    if (isValid(new Date(opt))) {
      const formattedDate = new Date(opt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      return formattedDate;
    } else {
      return "No Date";
    }
  };
  //handlers
  const toggleAccordion = (opt) => {
    console.log(accordionArray);
    console.log(opt);
    if (accordionArray.some((acc) => acc === opt)) {
      setAccordionArray(accordionArray.filter((acc) => acc !== opt));
    } else {
      setAccordionArray([...accordionArray, opt]);
    }
  };
  useEffect(() => {
    if (tabLocation === "All") {
      setFilteredHistoryArray(historyArray);
    } else {
      setFilteredHistoryArray(
        historyArray?.filter((history) =>
          history?.category?.toLowerCase().includes(tabLocation.toLowerCase())
        )
      );
    }
  }, [tabLocation, historyArray]);
  const handleTab = (opt) => {
    setTabLocation(opt);
  };
  return (
    <div className='w-full flex flex-col p-2 gap-2'>
      <div>
        <Tabs onSelectionChange={handleTab}>
          <Tab key='All' title='All' />
          <Tab key='Laptop' title='Laptop' />
          <Tab key='Monitor' title='Monitor' />
          <Tab key='Peripheral' title='Peripheral' />
        </Tabs>
      </div>
      User History
      <div className='flex flex-col gap-2 max-h-[350px] overflow-y-auto'>
        {filteredHistoryArray &&
          filteredHistoryArray?.map((history, index) => (
            <div
              key={index}
              className=' flex flex-col justify-between border p-2 rounded-md'
            >
              <div
                onClick={() => toggleAccordion(index)}
                className='Accordion flex justify-between w-full cursor-pointer'
              >
                <div className='flex'>
                  {accordionArray &&
                  accordionArray.some((acc) => acc === index) ? (
                    <div></div>
                  ) : (
                    <div className=''>
                      {" "}
                      {formatDate(history?.date_return)}
                      {" : "}
                    </div>
                  )}
                  <div className='font-semibold'>{history?.asset_name}</div>
                </div>
                <motion.div
                  className='font-semibold'
                  initial={{ rotate: 0 }}
                  animate={{
                    rotate:
                      accordionArray &&
                      accordionArray.some((acc) => acc === index)
                        ? 90
                        : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {">"}
                </motion.div>
              </div>
              <AnimatePresence>
                {accordionArray &&
                  accordionArray.some((acc) => acc === index) && (
                    <motion.div
                      className='mt-2'
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className='w-full p-1 indent-1 flex flex-col'>
                        <div>
                          <p className='capitalize'>
                            Category: {history?.category}
                          </p>
                          {history?.peripheral_type && (
                            <p>Type: {history?.peripheral_type}</p>
                          )}
                        </div>
                        <div className='flex flex-row justify-between'>
                          <p>Received: {formatDate(history?.date_received)}</p>
                          <p>Returned: {formatDate(history?.date_return)}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
              </AnimatePresence>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserHistory;
