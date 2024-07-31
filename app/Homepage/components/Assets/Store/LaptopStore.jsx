import {
  assetDataAtom,
  selectedAssetDataAtom,
  selectedTypeAtom,
} from "@/app/Homepage/AssetStore";
import { restInsert } from "@/app/utils";
import { atom } from "jotai";

export const laptopStatusData = [
  { name: "Working", id: 0, color: "bg-green-500" },
  { name: "Defective", id: 1, color: "bg-red-500" },
  { name: "Irreparable", id: 2, color: "bg-gray-800" },
  { name: "Good to Issue", id: 3, color: "bg-green-200" },
  { name: "For Checking", id: 4, color: "bg-brown-500" },
  { name: "More than 3 Years", id: 5, color: "bg-blue-200" },
  { name: "Depreciated", id: 6, color: "bg-violet-500" },
  { name: "NRD", id: 7, color: "bg-blue-400" },
  { name: "For Pull Out", id: 8, color: "bg-orange-700" },
];

export const itemStatusOptionAtom = atom("NONE");
export const itemNameAtom = atom("");
export const serialNumberAtom = atom("");
export const FACodeAtom = atom("");
export const doiAtom = atom("");
export const supplierAtom = atom({});
export const unitPriceAtom = atom("");
export const dopAtom = atom("");
export const warrantyPeriodAtom = atom("");
export const assetHolderAtom = atom(null);
export const assetHistoryAtom = atom([]);
export const userTypeAtom = atom("Employee");
export const branchAtom = atom("Makati");
export const statusAtom = atom({
  name: "Working",
  id: 0,
  color: "bg-green-500",
});
export const setDataToDefaultAtom = atom(null, async (get, set) => {
  set(itemNameAtom, "");
  set(serialNumberAtom, "");
  set(FACodeAtom, "");
  set(doiAtom, "");
  set(supplierAtom, {});
  set(unitPriceAtom, "");
  set(dopAtom, "");
  set(warrantyPeriodAtom, "");
  set(assetHolderAtom, null);
  set(assetHistoryAtom, []);
  set(statusAtom, { name: "Working", id: 0, color: "bg-green-500" });
  set(branchAtom, "Makati");
  set(userTypeAtom, "Employee");
});
export const setDataFromSelectedAtom = atom(null, async (get, set) => {
  const selectedAssetData = get(selectedAssetDataAtom);
  set(itemNameAtom, selectedAssetData?.item);
  set(serialNumberAtom, selectedAssetData?.serial_number);
  set(FACodeAtom, selectedAssetData?.fa_code);
  set(doiAtom, selectedAssetData?.doi);
  set(supplierAtom, selectedAssetData?.supplier);
  set(unitPriceAtom, selectedAssetData?.unit_price);
  set(dopAtom, selectedAssetData?.dop);
  set(warrantyPeriodAtom, selectedAssetData?.warranty_period);
  set(assetHolderAtom, selectedAssetData?.asset_holder);
  set(assetHistoryAtom, selectedAssetData?.asset_history);
  set(statusAtom, selectedAssetData?.status);
  set(branchAtom, selectedAssetData?.branch);
  set(userTypeAtom, selectedAssetData?.user_type);
});
export const SaveLaptopAtom = atom(null, async (get, set) => {
  const selectedCategory = get(selectedTypeAtom);
  let oldAsset = get(assetDataAtom);
  const assetData = {
    item: get(itemNameAtom),
    serial_number: get(serialNumberAtom),
    supplier: get(supplierAtom),
    last_updated: new Date(),
    fa_code: get(FACodeAtom),
    unit_price: get(unitPriceAtom),
    doi: get(doiAtom),
    dop: get(dopAtom),
    warranty_period: get(warrantyPeriodAtom),
    status: get(statusAtom),
    asset_holder: get(assetHolderAtom),
    branch: get(branchAtom),
    user_type: get(userTypeAtom),
    category: selectedCategory,
    item_stats: get(itemStatusOptionAtom),
  };
  try {
    const response = await restInsert("/assets", assetData);
    if (response?.success) {
      const newAssetData = [...oldAsset, response.response];
      set(assetDataAtom, newAssetData);
      return { success: true, response };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.log("Error: ", error);
  }
});
