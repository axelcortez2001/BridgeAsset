import {
  assetDataAtom,
  globalActionStatusAtom,
  globalSelectedassetAtom,
  selectedAssetDataAtom,
  selectedTypeAtom,
  updateStatusAtom,
} from "@/app/Homepage/AssetStore";
import { restInsert, restUpdate } from "@/app/utils";
import { fetchUserAttributes } from "aws-amplify/auth";
import { atom } from "jotai";
import { v4 as uuidV4 } from "uuid";

export const peripheralStatusData = [
  { name: "Stock", id: 0, color: "bg-amber-500" },
  { name: "Issued", id: 1, color: "bg-blue-400" },
  { name: "Active", id: 2, color: "bg-green-500" },
  { name: "Defective", id: 3, color: "bg-red-500" },
  { name: "Archive", id: 4, color: "bg-amber-900" },
];
export const peripheralTypeData = [
  { name: "Mouse", id: 0, color: "bg-orange-500", img: "/mouse.png" },
  {
    name: "Keyboard",
    id: 1,
    color: "bg-purple-500",
    img: "/keyboard.png",
  },
  { name: "Headset", id: 2, color: "bg-pink-500", img: "/headset.png" },
  { name: "Others", id: 3, color: "bg-blue-500", img: "/ellipsis.png" },
];

export const actionPeripheralHistoryAtom = atom([]);
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
export const peripheralTypeAtom = atom("");
export const viewPeripheralHistoryAtom = atom(false);

//setting peripheral input to default
export const setPeripheralToDefault = atom(null, async (get, set) => {
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
  set(assetHolderHistoryAtom, []);
  set(userTypeAtom, "Employee");
  set(branchAtom, "Makati");
  set(tagCodeAtom, "");
  set(remarksAtom, "");
  set(statusAtom, {
    name: "Active",
    id: 2,
    color: "bg-green-500",
  });
  set(peripheralTypeAtom, "");
  set(viewPeripheralHistoryAtom, false);
  set(globalSelectedassetAtom, null);
  set(globalActionStatusAtom, false);
});

//adding peripheral handler
export const handleAddPeripheralAtom = atom(null, async (get, set) => {
  const oldAsset = get(assetDataAtom);
  let FaCode = uuidV4();
  if (
    oldAsset.includes((asset) => {
      return asset?.fa_code === FaCode;
    })
  ) {
    return (FaCode = uuidV4());
  }
  const user = await fetchUserAttributes();
  const action = user?.name + " filed this asset!";
  const history = {
    user_holder: get(assetHolderAtom),
    date_updated: new Date(),
    actions_taken: [action],
  };
  try {
    const assetData = {
      item: get(itemNameAtom),
      serial_number: get(serialNumberAtom),
      fa_code: FaCode,
      unit_price: get(unitPriceAtom),
      doi: get(doiAtom),
      dop: get(dopAtom),
      warranty_period: get(warrantyPeriodAtom),
      status: get(statusAtom),
      branch: get(branchAtom),
      asset_holder: get(assetHolderAtom),
      asset_history: history,
      user_type: get(userTypeAtom),
      category: get(selectedTypeAtom),
      supplier: get(supplierAtom),
      remarks: get(remarksAtom),
      peripheral_type: get(peripheralTypeAtom),
      warranty_period: get(warrantyPeriodAtom),
      tagCode: get(tagCodeAtom),
    };
    console.log("will be added: ", assetData);
    const response = await restInsert("/assets", assetData);
    if (response?.success) {
      const newAssetData = oldAsset?.length
        ? [...oldAsset, response.response]
        : [response.response];
      set(updateStatusAtom, true);
      set(assetDataAtom, newAssetData);
      return { success: true, response };
    }
  } catch (error) {
    console.log("Error: ", error);
    return { success: false, error: error };
  }
});

export const setPeripheralFromDataSelectedAtom = atom(
  null,
  async (get, set) => {
    const selectedAssetData = get(selectedAssetDataAtom);
    set(itemNameAtom, selectedAssetData?.item);
    set(serialNumberAtom, selectedAssetData?.serial_number);
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
    set(tagCodeAtom, selectedAssetData?.tagCode);
    set(remarksAtom, selectedAssetData?.remarks);
    set(peripheralTypeAtom, selectedAssetData?.peripheral_type);
  }
);

export const updatePeripheralAtom = atom(null, async (get, set) => {
  const user = await fetchUserAttributes();
  const selectedCategory = get(selectedTypeAtom);
  const historyArray = get(actionPeripheralHistoryAtom);
  const oldAssetData = get(selectedAssetDataAtom);
  const assetHolder = get(assetHolderAtom);
  const oldUser = () => {
    let oldUserData = null;
    if (
      oldAssetData?.asset_holder !== null &&
      oldAssetData?.asset_holder?.sub !== assetHolder?.sub
    ) {
      oldUserData = {
        ...oldAssetData?.asset_holder,
        date_received: oldAssetData?.doi,
        date_return: new Date(),
      };

      return [oldUserData, ...oldAssetData?.asset_holder_history];
    } else {
      return [...oldAssetData?.asset_holder_history];
    }
  };
  const history = {
    user_holder: oldAssetData?.asset_holder,
    date_updated: new Date(),
    actions_taken: historyArray,
  };
  const assetData = {
    _id: oldAssetData?._id,
    item: get(itemNameAtom),
    serial_number: get(serialNumberAtom),
    supplier: get(supplierAtom),
    last_updated: new Date(),
    unit_price: get(unitPriceAtom),
    doi: get(doiAtom),
    dop: get(dopAtom),
    warranty_period: get(warrantyPeriodAtom),
    status: get(statusAtom),
    asset_holder: get(assetHolderAtom),
    branch: get(branchAtom),
    user_type: get(userTypeAtom),
    category: selectedCategory,
    asset_history: [history, ...oldAssetData.asset_history],
    asset_holder_history: oldUser(),
    tagCode: get(tagCodeAtom),
    remarks: get(remarksAtom),
    peripheral_type: get(peripheralTypeAtom),
  };
  console.log("Will be updated: ", assetData);
  try {
    const response = await restUpdate("/assets", { assetData });
    if (response?.success) {
      const newAssetData = get(assetDataAtom).map((asset) =>
        asset._id === oldAssetData._id ? assetData : asset
      );
      set(updateStatusAtom, true);
      set(assetDataAtom, newAssetData);
      return { success: true, response };
    } else {
      return { success: false, error: response.error };
    }
  } catch (error) {
    console.log("Error: ", error);
    return { success: false, error: error };
  }
});
