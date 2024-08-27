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
import LaptopBlockView from "../AssetBlockView/LaptopBlockView";
import MonitorBlockView from "../AssetBlockView/MonitorBlockView";
import PeripheralBlockVIew from "../AssetBlockView/PeripheralBlockVIew";
import { IoAddSharp } from "react-icons/io5";
import { Input, Tab, Tabs } from "@nextui-org/react";
import Table from "../TableComponents/Table";
import TableGateWay from "../TableComponents/TableGateWay";

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
  const [tabState, setTabState] = useState("Block");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleActionStatus = (stat) => {
    setActionStatus(!stat);
  };
  const handleTabChange = (tab) => {
    setTabState(tab);
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
  const [searchQuery, setSearchQuery] = useState("");
  console.log(assetData);
  useEffect(() => {
    if (isSearchOpen) {
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
    }
  }, [searchQuery]);
  return (
    <div className=''>
      <div className='w-full sticky top-0 z-50  bg-white'>
        <AnimatePresence>
          {actionStatus && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "" }} // 24rem is equivalent to h-96 in Tailwind CSS
              exit={{ opacity: 0, height: 0 }}
              className='border w-full overflow-hidden'
            >
              <AddAsset
                setActionStatus={handleActionStatus}
                actionStatus={actionStatus}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div className='flex items-center gap-2'>
          {!actionStatus ? (
            <div>
              <button
                className='border rounded-md p-2 bg-amber-500'
                onClick={() => handleActionStatus(actionStatus)}
              >
                <IoAddSharp />
              </button>
            </div>
          ) : null}
          <div>
            <Tabs selectedKey={tabState} onSelectionChange={handleTabChange}>
              <Tab key='Block' title='Block' />
              <Tab key='Table' title='Table' />
            </Tabs>
          </div>
          <div>
            <Input
              className='min-w-60 h-full border rounded-md'
              placeholder='Search here...'
              size='sm'
              onFocus={() => setIsSearchOpen(true)}
              onBlur={() => setIsSearchOpen(false)}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      {tabState === "Block" ? (
        <div className='flex flex-col gap-x-5'>
          {selectedType === "laptop" ? (
            <LaptopBlockView
              setActionStatus={handleActionStatus}
              actionStatus={actionStatus}
              assetLoading={assetLoading}
            />
          ) : selectedType === "monitor" ? (
            <MonitorBlockView
              setActionStatus={handleActionStatus}
              actionStatus={actionStatus}
              assetLoading={assetLoading}
            />
          ) : (
            <PeripheralBlockVIew
              setActionStatus={handleActionStatus}
              actionStatus={actionStatus}
              assetLoading={assetLoading}
            />
          )}
        </div>
      ) : (
        <div className='flex gap-x-5'>
          <TableGateWay
            assetData={assetData}
            setActionStatus={handleActionStatus}
            actionStatus={actionStatus}
            assetLoading={assetLoading}
            selectedType={selectedType}
          />
        </div>
      )}
    </div>
  );
};

export default AssetBody;
