import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
} from "@nextui-org/react";
import React from "react";

const AssetSkeleton = ({ type, tab }) => {
  const containerSharedStyle = "w-full p-2";
  const skeletonSharedStyle = "w-full h-[12px] rounded bg-a-grey/40";

  const skeletonCount = [1, 2, 3, 4, 5];
  const skeletonCount2 = [1, 2, 3];
  const rowCount = [1, 2, 3];

  return (
    <>
      {type === "block" ? (
        <div>
          <div className={`${tab === "All" ? "block" : "hidden"} p-2`}>
            <Skeleton
              className={`!w-[20%] !h-[8px] !rounded-lg ${skeletonSharedStyle}`}
            />
          </div>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 py-2`}
          >
            {skeletonCount2.map((item) => (
              <div key={item}>
                <Card className="w-full rounded-md bg-a-white text-a-black bg-a-lightgrey/60 p-[6px]">
                  <CardHeader
                    className={`border-b border-a-grey ${containerSharedStyle}`}
                  >
                    <Skeleton
                      className={`!w-[80%] !h-2 ${skeletonSharedStyle}`}
                    />
                  </CardHeader>
                  <CardBody
                    className={`border-b border-a-grey ${containerSharedStyle}`}
                  >
                    <div className="flex space-x-2">
                      <div className="space-y-2 w-[80%] h-full">
                        <Skeleton className={`${skeletonSharedStyle}`} />
                        <Skeleton className={`${skeletonSharedStyle}`} />
                        <Skeleton className={`${skeletonSharedStyle}`} />
                      </div>
                      <div className="space-y-2 w-[20%] h-full">
                        <Skeleton className={`${skeletonSharedStyle}`} />
                        <Skeleton className={`${skeletonSharedStyle}`} />
                        <Skeleton className={`${skeletonSharedStyle}`} />
                      </div>
                    </div>
                  </CardBody>
                  <CardFooter
                    className={`flex flex-col gap-2 ${containerSharedStyle}`}
                  >
                    <div className="w-full flex ">
                      <Skeleton
                        className={`!w-[40%] !h-2 ${skeletonSharedStyle}`}
                      />
                    </div>
                    <div className="flex flex-row items-center w-full gap-2">
                      <Skeleton
                        className={`!w-12 !h-12 flex-none !rounded-full ${skeletonSharedStyle}`}
                      />
                      <div className="flex flex-col justify-center gap-2 w-full bg-a-white">
                        <Skeleton
                          className={`w-full !h-2 ${skeletonSharedStyle}`}
                        />
                        <Skeleton
                          className={`w-full !h-2 ${skeletonSharedStyle}`}
                        />
                        <Skeleton
                          className={`w-full !h-2 ${skeletonSharedStyle}`}
                        />
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className={`${tab === "All" ? "mb-2 block" : "hidden"}`}>
            <Skeleton
              className={`!w-[20%] !h-[8px] !rounded-lg ${skeletonSharedStyle}`}
            />
          </div>
          <div className="py-2">
            <Card className="w-full rounded-md bg-a-lightgrey/40 ">
              <CardBody className="w-full h-full p-0">
                <div className="w-full h-full border-b border-a-grey flex flex-col ">
                  {rowCount.map((item) => (
                    <div key={item} className="flex">
                      <div className="border-r w-[280px] h-[40px] border-b flex items-center justify-center ">
                        <Skeleton
                          className={`!w-[80%] !h-[8px] ${skeletonSharedStyle}`}
                        />
                      </div>
                      <div className="w-[calc(100%-280px)] flex">
                        {skeletonCount.map((item) => (
                          <div
                            key={item}
                            className="border-r flex-1 flex items-center justify-center border-b"
                          >
                            <Skeleton
                              className={`!w-[80%] !h-[8px]  ${skeletonSharedStyle}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default AssetSkeleton;
