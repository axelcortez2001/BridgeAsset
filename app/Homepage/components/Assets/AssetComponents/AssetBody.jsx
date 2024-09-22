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
import { Tab, Tabs } from "@nextui-org/react";
import SearchBar from "@/app/SharedComponents/SearchBar";

import BlockView from "../AssetBlockView/BlockView";
import TableView from "../TableComponents/TableView";

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
    laptop: ["Active", "SOH", "For Repair", "Irreparable", "OTHERS"],
    monitor: ["Active", "Stock", "Issued", "Defective", "Archive", "Transfer"],
    peripheral: [
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
      console.log(selected);
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
        setAssetLoading(false);
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

  return (
    <div className="overflow-hidden h-full">
      <div className="h-[40px]">
        <SearchBar
          searchValue={searchQuery}
          setSearchValue={setSearchQuery}
          viewOption={true}
          addOption={true}
          isViewBlock={isViewBlock}
          changeView={handleChangeView}
          addAction={handleAddModal}
        />
      </div>
      <div className="px-2 pb-2 mt-2 h-[calc(100%-40px)]">
        <Tabs
          aria-label="tabs_for_option"
          classNames={{
            base: "w-full",
            panel:
              "p-2 overflow-y-auto border-a-white bg-a-white h-[calc(100%-40px)] sm:rounded-tr-xl rounded-b-xl shadow-lg",
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
                  {filterAsset(item)?.length > 0 && (
                    <div
                      className={`drop-shadow-xl rounded-full px-2 w-min h-[16px] flex text-[10px] items-center justify-center 
                        ${
                          (item === "Active" ||
                            item === "SOH" ||
                            item === "Stock" ||
                            item === "Issued") &&
                          "bg-a-green text-a-black"
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
                        `}
                    >
                      {filterAsset(item)?.length}
                    </div>
                  )}
                </div>
              }
            >
              <div>
                {isViewBlock ? (
                  <div className="p-2">
                    <BlockView
                      setActionStatus={handleActionStatus}
                      type={selectedType}
                      optionTab={item}
                    />
                  </div>
                ) : (
                  <div className="p-2">
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
