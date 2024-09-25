import React, { useEffect, useState } from "react";
import { Avatar, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import ViewUserModal from "./ViewUserModal";

const UserCard = ({ user, checkStat, tabLoc, tabSelect, userComplete }) => {
  const locationData = ["Laptop", "Monitor", "Peripheral"];
  const [isUserDetails, setUserDetails] = useState(false);
  const [completeAsset, setCompleteAsset] = useState(false);

  const checkLaptop = checkStat(user, "laptop");
  const checkMonitor = checkStat(user, "monitor");
  const checkPeripheral = checkStat(user, "peripheral");

  useEffect(() => {
    if (checkLaptop && checkMonitor && checkPeripheral) {
      setCompleteAsset(true);
    }
  }, [checkLaptop, checkMonitor, checkPeripheral]);

  // {
  //   locationData.map((data) => {
  //     console.log(checkStat(user, data.toLocaleLowerCase()));
  //   });
  // }

  const summaryData = (loc) => {
    if (loc === "All") {
      return locationData.map((data, index) => (
        <div key={index} className="flex  gap-2 flex-row">
          <p>{data}:</p>
          {checkStat(user, data.toLocaleLowerCase()) ? (
            <p className="text-h-green">Issued</p>
          ) : (
            <p className="text-h-red ">No Issued</p>
          )}
        </div>
      ));
    } else {
      return (
        <div className="flex  gap-2 flex-row">
          <p>{loc}:</p>
          <div>
            {checkStat(user, loc.toLocaleLowerCase()) ? (
              <p className="text-h-green">Issued</p>
            ) : (
              <p className="text-h-red ">No Issued</p>
            )}
          </div>
        </div>
      );
    }
  };

  const checkVisibility = () => {
    const stat = checkStat(user, tabLoc.toLocaleLowerCase())
      ? "Active"
      : "No Issued";
    if (tabSelect !== "All") {
      if (stat.toLocaleLowerCase() !== tabSelect.toLocaleLowerCase()) {
        return "hidden";
      }
    }
  };

  const handleViewDetails = () => {
    setUserDetails((prev) => !prev);
  };

  return (
    <>
      <div
        onClick={handleViewDetails}
        className={`${checkVisibility()} ${
          userComplete === "Complete"
            ? `${completeAsset ? "block" : "hidden"}`
            : `${
                userComplete === "Incomplete"
                  ? `${!completeAsset ? "block" : "hidden"}`
                  : "block"
              }`
        }`}
      >
        <Card
          key={user._id}
          className={`
     hover:cursor-pointer hover:bg-a-grey/40 hover:scale-[.98] bg-a-white rounded-md drop-shadow-lg`}
        >
          <CardHeader
            className={`h-4 font-bold flex items-center justify-center ${
              completeAsset
                ? "bg-a-green text-a-black"
                : "bg-a-red text-a-white"
            }  rounded-t-md`}
          >
            <div>{completeAsset ? "Complete" : "Incomplete"}</div>
          </CardHeader>
          <CardBody>
            <div className="space-y-2">
              <div className="flex w-full items-center gap-3 border-b border-a-grey pb-2">
                {/* bug: disableanimation in avatar, search will fix in nextui version v2.4.3, sept 25 - not yet fix ill just change it to img */}
                {/* https://github.com/nextui-org/nextui/issues/3257 */}
                {/* <Avatar src={user?.picture} alt="user_picture" /> */}
                <div>
                  <Image
                    src={user?.picture}
                    alt="user_picture"
                    className="rounded-full h-10 w-10"
                  />
                </div>

                <div className="leading-none">
                  <p className=" text-md font-semibold">{user?.name}</p>
                  <p className="text-sm">{user?.email}</p>
                </div>
              </div>
              <div className="flex flex-col px-2">{summaryData(tabLoc)}</div>
            </div>
          </CardBody>
        </Card>
      </div>

      <ViewUserModal
        isOpen={isUserDetails}
        onClose={handleViewDetails}
        user={user}
      />
    </>
  );
};

export default UserCard;
