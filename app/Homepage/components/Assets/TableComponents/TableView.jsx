import Table from "./Table";

const TableView = ({
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
    <div>
      <Table
        assetData={filterAsset(optionTab)}
        setActionStatus={setActionStatus}
        actionStatus={actionStatus}
        assetLoading={assetLoading}
      />
    </div>
  );
};

export default TableView;
