import { assetDataAtom, selectedTypeAtom } from "@/app/Homepage/AssetStore";
import { atom } from "jotai";

export const monitorStatusData = [
  { name: "Stock", id: 0, color: "bg-amber-500" },
  { name: "Issued", id: 1, color: "bg-blue-400" },
  { name: "Active", id: 2, color: "bg-green-500" },
  { name: "Defective", id: 3, color: "bg-red-500" },
  { name: "Archive", id: 4, color: "bg-lime-600" },
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
});

const handleAddNewMonitor = atom(null, async (get, set) => {
  const selectedCategory = get(selectedTypeAtom);
  let oldAsset = get(assetDataAtom);
  const assetData = {};
});
