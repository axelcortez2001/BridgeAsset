import { format } from "date-fns";
import React from "react";
import HistoryTable from "./HistoryTable";

const AssetHistoryData = ({ history }) => {
  const formatDate = (opt) => {
    let formattedDate = format(new Date(opt), "MMM d, yyyy");
    return formattedDate;
  };
  const columns = [
    {
      Header: "Date Updated",
      id: "date_updated",
      accessorKey: "date_updated",
      size: 10,
      cell: ({ row }) => (
        <div className='text-center'>
          {formatDate(row?.original?.date_updated)}
        </div>
      ),
    },
    {
      Header: "Actions Taken",
      id: "actions_taken",
      accessorKey: "actions_taken",
      cell: ({ row }) => <div>{row?.original?.actions_taken[0]}</div>,
    },
  ];
  return (
    <div className='p-2 text-sm'>
      <HistoryTable
        history={history}
        columns={columns}
        basedFrom='AssetHistory'
      />
    </div>
  );
};

export default AssetHistoryData;
