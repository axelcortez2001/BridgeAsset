"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddAsset from "./Asset";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  assetDataAtom,
  fetchAssetDataAtom,
  selectedTypeAtom,
} from "@/app/Homepage/AssetStore";
import LaptopBlockView from "../AssetBlockView/LaptopBlockView";
import MonitorBlockView from "../AssetBlockView/MonitorBlockView";
import PeripheralBlockVIew from "../AssetBlockView/PeripheralBlockVIew";

const AssetBody = () => {
  const [actionStatus, setActionStatus] = useState(false);
  const [assetData, setAssetData] = useAtom(assetDataAtom);
  const selectedType = useAtomValue(selectedTypeAtom);
  const [assetLoading, setAssetLoading] = useState(false);
  const fetchAssetData = useSetAtom(fetchAssetDataAtom);
  const [selected, setSelected] = useState(selectedType);
  const handleActionStatus = (stat) => {
    setActionStatus(!stat);
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
  return (
    <div>
      {!actionStatus ? (
        <div>
          <button
            className='border rounded-md p-2'
            onClick={() => handleActionStatus(actionStatus)}
          >
            Add
          </button>
        </div>
      ) : null}

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

        {/* <div>Table View</div> */}
      </div>
    </div>
  );
};

export default AssetBody;
