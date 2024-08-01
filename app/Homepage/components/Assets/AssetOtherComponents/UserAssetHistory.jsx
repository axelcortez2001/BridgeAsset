import { format } from "date-fns";
import React from "react";

const UserAssetHistory = ({ userHistory }) => {
  console.log(userHistory);
  const formatDate = (opt) => {
    let formattedDate = format(new Date(opt), "MMM d, yyyy");
    return formattedDate;
  };
  return (
    <div className='p-2 text-sm'>
      {userHistory && userHistory.length > 0 ? (
        userHistory.map((item, index) => (
          <div
            className='border items-center rounded-md p-2 flex  max-w-full gap-4 hover:cursor-pointer hover:bg-gray-200'
            key={index}
          >
            <div>
              <img
                src={item?.picture}
                alt='user'
                className='rounded-full h-8 w-8'
              />
            </div>
            <div className='pr-3 border-r'>
              {formatDate(item?.date_received)} -{" "}
              {formatDate(item?.date_return)}
            </div>
            <div>{item?.name}</div>
          </div>
        ))
      ) : (
        <p>No Asset History</p>
      )}
    </div>
  );
};

export default UserAssetHistory;
