import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { isValid } from "date-fns";
import {
  Tabs,
  Tab,
  TableHeader,
  Table,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Card,
  CardBody,
} from "@nextui-org/react";
import { filterIcon } from "@/public/Icon";
import NoItems from "@/app/SharedComponents/NoItems";

const UserHistory = ({ userData }) => {
  const [tabLocation, setTabLocation] = useState("All");
  const historyArray = userData?.asset_holder_history;
  const [filteredHistoryArray, setFilteredHistoryArray] =
    useState(historyArray);

  const [selectedKeys, setSelectedKeys] = useState(new Set(["All"]));

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

  const dropdownOption = [
    {
      label: "All",
      action: () => handleFilter("All"),
    },
    {
      label: "Laptop",
      action: () => handleFilter("Laptop"),
    },
    {
      label: "Monitor",
      action: () => handleFilter("Monitor"),
    },
    {
      label: "Peripheral",
      action: () => handleFilter("Peripheral"),
    },
  ];

  const handleFilter = (item) => {
    setTabLocation(item);
  };

  const tableHeader = ["Name", "Category", "Date Received", "Date Return"];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);

  const totalPage = Math.ceil(filteredHistoryArray?.length / itemPerPage);

  const currentTableData = filteredHistoryArray?.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  );

  return (
    <>
      <div className="grid grid-cols-3 pb-2">
        <div></div>
        <div className="text-lg font-bold flex items-center justify-center">
          <p>ASSET HISTORY</p>
        </div>
        <div className="flex justify-end">
          <Dropdown>
            <DropdownTrigger>
              <Button size="sm" isIconOnly className="bg-a-blue mx-2">
                {filterIcon("text-a-white")}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              selectionMode="single"
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
            >
              {dropdownOption.map((item, index) => (
                <DropdownItem key={item.label} onPress={item.action}>
                  {item.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      {filteredHistoryArray.length > 0 ? (
        <>
          <Table
            layout="fixed"
            shadow="md"
            hideHeader
            aria-label="ShowData"
            classNames={{
              wrapper: "rounded-lg p-0 mb-2",
              td: "border",
            }}
          >
            <TableHeader>
              {tableHeader.map((item, index) => (
                <TableColumn key={index}>{item}</TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              <TableRow>
                {tableHeader.map((item, index) => (
                  <TableCell key={index} className="font-bold text-center">
                    {item}
                  </TableCell>
                ))}
              </TableRow>
              {currentTableData?.length > 0 &&
                currentTableData?.map((item, index) => (
                  <TableRow
                    key={index}
                    className="cursor-default select-none hover:bg-a-blue/20 hover:text-a-blue/80 "
                  >
                    <TableCell>{item?.asset_name}</TableCell>
                    <TableCell>
                      {item?.peripheral_type
                        ? item?.peripheral_type
                        : item?.category}
                    </TableCell>
                    <TableCell> {formatDate(item?.date_received)}</TableCell>
                    <TableCell> {formatDate(item?.date_return)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <div className="my-4">
          <NoItems
            classNameImage={"h-[100px] w-auto"}
            classNameLabel={"text-base"}
            label="No Asset"
          />
        </div>
      )}

      <div
        className={`flex items-center justify-center ${
          filteredHistoryArray.length === 0 && "hidden"
        }`}
      >
        <Pagination
          total={totalPage}
          initialPage={1}
          page={currentPage}
          onChange={setCurrentPage}
          classNames={{ cursor: "bg-a-blue" }}
        />
      </div>
    </>
  );
};

export default UserHistory;
