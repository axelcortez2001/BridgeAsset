import {
  assetDataAtom,
  selectedAssetDataAtom,
  selectedTypeAtom,
} from "@/app/Homepage/AssetStore";
import { restInsert } from "@/app/utils";
import { fetchUserAttributes } from "aws-amplify/auth";
import { atom } from "jotai";

export const monitorStatusData = [
  { name: "Stock", id: 0, color: "bg-amber-500" },
  { name: "Issued", id: 1, color: "bg-blue-400" },
  { name: "Active", id: 2, color: "bg-green-500" },
  { name: "Defective", id: 3, color: "bg-red-500" },
  { name: "Archive", id: 4, color: "bg-amber-900" },
];
export const actionHistoryAtom = atom([]);
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
export const assetHolderHistoryAtom = atom([]);
export const userTypeAtom = atom("Employee");
export const branchAtom = atom("Makati");
export const tagCodeAtom = atom("");
export const remarksAtom = atom("");
export const statusAtom = atom({
  name: "Active",
  id: 2,
  color: "bg-green-500",
});

const monitorDataAtom = atom([]);

export const setMonitorDataToDefaultAtom = atom(null, async (get, set) => {
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
  set(statusAtom, { name: "Active", id: 2, color: "bg-green-500" });
  set(branchAtom, "Makati");
  set(userTypeAtom, "Employee");
  set(remarksAtom, "");
  set(tagCodeAtom, "");
});
export const setMonitorDataFromSelectedAtom = atom(null, async (get, set) => {
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
  set(assetHolderHistoryAtom, selectedAssetData?.asset_holder_history);
  set(tagCodeAtom, selectedAssetData?.tag_code);
  set(remarksAtom, selectedAssetData?.remarks);
});

export const handleAddNewMonitorAtom = atom(null, async (get, set) => {
  const selectedCategory = get(selectedTypeAtom);
  let oldAsset = get(assetDataAtom);
  const user = await fetchUserAttributes();
  const action = user.name + " filed this asset.";
  const history = {
    user_holder: get(assetHolderAtom),
    date_updated: new Date(),
    actions_taken: [action],
  };
  const assetData = {
    item: get(itemNameAtom),
    serial_number: get(serialNumberAtom),
    supplier: get(supplierAtom),
    last_updated: new Date(),
    fa_code: get(FACodeAtom),
    tagCode: get(tagCodeAtom),
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
    asset_history: history,
  };
  try {
    const response = await restInsert("/assets", assetData);
    if (response?.success) {
      const newAssetData = [response.response, ...oldAsset];
      set(assetDataAtom, newAssetData);
      return { success: true, response };
    }
  } catch (e) {
    console.log("Error: ", e);
  }
});
