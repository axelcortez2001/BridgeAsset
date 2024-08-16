import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import {
  assetDataAtom,
  fetchAssetDataAtom,
  fetchUserAtom,
  userAtom,
} from "../../AssetStore";
import AssetLoading from "../LoadingComponents/AssetLoading";
import { Tabs, Tab, Input } from "@nextui-org/react";
import UserCard from "./Components/UserCard";

const UserPage = () => {
  const [loading, setLoading] = useState(false);
  const userData = useAtomValue(userAtom);
  const assetData = useAtomValue(assetDataAtom);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [tabSelect, setTabSelect] = useState("All");

  const tabSelection = ["All", "Laptop", "Monitor", "Peripheral"];
  //setatom
  const fetchUsers = useSetAtom(fetchUserAtom);
  const fetchAssetData = useSetAtom(fetchAssetDataAtom);

  //handler
  useEffect(() => {
    const userHandler = async () => {
      if (userData === null) {
        setLoading(true);
        try {
          console.log("Tigger use effect");
          const assets = await fetchAssetData("users");
          if (assets?.success === true) {
            const res = await fetchUsers();
            if (res?.success) {
              setFilteredUsers(res.user);
              console.log(res.message);
            }
          }
        } catch (error) {
          console.log("Error: ", error);
        } finally {
          setLoading(false);
        }
      }
    };
    userHandler();
  }, [assetData, userData]);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredUsers(userData);
    } else {
      const filtered = userData.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery]);
  //check if user have an asset based from category
  const IsAssetActive = (opt, category) => {
    let returnedAsset = null;
    if (category !== "peripheral") {
      opt.asset_holder_active.some((asset) => {
        if (category === "monitor") {
          if (asset.category === "monitor") {
            return (returnedAsset = true);
          } else {
            return (returnedAsset = false);
          }
        } else if (category === "laptop") {
          if (asset.category === "laptop") {
            return (returnedAsset = true);
          } else {
            return (returnedAsset = false);
          }
        }
      });
    } else {
      opt.asset_holder_active.some((asset) => {
        if (asset.category === "peripheral") {
          if (returnedAsset === null || returnedAsset?.length === 0) {
            returnedAsset = [asset];
          } else {
            returnedAsset = [...returnedAsset, asset];
          }
        }
      });
    }
    return returnedAsset;
  };
  return loading ? (
    <AssetLoading />
  ) : (
    <div className='w-full h-screen overflow-y-auto p-3'>
      <div className=' '>
        <Input
          size='lg'
          className=' rounded-md'
          placeholder='Search asset holder...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className='w-full border my-4'></div>
      <Tabs>
        {tabSelection.map((tab, index) => (
          <Tab key={index} title={tab}>
            {tab !== "All" && (
              <Tabs onSelectionChange={setTabSelect}>
                <Tab key='All' title='All' />
                <Tab key='Active' title='Active' />
                <Tab key='No Issued' title='No Issued' />
              </Tabs>
            )}
            {filteredUsers && filteredUsers?.length > 0 ? (
              <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4'>
                {filteredUsers.map((user) => (
                  <UserCard
                    key={user._id}
                    user={user}
                    checkStat={IsAssetActive}
                    tabLoc={tab}
                    tabSelect={tabSelect}
                  />
                ))}
              </div>
            ) : (
              <div>No Data</div>
            )}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default UserPage;
