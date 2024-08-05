import { format } from "date-fns";
import React from "react";
import HistoryTable from "./HistoryTable";

const UserAssetHistory = ({ userHistory }) => {
  const formatDate = (opt) => {
    let formattedDate = format(new Date(opt), "MMM d, yyyy");
    return formattedDate;
  };
  console.log("User History: ", userHistory);
  const columns = [
    {
      Header: "User",
      id: "User",
      accessorKey: "picture",
      size: 5,
      cell: ({ row }) => (
        <div className='flex items-end justify-center '>
          <img
            src={row?.original?.picture}
            alt='user'
            className='rounded-full h-8 w-8'
          />
        </div>
      ),
    },
    {
      Header: "Date Range",
      id: "date_return",
      accessorKey: "date_return",
      size: 15,

      cell: ({ row }) => (
        <div className='pr-3 border-r text-center'>
          {formatDate(row?.original?.date_received)} -{" "}
          {formatDate(row?.original?.date_return)}
        </div>
      ),
    },
    {
      Header: <div className='text-left ml-5'>Name</div>,
      id: "name",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className='text-left ml-5'>{row?.original?.name}</div>
      ),
    },
  ];
  return (
    <div className='p-2 text-sm'>
      <HistoryTable
        history={userHistory}
        columns={columns}
        basedFrom='UserAssetHistory'
      />
    </div>
  );
};

export default UserAssetHistory;
