"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddAsset from "../AssetOtherComponents/AddAsset";

const AssetBody = () => {
  const [actionStatus, setActionStatus] = useState(false);
  const handleActionStatus = (stat) => {
    setActionStatus(!stat);
  };
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
            animate={{ opacity: 1, height: "24rem" }} // 24rem is equivalent to h-96 in Tailwind CSS
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

      <div>Hakdof</div>
    </div>
  );
};

export default AssetBody;
