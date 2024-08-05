import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { format } from "date-fns";
import {
  Pagination,
  Select,
  SelectItem,
  Button,
  Modal,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import ViewAssetHistoryModal from "./ViewAssetHistoryModal";
import ViewUserAssetHistoryModal from "./ViewUserAssetHistoryModal";

const formatDate = (opt) => {
  let formattedDate = format(new Date(opt), "MMM d, yyyy");
  return formattedDate;
};

const HistoryTable = ({ history, columns, basedFrom }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedHistory, setSelectedHistory] = useState(null);
  const data = history;
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const rowOptions = ["10", "20", "30", "40"];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });
  const handleSelectHistory = (opt) => {
    console.log(`Select History: `, opt);
    setSelectedHistory(opt);
    onOpenChange(true);
  };
  return (
    <div className='p-2 text-sm'>
      {history && history.length > 0 ? (
        <div>
          <table className=' w-full'>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      style={{
                        position: "relative",
                        maxwidth: header.getSize(),
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <div className=' '>
                          {flexRender(
                            header.column.columnDef.Header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className='hover:cursor-pointer hover:bg-gray-200 rounded-md border-b'
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                      className={`py-[10px] `}
                      onClick={() => handleSelectHistory(cell?.row?.original)}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className=' flex grid grid-cols-4'>
            <div className='flex justify-start items-center text-sm text-darkgrey-default'>
              Page {table.getState().pagination.pageIndex + 1} out of{" "}
              {table.getPageCount().toLocaleString()}
            </div>
            <div className='flex justify-center items-center col-span-2'>
              <Pagination
                total={table.getPageCount()}
                isCompact
                initialPage={1}
                showControls
                onChange={(e) => {
                  table.setPageIndex(Number(e - 1));
                }}
                classNames={{
                  wrapper:
                    "max-w-full lg:max-w-fit flex w-full justify-between",
                  cursor: "hidden lg:flex bg-blue-default",
                }}
              />
            </div>
            <div className='flex justify-end items-center'>
              <p className='text-sm text-darkgrey-default text-center hidden sm:block'>
                Rows Per Page
              </p>
              <Select
                defaultSelectedKeys={["5"]}
                className='max-w-16'
                classNames={{ popoverContent: "w-20" }}
                size='sm'
                aria-label='Rows to Show'
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {rowOptions.map((option) => (
                  <SelectItem key={option}>{option}</SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size={basedFrom === "AssetHistory" ? "3xl" : "sm"}
          >
            {basedFrom === "AssetHistory" ? (
              <ViewAssetHistoryModal selectedHistory={selectedHistory} />
            ) : (
              <ViewUserAssetHistoryModal selectedHistory={selectedHistory} />
            )}
          </Modal>
        </div>
      ) : (
        <p>No Asset History</p>
      )}
    </div>
  );
};

export default HistoryTable;
