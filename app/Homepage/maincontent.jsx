import React from "react";
import Sidebar from "./components/sidebar";
import { useAtomValue } from "jotai";
import { sideBarLocation } from "./AssetStore";
import Dashboard from "./components/Dashboard/page";
import Assets from "./components/Assets/page";

const MainContent = () => {
  const location = useAtomValue(sideBarLocation);
  return (
    <div className='w-full flex flex-row max-h-screen'>
      <Sidebar />
      {location && location === "dashboard" ? (
        <Dashboard />
      ) : (
        location === "assets" && <Assets />
      )}
    </div>
  );
};

export default MainContent;
