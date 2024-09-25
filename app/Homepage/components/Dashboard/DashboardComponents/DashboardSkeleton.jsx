import DropdownFilter from "@/app/SharedComponents/DropdownFilter";
import {
  Card,
  CardBody,
  Divider,
  Listbox,
  ListboxItem,
  Skeleton,
  skeleton,
} from "@nextui-org/react";
import React from "react";

const DashboardSkeleton = ({ className, type }) => {
  const sharedSkeletonStyle = " rounded-lg bg-a-grey/80 ";
  const sharedContainerStyle =
    "w-full bg-a-lightgrey/60 rounded-md drop-shadow-lg";

  const skeletonType = {
    item: (
      <Card className={`h-[80px] ${sharedContainerStyle}`}>
        <CardBody className="p-2">
          <div className="flex items-center justify-between w-full h-full">
            <div className="flex flex-col justify-center w-full h-full space-y-2">
              <Skeleton className={`h-[14px] w-[80%] ${sharedSkeletonStyle}`} />
              <Skeleton
                className={`h-[10px] w-[100%] ${sharedSkeletonStyle}`}
              />
            </div>
            <Divider orientation="vertical" className="mx-4" />
            <div className="w-[20%] h-full flex items-center justify-center text-3xl font-bold tracking-widest text-a-blue">
              <Skeleton className="h-12 w-12 rounded-lg flex-none" />
            </div>
          </div>
        </CardBody>
      </Card>
    ),
    cost: (
      <Card className={`h-min ${sharedContainerStyle}`}>
        <CardBody className="p-2">
          <div className="w-full h-full">
            <div className="h-[calc(100%-30px)] flex flex-col justify-center space-y-2 mb-2">
              <Skeleton className={`h-[14px] w-[80%] ${sharedSkeletonStyle}`} />
              <Skeleton
                className={`h-[10px] w-[100%] ${sharedSkeletonStyle}`}
              />
            </div>
            <div className="h-[30px] text-a-blue tracking-wider flex flex-col justify-center border-t border-a-grey ">
              <Skeleton className={`h-2 w-[60%] ${sharedSkeletonStyle}`} />
            </div>
          </div>
        </CardBody>
      </Card>
    ),
    graph: (
      <Card className={`h-[440px] ${sharedContainerStyle}`}>
        <CardBody>
          <div className="w-full h-full">
            <div className="flex items-center border-b border-a-grey h-[40px]">
              <Skeleton className={`h-[14px] w-[80%] ${sharedSkeletonStyle}`} />
            </div>
            <div className="flex items-center h-[calc(100%-40px)] w-full pt-2">
              <Skeleton className={`h-full w-full ${sharedSkeletonStyle}`} />
            </div>
          </div>
        </CardBody>
      </Card>
    ),
    sidebar: (
      <div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton
              className={`h-[20px] w-[60%]  !bg-a-grey/20 lg:!bg-a-grey/60 ${sharedSkeletonStyle}`}
            />
            <div className="flex flex-row items-center gap-2">
              <Skeleton
                className={`h-[20px] w-[40%]  !bg-a-grey/20 lg:!bg-a-grey/60 ${sharedSkeletonStyle}`}
              />
              <Skeleton
                className={`h-[28px] w-[100%]  !bg-a-grey/20 lg:!bg-a-grey/60 ${sharedSkeletonStyle}`}
              />
            </div>
          </div>
          <Skeleton
            className={`h-[20px] w-[60%]  !bg-a-grey/20 lg:!bg-a-grey/60 ${sharedSkeletonStyle}`}
          />
          <div className="flex flex-col justify-center gap-2 ml-8">
            <Skeleton
              className={`h-[20px] w-[80%]  !bg-a-grey/20 lg:!bg-a-grey/60 ${sharedSkeletonStyle}`}
            />
            <Skeleton
              className={`h-[20px] w-[80%]  !bg-a-grey/20 lg:!bg-a-grey/60 ${sharedSkeletonStyle}`}
            />
            <Skeleton
              className={`h-[20px] w-[80%]  !bg-a-grey/20 lg:!bg-a-grey/60 ${sharedSkeletonStyle}`}
            />
            <Skeleton
              className={`h-[20px] w-[80%]  !bg-a-grey/20 lg:!bg-a-grey/60 ${sharedSkeletonStyle}`}
            />
            <Skeleton
              className={`h-[20px] w-[80%]  !bg-a-grey/20 lg:!bg-a-grey/60 ${sharedSkeletonStyle}`}
            />
          </div>
        </div>
      </div>
    ),
  };

  return <>{skeletonType?.[type]}</>;
};

export default DashboardSkeleton;
