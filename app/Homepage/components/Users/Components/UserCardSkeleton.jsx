import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Skeleton,
} from "@nextui-org/react";

const UserCardSkeleton = () => {
  return (
    <div>
      <Card className={`bg-a-lightgrey/60 rounded-md drop-shadow-lg p-[4px]`}>
        <CardHeader
          className={`h-4 font-bold flex items-center justify-center rounded-t-md border-b border-a-grey`}
        >
          <Skeleton className="h-2 w-full rounded-full bg-a-grey/60" />
        </CardHeader>
        <CardBody>
          <div className="space-y-2">
            <div className="flex w-full items-center gap-3 border-b border-a-grey pb-2">
              {/* bug: disableanimation in avatar, search will fix in nextui version v2.4.3 */}
              <Skeleton className="h-[40px] w-[40px] flex-none rounded-full bg-a-grey/40" />
              <div className="w-full space-y-2">
                <Skeleton className="h-2 w-full rounded-full bg-a-grey/60" />
                <Skeleton className="h-2 w-full rounded-full bg-a-grey/60" />
              </div>
            </div>
            <div className="flex flex-col px-2 w-full space-y-2">
              <Skeleton className="h-2 w-full rounded-full bg-a-grey/60" />
              <Skeleton className="h-2 w-full rounded-full bg-a-grey/60" />
              <Skeleton className="h-2 w-full rounded-full bg-a-grey/60" />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserCardSkeleton;
