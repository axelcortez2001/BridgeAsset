import { isValid } from "date-fns";
import React from "react";

const UserDetails = ({ userData }) => {
  const active = userData?.asset_holder_active;
  console.log("active: ", active);

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
    <div className='w-full flex flex-col p-2 gap-2'>
      <p>Active Asset Data</p>
      {active &&
        active?.map((assetActive, index) => (
          <div key={index} className='border rounded-md p-1'>
            <p className='font-semibold capitalize'> {assetActive.category} </p>
            <p className=' indent-5'>
              {assetActive?.peripheral_type && (
                <span className='capitalize'>
                  {assetActive.peripheral_type} {" :"}
                </span>
              )}
              {assetActive?.asset_name}
            </p>
            <p className=' indent-5'>
              Received: <span>{formatDate(assetActive?.date_received)}</span>
            </p>
          </div>
        ))}
    </div>
  );
};

export default UserDetails;
