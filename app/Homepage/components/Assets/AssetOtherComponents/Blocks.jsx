import React from "react";
import { SlOptionsVertical } from "react-icons/sl";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Card,
  CardHeader,
  Divider,
  CardBody,
  Avatar,
} from "@nextui-org/react";
import { isValid } from "date-fns";

const Blocks = ({ selectAsset, asset, delAsset }) => {
  const formatDate = (opt) => {
    if (isValid(new Date(opt))) {
      const formattedDate = new Date(opt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      return formattedDate;
    } else {
      return "No Date";
    }
  };
  return (
    <Card className='border hover: cursor-pointer rounded-md p-1'>
      <CardHeader className='flex w-full justify-start items-center'>
        <Dropdown>
          <DropdownTrigger>
            <div className='w-7 h-7 text-gray-800 hover:bg-gray-200 transition-all rounded-md flex items-center justify-center p-1'>
              <SlOptionsVertical size={14} />
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label='Static Actions'>
            <DropdownItem key='expand' onClick={() => selectAsset(asset)}>
              Expand
            </DropdownItem>
            <DropdownItem
              key='delete'
              className='text-danger'
              color='danger'
              onClick={() => delAsset(asset)}
            >
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <p className=' font-semibold'> {asset?.item}</p>{" "}
      </CardHeader>
      <Divider />
      <CardBody>
        <div className='flex flex-col mb-2'>
          {asset?.category === "laptop" ? (
            <>
              <p className='flex justify-between w-full text-sm'>
                Status:{" "}
                <span className='font-semibold'>
                  {asset?.item_stats} {asset?.branch}
                </span>
              </p>
              <p
                className={`flex justify-between items-center w-full text-sm `}
              >
                Condition:{" "}
                <span
                  className={`${asset?.status?.color} text-white text-xs p-1 rounded-md`}
                >
                  {asset?.status?.name}
                </span>
              </p>
              <p className='flex justify-between w-full text-xs mt-2 text-gray-700'>
                Last Updated: <span>{formatDate(asset?.last_updated)}</span>
              </p>
            </>
          ) : asset?.category === "monitor" ? (
            <>
              <p className='flex justify-between w-full'>
                Status:{" "}
                <span
                  className={`${asset?.status?.color} text-white text-xs p-1 rounded-md`}
                >
                  {asset?.status?.name} {asset?.branch}
                </span>
              </p>
              <p className='flex justify-between w-full text-xs mt-2 text-gray-700'>
                Last Updated: <span>{formatDate(asset?.last_updated)}</span>
              </p>
            </>
          ) : (
            <>
              <p className='flex justify-between w-full font-semibold text-amber-500'>
                {asset?.peripheral_type}
              </p>
              <p className='flex justify-between w-full'>
                Status:{" "}
                <span
                  className={`${asset?.status?.color} text-white text-xs p-1 rounded-md`}
                >
                  {asset?.status?.name} {asset?.branch}
                </span>
              </p>
              <p className='flex justify-between w-full text-xs mt-2 text-gray-700'>
                Last Updated: <span>{formatDate(asset?.last_updated)}</span>
              </p>
            </>
          )}
        </div>
        <Divider />
        <div className='flex flex-col mt-2'>
          <p className='text-sm font-semibold'>Current Holder:</p>
          {asset?.asset_holder !== null ? (
            <div className='flex gap-3 items-center'>
              <Avatar src={asset?.asset_holder?.picture} />
              <div className='flex flex-col mt-1 '>
                <p className='text-sm font-semibold'>
                  {asset?.asset_holder?.name}{" "}
                </p>
                <p className='text-xs flex flex-wrap'>
                  {asset?.asset_holder?.email}
                </p>
                <div className='text-xs'>
                  Issued on:{" "}
                  <span className='text-xs font-semibold'>
                    {formatDate(asset?.doi)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className='text-sm text-green-500'>On Stock</p>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default Blocks;
