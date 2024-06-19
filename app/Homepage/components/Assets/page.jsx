import React from "react";
import AssetHeader from "./AssetComponents/AssetHeader";
import AssetBody from "./AssetComponents/AssetBody";

const Assets = () => {
  return (
    <div className='p-2 w-full h-screen max-h-screen overflow-y-auto flex flex-col'>
      <AssetHeader />
      <AssetBody />
    </div>
  );
};

export default Assets;
