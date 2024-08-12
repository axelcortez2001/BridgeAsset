import React, { useState } from "react";
import AssetLoading from "../../LoadingComponents/AssetLoading";

const Peripherals = ({ selectedType, setActionStatus, actionStatus }) => {
  const [loading, setLoading] = useState(false);

  //handlers
  const handleClose = () => {
    setActionStatus(actionStatus);
  };
  return (
    <div className='w-full flex flex-col h-full'>
      {loading ? (
        <AssetLoading />
      ) : (
        <div className='w-full flex flex-wrap p-1 gap-3'>
          This is peripherals
          <div className=''>
            <button
              type='button'
              className='border p-2 rounded-md bg-red-400'
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Peripherals;
