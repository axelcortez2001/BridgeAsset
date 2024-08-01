import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import AssetHistoryData from "../AssetOtherComponents/AssetHistoryData";
import UserAssetHistory from "../AssetOtherComponents/UserAssetHistory";
const AssetHistory = ({ asset }) => {
  const history = asset?.asset_history;
  const userHistory = asset?.asset_holder_history;
  console.log(history);
  return (
    <div className='w-full h-full max-h-screen overflow-y-auto p-2 '>
      <div className='border rounded-md p-2'>
        <Tabs aria-label='Options'>
          <Tab key='Asset History' title='Asset History'>
            <AssetHistoryData history={history} />
          </Tab>
          <Tab key='User History' title='User History'>
            <UserAssetHistory userHistory={userHistory} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default AssetHistory;
