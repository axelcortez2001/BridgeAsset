import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import {
  assetDataAtom,
  fetchAssetDataAtom,
  fetchUserAtom,
  userAtom,
} from "../../AssetStore";
import AssetLoading from "../LoadingComponents/AssetLoading";
import { Tabs, Tab, Input, Skeleton } from "@nextui-org/react";
import UserCard from "./Components/UserCard";
import SearchBar from "@/app/SharedComponents/SearchBar";
import UserCardSkeleton from "./Components/UserCardSkeleton";
import NoItems from "@/app/SharedComponents/NoItems";

const UserPage = () => {
  const [loading, setLoading] = useState(false);
  const userData = useAtomValue(userAtom);
  const oldassetData = useAtomValue(assetDataAtom);
  const [assetData, setAssetData] = useState(oldassetData);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [tabSelect, setTabSelect] = useState("All");

  const [filterOption, setFilterOption] = useState(["All", "All", "All"]);

  const tabSelection = ["All", "Laptop", "Monitor", "Peripheral"];
  //setatom
  const fetchUsers = useSetAtom(fetchUserAtom);
  const fetchAssetData = useSetAtom(fetchAssetDataAtom);

  //handler
  useEffect(() => {
    const userHandler = async () => {
      setLoading(true);
      try {
        const assets = await fetchAssetData("users");
        if (assets?.success === true) {
          const res = await fetchUsers();
          if (res?.success) {
            setFilteredUsers(res.user);
          }
        }
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    userHandler();
  }, []);

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

  const handleApplyFilter = (e) => {
    setFilterOption(e);
  };

  const SkeletonCount = [1, 2, 3, 4, 5, 6];

  return loading ? (
    <div className="p-4 w-full h-screen p-4 space-y-4">
      <div className="sticky top-[12px] z-[46] drop-shadow-xl">
        <SearchBar
          searchValue={searchQuery}
          setSearchValue={setSearchQuery}
          filterOption={true}
          applyFilter={(e) => handleApplyFilter(e)}
          dataIsLoading={loading}
        />
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
        {SkeletonCount.map((item) => (
          <UserCardSkeleton key={item} />
        ))}
      </div>
    </div>
  ) : (
    <div className="w-full h-[calc(100%-60px)] p-4">
      <div className="sticky top-[12px] z-[46] drop-shadow-xl">
        <SearchBar
          searchValue={searchQuery}
          setSearchValue={setSearchQuery}
          filterOption={true}
          applyFilter={(e) => handleApplyFilter(e)}
        />
      </div>
      <div className="h-full">
        {filteredUsers && filteredUsers?.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 mt-4 ">
            {filteredUsers.map((user, index) => (
              <UserCard
                key={index}
                user={user}
                checkStat={IsAssetActive}
                tabLoc={filterOption[0]}
                tabSelect={filterOption[1]}
                userComplete={filterOption[2]}
              />
            ))}
          </div>
        ) : (
          <div className="h-full ">
            <NoItems item={"User"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
