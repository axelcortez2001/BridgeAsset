"use client";
import React from "react";

const LaptopComponent = ({ dashboardData }) => {
  return (
    <div className='w-full flex  h-screen'>
      <p>
        Total Items: <span>{dashboardData?.length}</span>
      </p>
    </div>
  );
};

export default LaptopComponent;
