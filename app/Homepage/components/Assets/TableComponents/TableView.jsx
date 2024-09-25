import AssetSkeleton from "../AssetComponents/AssetSkeleton";
import Table from "./Table";
import NoItems from "@/app/SharedComponents/NoItems";
import { Divider } from "@nextui-org/react";

const TableView = ({
  all,
  optionTab,
  assetData,
  setActionStatus,
  actionStatus,
  assetLoading,
  selectedType,
}) => {
  const filterAsset = (opt) => {
    const newFilteredAsset = assetData?.filter((asset) => {
      if (selectedType === "laptop") {
        return asset?.item_stats === opt;
      } else if (selectedType === "monitor") {
        return asset?.status?.name === opt;
      } else if (selectedType === "peripheral") {
        return asset?.status?.name === opt;
      }
    });

    return newFilteredAsset;
  };

  return (
    <div className="h-full">
      {filterAsset(optionTab)?.length > 0 ? (
        <div>
          <p
            className={`font-medium px-2 tracking-wider ${
              all ? "block" : "hidden"
            }`}
          >
            {optionTab.toUpperCase()}
          </p>
          <div className="py-2">
            <Table
              assetData={filterAsset(optionTab)}
              setActionStatus={setActionStatus}
              actionStatus={actionStatus}
              assetLoading={assetLoading}
            />
          </div>
          <Divider className={`my-2 ${all ? "block" : "hidden"}`} />
        </div>
      ) : (
        <div className={`h-full ${all ? "hidden" : "block"}`}>
          <NoItems item={optionTab} />
        </div>
      )}
    </div>
  );
};

export default TableView;
