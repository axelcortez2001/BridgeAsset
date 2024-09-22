import React, { useState } from "react";
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
  useDisclosure,
  CardFooter,
} from "@nextui-org/react";
import { isValid } from "date-fns";
import ViewModal from "./ViewModal";

const Blocks = ({ selectAsset, asset, delAsset }) => {
  const [isExpand, setExpand] = useState(false);

  const handleSelectAsset = () => {
    selectAsset(asset);
    onOpenChange(false);
  };

  const handleExpand = () => {
    setExpand((prev) => !prev);
  };

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

  const optionDropdown = (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <SlOptionsVertical size={14} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="expand" onPress={handleExpand}>
          Expand
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          onClick={() => delAsset(asset)}
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );

  const resultSharedStyle = "text-sm font-medium";
  const statusContainerSharedStyle =
    "flex items-center text-a-white px-2 rounded-lg";

  return (
    <>
      <Card className="rounded-md bg-a-white">
        <CardHeader className="flex h-12 justify-between items-center border-b w-full">
          <p className=" font-semibold"> {asset?.item}</p>
          {optionDropdown}
        </CardHeader>
        <CardBody className="border-b p-2">
          <div className="flex flex-col justify-center h-full">
            {asset?.category === "laptop" ? (
              <div>
                <div className="flex justify-between">
                  <p>Status:</p>
                  <p className={`${resultSharedStyle}`}>
                    {asset?.item_stats}, {asset?.branch}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>Condition:</p>
                  <div
                    className={`${asset?.status?.color} ${statusContainerSharedStyle} `}
                  >
                    <p className={`${resultSharedStyle}`}>
                      {asset?.status?.name}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <p>Last Updated:</p>
                  <p className={`${resultSharedStyle}`}>
                    {formatDate(asset?.last_updated)}
                  </p>
                </div>
              </div>
            ) : asset?.category === "monitor" ? (
              <div>
                <div className="flex justify-between">
                  <p>Status:</p>
                  <div
                    className={`${asset?.status?.color} ${statusContainerSharedStyle}`}
                  >
                    <p className={`${resultSharedStyle}`}>
                      {asset?.status?.name} {asset?.branch}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <p>Last Updated:</p>
                  <p className={`${resultSharedStyle}`}>
                    {formatDate(asset?.last_updated)}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <div className="text-a-orange font-bold">
                    {asset?.peripheral_type}
                  </div>
                  <div className="flex justify-between">
                    <p>Status:</p>
                    <div
                      className={`${asset?.status?.color} ${statusContainerSharedStyle}`}
                    >
                      <p className={`${resultSharedStyle}`}>
                        {asset?.status?.name} {asset?.branch}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <p>Last Updated:</p>
                    <p className={`${resultSharedStyle}`}>
                      {formatDate(asset?.last_updated)}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardBody>
        <CardFooter>
          <div className="flex flex-col w-full">
            <p className="text-sm font-semibold">Current Holder:</p>
            {asset?.asset_holder !== null ? (
              <div className="flex gap-3 items-center">
                <Avatar src={asset?.asset_holder?.picture} />
                <div className="flex flex-col mt-1 ">
                  <p className="text-sm font-semibold">
                    {asset?.asset_holder?.name}{" "}
                  </p>
                  <p className="text-xs flex flex-wrap">
                    {asset?.asset_holder?.email}
                  </p>
                  <div className="text-xs">
                    Issued on:{" "}
                    <span className="text-xs font-semibold">
                      {formatDate(asset?.doi)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-green-500">On Stock</p>
            )}
          </div>
        </CardFooter>
      </Card>

      <ViewModal
        isOpen={isExpand}
        onClose={handleExpand}
        asset={asset}
        selectAsset={handleSelectAsset}
      />
    </>
  );
};

export default Blocks;
