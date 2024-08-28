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

const TotalCostCard = ({ cost }) => {
  return (
    <Card className='max-w-[400px]'>
      <CardHeader className='flex gap-3'>
        <div className='flex flex-col'>
          <p className='text-md'>Total Cost</p>
          <p className='text-small text-default-500'>
            Cost accumulated from all assets
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>PHP {cost}</p>
      </CardBody>
      {/* <Divider />
      <CardFooter></CardFooter> */}
    </Card>
  );
};

export default TotalCostCard;
