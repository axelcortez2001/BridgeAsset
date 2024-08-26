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
import { Tab, Tabs } from "@nextui-org/react";
import Table from "../TableComponents/Table";

const AssetBody = () => {
  const [globalActionStatus, setGlobalActionStatus] = useAtom(
    globalActionStatusAtom
  );
  const [actionStatus, setActionStatus] = useState(globalActionStatus);
  const [assetData, setAssetData] = useAtom(assetDataAtom);
  const selectedType = useAtomValue(selectedTypeAtom);
  const [assetLoading, setAssetLoading] = useState(false);
  const fetchAssetData = useSetAtom(fetchAssetDataAtom);
  const [selected, setSelected] = useState(selectedType);
  const [tabState, setTabState] = useState("Block");

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
          } else {
            setAssetData([]);
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
  console.log("Asset: ", assetData);
  return (
    <div className='p-2'>
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
        <div>Filtering here...</div>
      </div>
      {tabState === "Block" ? (
        <div className='flex gap-x-5'>
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
          <Table
            assetData={assetData}
            setActionStatus={handleActionStatus}
            actionStatus={actionStatus}
            assetLoading={assetLoading}
          />
        </div>
      )}
    </div>
  );
};

export default AssetBody;
