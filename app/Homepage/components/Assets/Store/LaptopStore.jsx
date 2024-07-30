import { selectedTypeAtom } from "@/app/Homepage/AssetStore";
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

export const SaveLaptopAtom = atom(null, async (get, set) => {
  const selectedCategory = get(selectedTypeAtom);
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
    item_status: get(itemStatusOptionAtom),
  };
  console.log("AssetData to be saved: ", assetData);
  try {
    const response = await restInsert("/assets", assetData);
    console.log("Response: ", response);
    if (response?.success) {
      return { success: true, response };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.log("Error: ", error);
  }
});
