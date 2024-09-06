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
    <div className="w-full h-screen text-base flex">
      <div className="h-full w-[0px] md:w-[300px] overflow-hidden border-2 border-a-green">
        <Sidebar />
      </div>
      <div className="h-full w-full md:w-[calc(100%-300px)]  border-2 border-a-red">
        <div className="h-[36px] p-[4px]">
          asd
        </div>
        {location && location === "dashboard" ? (
          <Dashboard />
        ) : location === "assets" ? (
          <Assets />
        ) : (
          <UserPage />
        )}
      </div>
    </div>
  );
};

export default MainContent;
