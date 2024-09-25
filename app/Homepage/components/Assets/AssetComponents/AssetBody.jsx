"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddAsset from "./Asset";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  assetDataAtom,
  fetchAssetDataAtom,
  globalActionStatusAtom,
  selectedTypeAtom,
} from "@/app/Homepage/AssetStore";
import { Divider, Tab, Tabs } from "@nextui-org/react";
import SearchBar from "@/app/SharedComponents/SearchBar";

import BlockView from "../AssetBlockView/BlockView";
import TableView from "../TableComponents/TableView";
import AssetSkeleton from "./AssetSkeleton";

const AssetBody = () => {
  const [globalActionStatus, setGlobalActionStatus] = useAtom(
    globalActionStatusAtom
  );
  const [actionStatus, setActionStatus] = useState(globalActionStatus);
  const [assetData, setAssetData] = useAtom(assetDataAtom);
  const [oldAssetData, setOldAssetData] = useState(null);
  const selectedType = useAtomValue(selectedTypeAtom);
  const [assetLoading, setAssetLoading] = useState(false);
  const fetchAssetData = useSetAtom(fetchAssetDataAtom);
  const [selected, setSelected] = useState(selectedType);
  const [searchQuery, setSearchQuery] = useState("");

  const [isViewBlock, setView] = useState(true);

  const [isAddModal, setAddModal] = useState(false);

  const handleActionStatus = (stat) => {
    setActionStatus(!stat);
  };

  const handleAddModal = () => {
    setAddModal((prev) => !prev);
  };

  const accordionItemOptions = {
    laptop: ["All", "Active", "SOH", "For Repair", "Irreparable", "OTHERS"],
    monitor: [
      "All",
      "Active",
      "Stock",
      "Issued",
      "Defective",
      "Archive",
      "Transfer",
    ],
    peripheral: [
      "All",
      "Active",
      "Stock",
      "Issued",
      "Defective",
      "Archive",
      "Transfer",
    ],
  };

  useEffect(() => {
    const handleFetchData = async () => {
      setAssetLoading(true);
      try {
        if (assetData === null || selected !== selectedType) {
          setSelected(selectedType);
          const asset = await fetchAssetData();
          if (asset.success) {
            setAssetData(asset.response);
            setOldAssetData(asset.response);
          } else {
            setAssetData([]);
            setOldAssetData([]);
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(() => {
          setAssetLoading(false);
        }, 2000);
      }
    };
    handleFetchData();
  }, [assetData, selectedType]);

  useEffect(() => {
    setSearchQuery("");
  }, [selectedType]);

  useEffect(() => {
    if (searchQuery === "") {
      setAssetData(oldAssetData);
    } else {
      const filtered = oldAssetData.filter(
        (asset) =>
          asset?.item?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          asset?.serial_number
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          asset?.asset_holder?.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          asset?.branch?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          asset?.peripheral_type
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          asset?.supplier?.name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
      setAssetData(filtered);
    }
  }, [searchQuery]);

  const handleChangeView = () => {
    setView((prev) => !prev);
  };

  const filterAsset = (item) => {
    const newFilteredAsset = assetData?.filter((asset) => {
      if (selectedType === "laptop") {
        return asset?.item_stats === item;
      } else if (selectedType === "monitor" || selectedType === "peripheral") {
        return asset?.status?.name === item;
      }
    });
    return newFilteredAsset;
  };

  const handleCountAll = () => {
    let total = 0;

    accordionItemOptions?.[selectedType].map(
      (item) => (total = total + filterAsset(item)?.length)
    );

    return total;
  };

  const skeletonCount = [1, 2, 3];

  return (
    <div className="overflow-hidden h-full p-2">
      <div className="h-[40px]">
        <SearchBar
          searchValue={searchQuery}
          setSearchValue={setSearchQuery}
          viewOption={true}
          addOption={true}
          isViewBlock={isViewBlock}
          changeView={handleChangeView}
          addAction={handleAddModal}
          dataIsLoading={assetLoading}
        />
      </div>
      <div className="pb-2 mt-2 h-[calc(100%-40px)]">
        <Tabs
          aria-label="tabs_for_option"
          isDisabled={assetLoading}
          classNames={{
            base: "w-full",
            panel:
              "p-2 overflow-y-auto bg-a-white h-[calc(100%-40px)] sm:rounded-tr-xl rounded-b-xl shadow-lg",
            tabList:
              "rounded-none p-0 pt-2 pr-2 gap-0 w-full sm:w-min overflow-x-auto flex-none",
            tab: "px-8 bg-a-grey rounded-t-lg rounded-b-none drop-shadow-brShadow data-[hover=true]:bg-a-grey",
            tabContent:
              "text-a-black tracking-wider font-medium group-data-[selected=true]:font-bold",
            cursor:
              "group-data-[selected=true]:bg-a-white rounded-b-none rounded-t-md",
          }}
        >
          {accordionItemOptions?.[selectedType].map((item, index) => (
            <Tab
              key={index}
              title={
                <div className="flex flex-row gap-2 items-center">
                  <p>{item.toUpperCase()}</p>
                  {(item === "All" || filterAsset(item)?.length > 0) && (
                    <div
                      className={`drop-shadow-xl rounded-full px-2 w-min h-[16px] flex text-[10px] items-center justify-center 
                        ${
                          (item === "Active" || item === "Issued") &&
                          "bg-a-green text-a-black"
                        } 
                         ${
                           (item === "SOH" || item === "Stock") &&
                           "bg-a-blue text-a-white"
                         } 
                        ${
                          (item === "For Repair" ||
                            item === "Defective" ||
                            item === "Irreparable") &&
                          "bg-a-red text-a-white"
                        }
                        ${
                          (item === "Archive" ||
                            item === "OTHERS" ||
                            item === "Transfer") &&
                          "bg-a-orange text-a-white"
                        }
                         ${item === "All" && "bg-a-darkgrey text-a-black"}
                        `}
                    >
                      {item === "All"
                        ? handleCountAll().toString()
                        : filterAsset(item)?.length}
                    </div>
                  )}
                </div>
              }
            >
              <div className="h-full">
                {isViewBlock ? (
                  !assetLoading ? (
                    item === "All" ? (
                      <div className="p-2 h-full">
                        {accordionItemOptions?.[selectedType].map(
                          (items, index) => (
                            <div key={items}>
                              <BlockView
                                isLoading={assetLoading}
                                setActionStatus={handleActionStatus}
                                type={selectedType}
                                optionTab={items}
                                all={true}
                              />
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <div className="p-2 h-full">
                        <BlockView
                          isLoading={assetLoading}
                          setActionStatus={handleActionStatus}
                          type={selectedType}
                          optionTab={item}
                        />
                      </div>
                    )
                  ) : (
                    <div className="p-2">
                      {item === "All" ? (
                        skeletonCount.map((items, index) => (
                          <div key={items}>
                            <AssetSkeleton type={"block"} tab={item} />
                            <Divider
                              className={`${
                                skeletonCount.length - 1 === index
                                  ? "hidden"
                                  : "block"
                              } my-2`}
                            />
                          </div>
                        ))
                      ) : (
                        <AssetSkeleton type={"block"} tab={item} />
                      )}
                    </div>
                  )
                ) : !assetLoading ? (
                  <div className="p-2 h-full">
                    {item === "All" ? (
                      accordionItemOptions?.[selectedType].map((items) => (
                        <div key={items}>
                          <TableView
                            key={items}
                            all={true}
                            optionTab={items}
                            selectedType={selectedType}
                            assetData={assetData}
                            setActionStatus={setActionStatus}
                            actionStatus={actionStatus}
                            assetLoading={assetLoading}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="h-full">
                        <TableView
                          optionTab={item}
                          selectedType={selectedType}
                          assetData={assetData}
                          setActionStatus={setActionStatus}
                          actionStatus={actionStatus}
                          assetLoading={assetLoading}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-2 space-y-4">
                    {item === "All" ? (
                      skeletonCount.map((items, index) => (
                        <div key={items}>
                          <AssetSkeleton
                            key={items}
                            type={"table"}
                            tab={item}
                          />
                          <Divider
                            className={`${
                              skeletonCount.length - 1 === index
                                ? "hidden"
                                : "block"
                            } my-2`}
                          />
                        </div>
                      ))
                    ) : (
                      <AssetSkeleton type={"table"} tab={item} />
                    )}
                  </div>
                )}
              </div>
            </Tab>
          ))}
        </Tabs>
      </div>

      <AddAsset
        setActionStatus={handleActionStatus}
        actionStatus={actionStatus}
        isOpen={isAddModal}
        onclose={handleAddModal}
      />
    </div>
  );
};

export default AssetBody;
