import React, { useState } from "react";
import {
  assetDataAtom,
  globalActionStatusAtom,
  globalSelectedassetAtom,
  selectedAssetDataAtom,
  selectedTypeAtom,
  sideBarLocation,
} from "@/app/Homepage/AssetStore";
import { isValid } from "date-fns";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useDisclosure } from "@nextui-org/react";
import ViewModal from "../../Assets/AssetOtherComponents/ViewModal";
import { toast } from "sonner";
import { itemStatusOptionAtom } from "../../Assets/Store/LaptopStore";

const UserDetails = ({ userData }) => {
  const [isViewModal, setViewModal] = useState(false);

  const active = userData?.asset_holder_active;
  console.log("active: ", active);

  const formatDate = (opt) => {
    if (isValid(new Date(opt))) {
      const formattedDate = new Date(opt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      return formattedDate;
    } else {
      return "No Date";
    }
  };

  //navigation routing
  const setSideBar = useSetAtom(sideBarLocation);
  const [selectedType, setSelectedType] = useAtom(selectedTypeAtom);
  const [selectedAssetData, setSelectedAssetData] = useAtom(
    selectedAssetDataAtom
  );
  const setGlobalActionStatus = useSetAtom(globalActionStatusAtom);
  const assetData = useAtomValue(assetDataAtom);
  const [selectedAssetHere, setSelectedAssetHere] = useState(null);
  const handleOpen = (asset) => {
    setSelectedAssetHere(asset?.asset);
    onOpenChange(true);
  };
  const setGlobalSelected = useSetAtom(globalSelectedassetAtom);
  const setItemStatusOption = useSetAtom(itemStatusOptionAtom);
  const handleSelect = async () => {
    if (selectedAssetHere === null) {
      toast.error("Invalid Asset Data");
    } else {
      setSideBar("assets");
      setSelectedType(selectedAssetHere?.category);
      setSelectedAssetData(selectedAssetHere);
      setGlobalActionStatus(true);
      setGlobalSelected(selectedAssetHere);
      if (selectedAssetHere.category === "laptop") {
        setItemStatusOption("Update");
      }
    }
    onOpenChange(false);
  };

  const handleViewModal = () => {
    setViewModal((prev) => !prev);
  };

  return (
    <div className="w-full flex flex-col p-2 gap-2">
      <p>Active Asset Data</p>
      {active &&
        active?.map((assetActive, index) => (
          <div
            key={index}
            className="border rounded-md p-1 hover:bg-gray-200 hover:cursor-pointer"
            onClick={() => handleOpen(assetActive)}
          >
            <p className="font-semibold capitalize"> {assetActive.category} </p>
            <p className=" indent-5">
              {assetActive?.peripheral_type && (
                <span className="capitalize">
                  {assetActive.peripheral_type} {" :"}
                </span>
              )}
              {assetActive?.asset_name}
            </p>
            <p className=" indent-5">
              Received: <span>{formatDate(assetActive?.date_received)}</span>
            </p>
          </div>
        ))}

      {selectedAssetHere !== null && (
        <ViewModal
          isOpen={isViewModal}
          onClose={handleViewModal}
          asset={selectedAssetHere}
          selectAsset={handleSelect}
        />
      )}
    </div>
  );
};

export default UserDetails;
