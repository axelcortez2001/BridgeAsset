import {
  addYears,
  differenceInCalendarYears,
  differenceInDays,
  isValid,
} from "date-fns";
import {
  checkWarrantStatus,
  checkWarrantyPeriod,
  computeYTD,
} from "./TableFunction";

const formatDate = (opt) => {
  if (isValid(new Date(opt))) {
    const formattedDate = new Date(opt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return formattedDate;
  } else {
    return "Unavailable";
  }
};

const containerCellSharedStyle = "p-[4px] m-[4px] min-w-max";

export const laptopColumns = [
  // {
  //   header: ({ table }) => (
  //     <input
  //       type='checkbox'
  //       checked={table.getIsAllRowsSelected()}
  //       indeterminate={table.getIsSomeRowsSelected()}
  //       onChange={table.getToggleAllRowsSelectedHandler()}
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <div className='w-full flex h-full items-center'>
  //       <input
  //         className='border h-[12px] w-full'
  //         type='checkbox'
  //         checked={row.getIsSelected()}
  //         onChange={row.getToggleSelectedHandler()}
  //       />
  //     </div>
  //   ),
  //   disableSortBy: true,
  //   accessorKey: "select",
  //   id: "select",
  //   pin: "left",
  //   size: 5,
  // },
  {
    header: <div className=" ">Item</div>,
    id: "item",
    accessorKey: "item",
    cell: ({ row }) => (
      <div className={`z-[46] ${containerCellSharedStyle}`}>
        <p className="">{row?.original?.item}</p>
      </div>
    ),
    pin: "left",
    size: 280,
  },
  {
    header: "Serial No",
    id: "serial_number",
    accessorKey: "serial_number",
    cell: ({ row }) => (
      <div className={`${containerCellSharedStyle}`}>
        {row?.original?.serial_number}
      </div>
    ),
  },
  {
    header: "Current User",
    id: "employee",
    accessorKey: "asset_holder",
    cell: ({ row }) => (
      <div className={`${containerCellSharedStyle}`}>
        {row?.original?.asset_holder?.name}
      </div>
    ),
  },
  {
    header: "DOI",
    id: "doi",
    accessorKey: "doi",
    cell: ({ row }) => (
      <div className={`${containerCellSharedStyle}`}>
        {formatDate(row?.original?.doi)}
      </div>
    ),
  },
  {
    header: "Supplier",
    id: "supplier",
    accessorKey: "supplier",
    cell: ({ row }) => (
      <div className={`${containerCellSharedStyle}`}>
        {row?.original?.supplier?.name}
      </div>
    ),
  },
  {
    header: "Branch",
    id: "branch",
    accessorKey: "branch",
    cell: ({ row }) =>
      row.original?.branch === "Laoag" ? (
        <div
          className={`${containerCellSharedStyle} bg-a-blue text-white rounded-md`}
        >
          {row?.original?.branch}
        </div>
      ) : row.original?.branch === "Makati" ? (
        <div
          className={`${containerCellSharedStyle} bg-a-red text-white  rounded-md`}
        >
          {row?.original?.branch}
        </div>
      ) : (
        <div
          className={`${containerCellSharedStyle} bg-a-green  text-white rounded-md`}
        >
          {row?.original?.branch}
        </div>
      ),
  },
  {
    header: "Status",
    id: "status",
    accessorKey: "status",
    cell: ({ row }) => (
      <div
        className={`${containerCellSharedStyle} ${
          row?.original?.status?.color
        } ${
          row?.original?.status?.color === "bg-green-500"
            ? "text-a-black"
            : "text-a-white"
        } rounded-md`}
      >
        {row?.original?.status?.name}
      </div>
    ),
  },
  {
    header: "Inventory Filed",
    id: "inventory_filed",
    accessorKey: "inventory_filed",
    cell: ({ row }) => (
      <div className={`${containerCellSharedStyle}`}>
        {formatDate(row?.original?.inventory_filed)}
      </div>
    ),
  },
  {
    header: "Unit Price",
    id: "unit_price",
    accessorKey: "unit_price",
    cell: ({ row }) => (
      <div className={`${containerCellSharedStyle}`}>
        {row?.original?.unit_price}
      </div>
    ),
  },
  {
    header: "DOP",
    id: "dop",
    accessorKey: "dop",
    cell: ({ row }) => (
      <div className={`${containerCellSharedStyle}`}>
        {formatDate(row?.original?.dop)}
      </div>
    ),
  },

  {
    header: "YTD",
    id: "ytd",
    accessorKey: "ytd",
    cell: ({ row }) => (
      <div className={`${containerCellSharedStyle}`}>
        {computeYTD(row?.original?.dop)}
      </div>
    ),
  },
  {
    header: "Warranty Period",
    id: "warranty_period",
    accessorKey: "warranty_period",
    cell: ({ row }) => (
      <div className={`${containerCellSharedStyle}`}>
        {checkWarrantyPeriod(
          row?.original?.warranty_period,
          row?.original?.dop
        )}
      </div>
    ),
  },
  {
    header: "Warranty Status",
    id: "warranty_status",
    accessorKey: "warranty_status",
    cell: ({ row }) => (
      <div className={`${containerCellSharedStyle}`}>
        {checkWarrantStatus(row?.original?.warranty_period, row?.original?.dop)}
      </div>
    ),
  },
  {
    header: "Previous User",
    id: "previous_user",
    accessorKey: "previous_user",
    cell: ({ row }) => (
      <div className={`${containerCellSharedStyle}`}>
        {row?.original?.asset_holder_history[0]
          ? row?.original?.asset_holder_history[0]?.name
          : "No Previous User"}
      </div>
    ),
  },
  {
    header: "Last updated",
    id: "asset_history",
    accessorKey: "asset_history",
    size: 500,
    cell: ({ row }) => (
      <div className={`${containerCellSharedStyle}`}>
        {row?.original?.asset_history[0]?.actions_taken[0]}
      </div>
    ),
  },
  {
    header: "Remarks",
    id: "remarks",
    accessorKey: "remarks",
    size: 500,
    cell: ({ row }) => (
      <div className={`${containerCellSharedStyle}`}>
        {row?.original?.remarks}
      </div>
    ),
  },
];
