import React from "react";

const UserDetails = ({ userData }) => {
  const active = userData?.asset_holder_active;
  console.log("active: ", active);
  return (
    <div className='w-full flex flex-col p-2 gap-2'>
      <div className='border rounded-md p-1'>
        <p className='font-semibold'>Active Laptop Data</p>
      </div>
      <div className='border rounded-md p-1'>
        <p className='font-semibold'>Active Monitor Data</p>
      </div>
      <div className='border rounded-md p-1'>
        <p className='font-semibold'>Active Peripheral Data</p>
      </div>
    </div>
  );
};

export default UserDetails;
