"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddAsset from "./Asset";
import { useAtom, useSetAtom } from "jotai";
import { assetDataAtom, fetchAssetDataAtom } from "@/app/Homepage/AssetStore";
import AssetBlockView from "../AssetBlockView/AssetBlockView";

const AssetBody = () => {
  const [actionStatus, setActionStatus] = useState(false);
  const [assetData, setAssetData] = useAtom(assetDataAtom);
  const [assetLoading, setAssetLoading] = useState(false);
  const fetchAssetData = useSetAtom(fetchAssetDataAtom);
  const handleActionStatus = (stat) => {
    setActionStatus(!stat);
  };
  useEffect(() => {
    const handleFetchData = async () => {
      setAssetLoading(true);
      try {
        if (assetData === null) {
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
  }, [assetData]);
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
        <AssetBlockView
          setActionStatus={handleActionStatus}
          actionStatus={actionStatus}
          assetLoading={assetLoading}
        />
        {/* <div>Table View</div> */}
      </div>
    </div>
  );
};

export default AssetBody;
