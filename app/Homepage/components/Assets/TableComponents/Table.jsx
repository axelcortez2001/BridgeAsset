import React from "react";
import {
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { laptopColumns } from "./TableData";
import TableFooter from "./TableFooter";
const LaptopTable = ({ assetData }) => {
  console.log("AssetData:", assetData);
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

  const getCommonPinningStyles = (column) => {
    const isPinned = column.getIsPinned();

    return {
      left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
      // opacity: isPinned ? 0.95 : 1,
      position: isPinned ? "sticky" : "relative",
      width: column.getSize(),
      zIndex: isPinned ? 1 : 0,
      backgroundColor: isPinned ? "white" : "transparent",
    };
  };
  return (
    <div className='w-full'>
      <p>Laptop Table</p>
      <div className=' w-full overflow-x-auto border '>
        {data ? (
          <table
            className='min-w-full overflow-x-auto border-l'
            style={{ width: table?.getTotalSize() }}
          >
            <thead>
              {table?.getHeaderGroups()?.map((headerGroup) => (
                <tr key={headerGroup.id} className='relative'>
                  {headerGroup.headers.map((header) => {
                    const { column } = header;

                    return (
                      <th
                        key={header.id}
                        style={{
                          position: "relative",
                          maxwidth: header.getSize(),
                          ...getCommonPinningStyles(column),
                        }}
                      >
                        {header.isPlaceholder ? null : (
                          <div className='border-b p-2 capitalize whitespace-nowrap" '>
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
                <tr key={row.id} className='hover:cursor-pointer  relative'>
                  {row.getVisibleCells().map((cell) => {
                    const { column } = cell;
                    return (
                      <td
                        key={cell.id}
                        style={{
                          width: cell.column.getSize(),
                          ...getCommonPinningStyles(column),
                        }}
                        className={`${
                          row.getIsSelected()
                            ? "bg-orange-700 text-red-400"
                            : ""
                        } text-sm text-center border-b  `}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr className='w-full'>
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
    </div>
  );
};

export default LaptopTable;
