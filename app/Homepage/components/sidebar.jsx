import { signOut } from "aws-amplify/auth";
import { useAtomValue, useSetAtom } from "jotai";
import React from "react";
import { setSideBarLocation, sideBarLocation } from "../AssetStore";

const Sidebar = () => {
  const dashboardLocation = useAtomValue(sideBarLocation);
  const setDashboardLocation = useSetAtom(setSideBarLocation);

  const handleNavigation = (location) => {
    setDashboardLocation(location);
  };
  return (
    <div className='h-screen w-80 border flex flex-col justify-start items-center relative p-2'>
      <div className='w-full  text-center'>
        <p className='text-xl font-semibold'>Asset Management</p>
      </div>
      <div className='w-full flex-col space-y-3'>
        <div
          onClick={() => handleNavigation("dashboard")}
          className='border p-2 w-full text-center rounded-md mt-3 hover:cursor-pointer'
        >
          Dashboard
        </div>
        <div
          onClick={() => handleNavigation("assets")}
          className='border p-2 w-full text-center rounded-md mt-3 hover:cursor-pointer'
        >
          Assets
        </div>
      </div>
      <button
        className='absolute bottom-2 p-2 border rounded-md'
        onClick={signOut}
      >
        Signout
      </button>
    </div>
  );
};

export default Sidebar;
