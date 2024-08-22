import { isValid } from "date-fns";
import React from "react";
import {
  checkWarrantStatus,
  checkWarrantyPeriod,
  computeYTD,
} from "../TableComponents/TableFunction";

const AssetModalData = ({ asset }) => {
  console.log("Asset View: ", asset);
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
  return (
    <div className='w-full flex flex-col p-2 border rounded-md text-sm gap-2'>
      <div>
        Category: <span className='capitalize'>{asset?.category}</span>
      </div>
      <div>
        Status: <span className='capitalize'>{asset?.status?.name}</span>
      </div>
      <div>
        Serial No: <span className=''>{asset?.serial_number}</span>
      </div>
      <div>
        <p>
          Current User:
          <span className='capitalize'>{asset?.asset_holder?.name}</span>
        </p>
        <p>
          Date of Issued:{" "}
          <span className='capitalize'>{formatDate(asset?.doi)}</span>
        </p>
      </div>
      <div>
        Supplier: <span>{asset?.supplier?.name}</span>
      </div>
      <div>
        Branch: <span>{asset?.branch}</span>
      </div>
      <div>
        Inventory Filed: <span>{formatDate(asset?.inventory_filed)}</span>
      </div>
      <div>
        Unit Price: <span>{asset?.unit_price}</span>
      </div>
      <div>
        Date of Purchase: <span>{formatDate(asset?.dop)}</span>
      </div>
      <div>
        YTD: <span>{computeYTD(asset?.dop)}</span>
      </div>
      <div>
        Warranty Period:{" "}
        <span>{checkWarrantyPeriod(asset?.warranty_period, asset?.dop)}</span>
      </div>
      <div>
        Warranty Status:{" "}
        <span>{checkWarrantStatus(asset?.warranty_period, asset?.dop)}</span>
      </div>

      <div className='w-full bg-gray min-h-20'>
        Remarks: <span>{asset?.remarks}</span>
      </div>
    </div>
  );
};

export default AssetModalData;
