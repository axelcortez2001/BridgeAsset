import React, { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import { useAtomValue } from "jotai";
import { sideBarLocation } from "./AssetStore";
import Dashboard from "./components/Dashboard/page";
import Assets from "./components/Assets/page";
import UserPage from "./components/Users/UserPage";
import { filterIcon, menuIcon } from "@/public/Icon";

const MainContent = () => {
  const [isSidebar, setSidebar] = useState(false);
  const [isSideNavBar, setSideNavBar] = useState(false);
  const location = useAtomValue(sideBarLocation);

  const divContainer = "transition-all duration-[.40s] h-full overflow-hidden";

  return (
    <div className="w-full h-screen text-base flex overflow-hidden">
      <div
        className={`${divContainer} fixed w-[300px] z-[50] drop-shadow-lg  ${
          isSidebar
            ? "translate-x-[0px]  md:translate-x-[0px]"
            : "-translate-x-[300px]  md:translate-x-[0px]"
        }`}
      >
        <Sidebar onClose={(e) => setSidebar(e)} />
      </div>

      <div
        className={`transition duration-[.80s] fixed h-full w-full ${
          isSidebar
            ? "bg-a-black/40 md:bg-transparent md:bg-[none] backdrop-blur-sm md:backdrop-blur-none z-[49]"
            : "backdrop-blur-none z-[-1]"
        }`}
        onClick={() => {
          if (isSidebar) {
            setSidebar(false);
          }
        }}
      />

      <div
        className={` ${divContainer}  
        w-full md:translate-x-[300px] md:w-[calc(100%-300px)]`}
      >
        <div
          className={`w-full h-[48px] bg-a-blue flex items-center justify-start`}
        >
          <div
            className=" ml-2 block md:hidden"
            onClick={() => setSidebar((prev) => !prev)}
          >
            {menuIcon(
              "transition-all duration-[.4s] text-a-white/80 hover:text-a-white h-[32px] w-[32px] cursor-pointer hover:scale-[1.05]"
            )}
          </div>
          <div>
            <p className="p-2 tracking-widest font-bold text-a-white">
              {location.toUpperCase()}
            </p>
          </div>

          <div
            className={` ml-2 absolute right-2 ${
              location === "dashboard" ? "block" : "hidden"
            } lg:hidden`}
            onClick={() => setSideNavBar((prev) => !prev)}
          >
            {filterIcon(
              "transition-all duration-[.4s] text-a-white/80 hover:text-a-white h-[32px] w-[32px] cursor-pointer hover:scale-[1.05]"
            )}
          </div>
        </div>

        <div className="h-[calc(100%-48px)] bg-a-grey/40 overflow-auto">
          {location && location === "dashboard" ? (
            <Dashboard
              isSideNavBar={isSideNavBar}
              setSideNavBar={(e) => setSideNavBar(e)}
            />
          ) : location === "assets" ? (
            <Assets />
          ) : (
            <UserPage />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
