import { isValid } from "date-fns";
import React from "react";
import {
  checkWarrantStatus,
  checkWarrantyPeriod,
  computeYTD,
} from "../TableComponents/TableFunction";
import {
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { list } from "postcss";
import { useAtomValue } from "jotai";
import { selectedTypeAtom } from "@/app/Homepage/AssetStore";

const AssetModalData = ({ asset }) => {
  const selectedType = useAtomValue(selectedTypeAtom);

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

  const listData = [
    {
      title: "Item",
      data: asset?.item,
    },
    {
      title: "Category",
      data: asset?.category,
    },
    {
      title: "Tag Code",
      data: asset?.tagCode,
      className: selectedType === "laptop" && "hidden",
    },
    {
      title: "Status",
      data: asset?.status?.name,
    },
    {
      title: "User Type",
      data: asset?.user_type,
    },
    {
      title: "Serial Number",
      data: asset?.serial_number,
    },
    {
      title: "Current User",
      data: asset?.asset_holder?.name,
    },
    {
      title: "Date of Issued",
      data: formatDate(asset?.doi),
    },
    {
      title: "Supplier",
      data: asset?.supplier?.name,
    },
    {
      title: "Branch",
      data: asset?.branch,
    },
    {
      title: "Inventory Filed",
      data: formatDate(asset?.inventory_filed),
    },
    {
      title: "Unit Price",
      data: asset?.unit_price,
    },
    {
      title: "Date of Purchase",
      data: formatDate(asset?.dop),
    },
    {
      title: "Year to Date",
      data: computeYTD(asset?.dop),
    },
    {
      title: "Warranty Period",
      data: checkWarrantyPeriod(asset?.warranty_period, asset?.dop),
    },
    {
      title: "Warranty Status",
      data: checkWarrantStatus(asset?.warranty_period, asset?.dop),
    },
    {
      title: "Remarks",
      data: asset?.remarks,
    },
  ];

  return (
    <Table
      hideHeader
      aria-label="ShowData"
      shadow="md"
      classNames={{
        wrapper: "p-0 rounded-lg",
        td: "border ",
      }}
    >
      <TableHeader>
        <TableColumn>TITLE</TableColumn>
        <TableColumn>DATA</TableColumn>
      </TableHeader>
      <TableBody>
        {listData.map((item, index) => (
          <TableRow
            key={index}
            className={`${item.className} select-none hover:bg-a-blue/20 hover:text-a-blue/80 `}
          >
            <TableCell className="font-bold">
              {item.title.toUpperCase()}
            </TableCell>
            <TableCell className="font-medium">
              {item.data !== "" &&
              item.data !== null &&
              item.data !== undefined ? (
                item.data
              ) : (
                <p className="text-a-red">NO RECORD</p>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AssetModalData;
