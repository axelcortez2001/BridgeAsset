import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
const TotalCostCard = ({ cost, loc }) => {
  //tailwind
  const headerTitle = "text-xl capitalize font-semibold";
  const headerSubTitle = "text-small text-default-500";

  return (
    <Card className="w-full h-full bg-a-white rounded-none ss:rounded-md ">
      {loc === "total item" ? (
        <>
          <CardBody className="flex items-center justify-center">
            <div className="flex items-center justify-between w-full h-full p-2">
              <div className="w-full h-full">
                <p className={headerTitle}>Total Items</p>
                <p className={headerSubTitle}>
                  Total Laptop, Monitor and Peripheral items
                </p>
              </div>
              <Divider orientation="vertical" className="mx-4" />
              <div className="w-[20%] h-full flex items-center justify-center text-3xl font-bold tracking-widest text-a-blue">
                {cost}
              </div>
            </div>
          </CardBody>
        </>
      ) : (
        <>
          <CardBody className="h-full overflow-hidden">
            <div className="w-full h-full">
              <div className="h-[calc(100%-30px)] flex flex-col">
                <p className={headerTitle}>{loc} Cost</p>
                <p className={headerSubTitle}>
                  Cost accumulated from {loc} assets
                </p>
              </div>
              <div className="h-[10px]">
                <Divider />
              </div>
              <div className="h-[20px] text-a-blue tracking-wider flex items-center ">
                <p>PHP {cost}</p>
              </div>
            </div>
          </CardBody>
        </>
      )}
    </Card>
  );
};

export default TotalCostCard;
