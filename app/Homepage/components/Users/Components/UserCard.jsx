import React from "react";
import {
  Tabs,
  Tab,
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";

const UserCard = ({ key, user, checkStat, tabLoc, tabSelect }) => {
  const locationData = ["Laptop", "Monitor", "Peripheral"];
  const summaryData = (loc) => {
    if (loc === "All") {
      return locationData.map((data) => (
        <div className='flex  gap-2 flex-row'>
          <p>{data}:</p>
          {checkStat(user, data.toLocaleLowerCase()) ? (
            <p className='text-green-500'>Active</p>
          ) : (
            <p className='text-red-400'>No Issued</p>
          )}
        </div>
      ));
    } else {
      return (
        <div className='flex  gap-2 flex-row'>
          <p>{loc}:</p>
          {checkStat(user, loc.toLocaleLowerCase()) ? (
            <p className='text-green-500'>Active</p>
          ) : (
            <p className='text-red-400'>No Issued</p>
          )}
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
  return (
    <Card
      key={key}
      className={`
    ${checkVisibility()} hover:cursor-pointer`}
    >
      <CardHeader>
        <div className='flex w-full items-center gap-3'>
          <Avatar src={user?.picture}></Avatar>
          <p className='font-semibold'>{user?.name}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className='flex flex-col'>{summaryData(tabLoc)}</div>
      </CardBody>
      <Divider />
      <CardFooter>See more</CardFooter>
    </Card>
  );
};

export default UserCard;
