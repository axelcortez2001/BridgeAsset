import React from "react";

const MonitorComponent = ({ dashboardData }) => {
  return (
    <div className='w-full flex  h-screen'>
      <p>
        Total Items: <span>{dashboardData?.length}</span>
      </p>
    </div>
  );
};

export default MonitorComponent;
