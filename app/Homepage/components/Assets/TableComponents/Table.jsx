import React, { useState } from "react";
import {
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { laptopColumns } from "./TableData";
import { Button, select, useDisclosure } from "@nextui-org/react";
import TableFooter from "./TableFooter";
import ViewModal from "../AssetOtherComponents/ViewModal";

import useHandleSelectAssetLaptop from "../Functions/laptopFunction";
import useHandleSelectAssetMonitor from "../Functions/MonitorFunction";
import useHandleSelectAssetPeripheral from "../Functions/PeripheralFunction";

import AddAsset from "../AssetComponents/Asset";
const Table = ({ assetData, actionStatus, assetLoading }) => {
  const [isViewModal, setViewModal] = useState(false);
  const [isAddModal, setAddModal] = useState(false);

  const handleAddModal = () => {
    setAddModal((prev) => !prev);
  };

  const handleViewModal = () => {
    setViewModal((prev) => !prev);
  };

  const data = assetData;
  const columns = laptopColumns;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
    columnResizeMode: "onChange",
    initialState: {
      columnPinning: {
        left: ["item"],
      },
    },
  });

  // const getCommonPinningStyles = (column) => {
  //   const isPinned = column.getIsPinned();

  //   return {
  //     left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
  //     // opacity: isPinned ? 0.95 : 1,
  //     position: isPinned ? "sticky" : "relative",
  //     width: column.getSize(),
  //     zIndex: isPinned ? 1 : 0,
  //     backgroundColor: isPinned ? "#F9F9F9" : "transparent",
  //   };
  // };

  const [selectedTD, setSelectedTd] = useState(null);
  const handleSelectLaptop = useHandleSelectAssetLaptop();
  const handleSelectMonitor = useHandleSelectAssetMonitor();
  const handleSelectPeripheral = useHandleSelectAssetPeripheral();

  const handleSelectFromTable = (opt) => {
    handleViewModal();
    setSelectedTd(opt);
  };

  const handleSelectAsset = () => {
    if (selectedTD?.category.toLocaleLowerCase() === "laptop") {
      handleSelectLaptop(selectedTD);
      handleAddModal();
    } else if (selectedTD?.category.toLocaleLowerCase() === "monitor") {
      handleSelectMonitor(selectedTD);
      handleAddModal();
    } else if (selectedTD?.category.toLocaleLowerCase() === "peripheral") {
      handleSelectPeripheral(selectedTD);
      handleAddModal();
    }
  };

  return (
    <>
      <div className="w-full bg-a-lightgrey shadow-lg text-a-black rounded-lg overflow-x-auto border ">
        {data ? (
          <table
            className="min-w-full overflow-x-auto"
            style={{ width: table?.getTotalSize() }}
          >
            <thead className="bg-a-white border-b border-a-grey">
              {table?.getHeaderGroups()?.map((headerGroup) => (
                <tr key={headerGroup.id} className="relative">
                  {headerGroup.headers.map((header) => {
                    const { column } = header;

                    return (
                      <th
                        key={header.id}
                        className={`bg-a-white text-a-black relative ${
                          column.id === "item" &&
                          "sm:sticky left-0 bg-a-white z-[11]"
                        }`}
                        style={{
                          maxwidth: header.getSize(),
                        }}
                      >
                        {header.isPlaceholder ? null : (
                          <div className="p-2 capitalize whitespace-nowrap">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            <div
                              {...{
                                onMouseDown: header.getResizeHandler(),
                                onTouchStart: header.getResizeHandler(),
                                className: `resizer ${
                                  header.column.getIsResizing()
                                    ? "isResizing"
                                    : ""
                                }`,
                              }}
                            />
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table?.getRowModel()?.rows?.map((row) => (
                <tr
                  key={row.id}
                  className="hover:cursor-pointer hover:bg-a-grey relative"
                >
                  {row.getVisibleCells().map((cell) => {
                    const { column } = cell;
                    return (
                      <td
                        key={cell.id}
                        style={{
                          width: cell.column.getSize(),
                        }}
                        onClick={() =>
                          handleSelectFromTable(cell?.row?.original)
                        }
                        className={`${
                          row.getIsSelected()
                            ? "bg-orange-700 text-red-400"
                            : ""
                        } ${
                          cell.column.id === "item" &&
                          "sm:sticky left-0 bg-a-white z-[11]"
                        } text-center border-b border-a-grey sm:drop-shadow-lg p-0`}
                      >
                        <div>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}

              <tr className="w-full bg-a-lightgrey hover:bg-a-grey bg-a-white">
                {columns.map((column, index) => (
                  <TableFooter key={index} column={column} data={data} />
                ))}
              </tr>
            </tbody>
          </table>
        ) : (
          <div>No Data Available</div>
        )}
      </div>

      <ViewModal
        isOpen={isViewModal}
        onClose={handleViewModal}
        asset={selectedTD}
        handleSelectAsset={handleSelectAsset}
      />

      <AddAsset isOpen={isAddModal} onclose={handleAddModal} from="modal" type="update" />
    </>
  );
};

export default Table;
