import React from "react";
import Sidebar from "./components/sidebar";
import { useAtomValue } from "jotai";
import { sideBarLocation } from "./AssetStore";
import Dashboard from "./components/Dashboard/page";
import Assets from "./components/Assets/page";
import UserPage from "./components/Users/UserPage";

const MainContent = () => {
  const location = useAtomValue(sideBarLocation);
  return (
    <div className='w-full flex flex-row max-h-screen'>
      <Sidebar />
      {location && location === "dashboard" ? (
        <Dashboard />
      ) : location === "assets" ? (
        <Assets />
      ) : (
        <UserPage />
      )}
    </div>
  );
};

export default MainContent;
