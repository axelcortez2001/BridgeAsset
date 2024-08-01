import { format } from "date-fns";
import React from "react";

const AssetHistoryData = ({ history }) => {
  const formatDate = (opt) => {
    let formattedDate = format(new Date(opt), "MMM d, yyyy");
    return formattedDate;
  };
  return (
    <div className='p-2 text-sm'>
      {history && history.length > 0 ? (
        history.map((item, index) => (
          <div
            className='border rounded-md p-2 flex  max-w-full gap-4 hover:cursor-pointer hover:bg-gray-200'
            key={index}
          >
            <div className='min-w-24 w-32 border-r'>
              {formatDate(item?.date_updated)}
            </div>
            <div className='whitespace-nowrap overflow-hidden text-ellipsis'>
              {item.actions_taken[0]}
            </div>
          </div>
        ))
      ) : (
        <p>No Asset History</p>
      )}
    </div>
  );
};

export default AssetHistoryData;
