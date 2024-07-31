import { assetDataAtom } from "@/app/Homepage/AssetStore";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Button,
} from "@nextui-org/react";
import { useAtomValue } from "jotai";
import React, { useState, useEffect, useRef } from "react";
import { setDataFromSelectedAtom } from "../Store/LaptopStore";

const AssetDataSelection = ({ setData }) => {
  const assetData = useAtomValue(assetDataAtom);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAssets, setFilteredAssets] = useState(assetData);
  const dropdownOpen = useRef(false);
  const searchTimeout = useRef(null);
  useEffect(() => {
    if (searchTerm) {
      setFilteredAssets(
        assetData.filter(
          (asset) =>
            asset.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
            asset.serial_number.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredAssets(assetData);
    }
  }, [searchTerm, assetData]);

  useEffect(() => {
    console.log("dropdownRef: ", dropdownOpen);
    const handleKeyPress = (event) => {
      if (dropdownOpen.current) {
        setSearchTerm((prev) => prev + event.key);
        resetSearchTimeout();
      }
    };

    const handleKeyDown = (event) => {
      if (dropdownOpen.current) {
        if (event.key === "Backspace") {
          setSearchTerm((prev) => prev.slice(0, -1));
          resetSearchTimeout();
        } else if (event.key === "Escape") {
          setSearchTerm("");
        }
      }
    };
    const resetSearchTimeout = () => {
      clearTimeout(searchTimeout.current);
      searchTimeout.current = setTimeout(() => {
        setSearchTerm("");
      }, 5000);
    };

    window.addEventListener("keypress", handleKeyPress);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(searchTimeout.current);
    };
  }, []);

  return (
    <div className='flex gap-2 items-center w-full'>
      <p className='text-sm text-gray-500'>Select Asset Data</p>
      <Select
        onOpenChange={() => {
          dropdownOpen.current = true;
          setSearchTerm("");
        }}
        onClose={() => {
          dropdownOpen.current = false;
        }}
        className='w-3/4'
        label='Select an Asset'
        aria-label='Asset Selection'
        size={"sm"}
      >
        {filteredAssets && filteredAssets.length > 0 ? (
          filteredAssets.map((asset) => (
            <SelectItem
              key={asset._id}
              value={asset}
              onClick={() => setData(asset)}
              textValue={asset?.item}
            >
              {asset.item}
            </SelectItem>
          ))
        ) : (
          <SelectItem key='no-result' disabled>
            No results found
          </SelectItem>
        )}
      </Select>
    </div>
  );
};

export default AssetDataSelection;
