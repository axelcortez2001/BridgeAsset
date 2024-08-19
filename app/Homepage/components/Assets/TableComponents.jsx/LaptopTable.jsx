import React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { laptopColumns } from "./TableData";
const LaptopTable = ({ assetData }) => {
  const columns = laptopColumns;
  return <div>Laptop Table</div>;
};

export default LaptopTable;
