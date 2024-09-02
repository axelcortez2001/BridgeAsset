import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";

import React from "react";

const TotalCostCard = ({ cost, loc }) => {
  return (
    <Card className='max-w-[400px]  hover:cursor-pointer hover:transform'>
      <CardHeader className='flex gap-3'>
        <div className='flex flex-col'>
          <p className='text-xl capitalize font-semibold '>{loc} Cost</p>
          <p className='text-small text-default-500'>
            Cost accumulated from all assets
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className='text-blue-400'>PHP {cost}</p>
      </CardBody>
    </Card>
  );
};

export default TotalCostCard;
