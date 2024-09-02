import { fetchUserAttributes } from "aws-amplify/auth";
import { atom } from "jotai";
import { getUsers, restDelete, restGet, restInsert } from "../utils";
import { peripheralTypeAtom } from "./components/Assets/Store/PeripheralStore";
import { dashBoardDataAtom } from "./components/Dashboard/DashboardStore/MainStore";

export const selectedTypeAtom = atom("laptop");
export const employeeOptionsAtom = atom([]);
export const filteredEmployeesAtom = atom([]);
export const filteredEmployeesForMonitorAtom = atom([]);
export const selectedAssetDataAtom = atom(null);
export const assetDataAtom = atom(null);
export const allAssetDataAtom = atom(null);
export const userAtom = atom(null);
export const globalActionStatusAtom = atom(false);
export const globalSelectedassetAtom = atom(null);
export const updateStatusAtom = atom(false);

let supplierId = 0;
export const supplierData = atom([
  {
    id: supplierId++,
    name: "Supplier 1",
    address: "Address 1",
    contact: "Contact 1",
    email: "email1@gmail.com",
    color: "bg-green-500",
  },
  {
    id: supplierId++,
    name: "Supplier 2",
    address: "Address 2",
    contact: "Contact 2",
    email: "email2@gmail.com",
    color: "bg-blue-500",
  },
  {
    id: supplierId++,
    name: "Default",
    address: "Default",
    contact: "Default",
    email: "Default@gmail.com",
    color: "bg-blue-500",
  },
]);
export const addSupplier = atom(null, async (get, set, data) => {
  const oldSupplier = get(supplierData);
  console.log(data);
  const stat = oldSupplier.some(
    (supplier) =>
      supplier.name.toLocaleLowerCase() === data.name.toLocaleLowerCase()
  );
  if (stat === false) {
    const newSupplier = [...oldSupplier, data];
    set(supplierData, newSupplier);
  } else {
    alert("Company already present");
  }

  console.log(supplierData);
});
async function fetchUserData() {
  try {
    const user = await fetchUserAttributes();
    if (user.sub) {
      return user;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
}

export const userDataAtom = atom(async () => {
  return await fetchUserData();
});

export const registerUser = atom(null, async (get, set) => {
  const data = get(userDataAtom);
  const userResponse = await restInsert("/users", data.value);
  if (userResponse?.success) {
    set(updateStatusAtom, true);
    return { success: true, userResponse };
  } else {
    return { success: false };
  }
});

export const fetchAssetDataAtom = atom(null, async (get, set, loc) => {
  const assetFromDashboard = get(dashBoardDataAtom);
  const selectedType = get(selectedTypeAtom);
  console.log("Selected type: ", selectedType);
  if (assetFromDashboard) {
    if (loc === "users") {
      set(allAssetDataAtom, assetFromDashboard);
      return { success: true, message: "Fetched Asset Data" };
    } else {
      const willReturn = assetFromDashboard;
      if (assetFromDashboard.length > 0) {
        const finalReturn = willReturn.filter((asset) => {
          return asset?.category === selectedType;
        });
        return { success: true, response: finalReturn };
      } else {
        return [];
      }
    }
  } else {
    return { success: false };
  }
});

export const sideBarLocation = atom("dashboard");
export const setSideBarLocation = atom(null, (get, set, location) => {
  set(sideBarLocation, location);
});

export const fetchEmployeeAtom = atom(null, async (get, set, category) => {
  try {
    const assetData = get(assetDataAtom);

    const { user } = await getUsers("/users");
    console.log("Asset Data from fetchEMployee: ", assetData);
    console.log("user Data from fetchEMployee: ", user);
    if (assetData !== null && user !== null) {
      if (category === "peripheral") {
        const peripheralType = get(peripheralTypeAtom);
        if (peripheralType === "others") {
          set(filteredEmployeesAtom, user);
          set(employeeOptionsAtom, user);
        } else if (peripheralType !== "") {
          const peripheralAssets = assetData.filter((asset) => {
            return asset?.peripheral_type === peripheralType;
          });
          const assetDataWithHolder = peripheralAssets
            .flatMap((asset) => {
              if (asset?.asset_holder !== null) {
                return asset?.asset_holder.sub;
              } else {
                return null;
              }
            })
            .filter((asset) => {
              return asset !== null;
            });
          const returnedUser = user.filter(
            (user) => !assetDataWithHolder.includes(user.sub)
          );
          set(filteredEmployeesAtom, returnedUser);
          set(employeeOptionsAtom, returnedUser);
        } else {
          set(filteredEmployeesAtom, []);
          set(employeeOptionsAtom, []);
        }
      } else {
        const assetDataWithHolder = assetData
          .flatMap((asset) => {
            if (asset?.asset_holder !== null) {
              return asset?.asset_holder.sub;
            } else {
              return null;
            }
          })
          .filter((asset) => {
            return asset !== null;
          });

        const returnedUser = user.filter(
          (user) => !assetDataWithHolder.includes(user.sub)
        );
        set(filteredEmployeesAtom, returnedUser);
        set(employeeOptionsAtom, returnedUser);
      }
    }
  } catch (e) {
    console.log(e);
  }
});
export const setLogicAssetHolderAtom = atom(null, (get, set, assetHolder) => {
  try {
    const employees = get(filteredEmployeesAtom);
    const foundEmployee = employees.find((employee) => {
      return employee?.sub === assetHolder?.sub;
    });
    if (assetHolder !== null && assetHolder !== undefined) {
      if (foundEmployee === undefined) {
        const newEmployeeOptions = [assetHolder, ...employees];

        set(filteredEmployeesAtom, newEmployeeOptions);
        console.log("New: ", newEmployeeOptions);
      }
    }
  } catch (e) {
    console.log(e);
  }
});
export const handleReturnEmployeesDefaultAtom = atom(null, (get, set) => {
  const employees = get(employeeOptionsAtom);
  set(filteredEmployeesAtom, employees);
});

export const deleteAssetDataAtom = atom(null, async (get, set, _id) => {
  console.log("Id: ", _id);
  try {
    const response = await restDelete("/assets", { _id });
    if (response?.success) {
      console.log("Response: ", response);
      const newAssetData = get(assetDataAtom).filter(
        (asset) => asset._id !== _id
      );
      set(updateStatusAtom, true);
      set(assetDataAtom, newAssetData);
      return { success: true, response };
    } else {
      return { success: false };
    }
  } catch (e) {
    console.log("Error: ", e);
  }
});

//get users for user page
export const fetchUserAtom = atom(null, async (get, set) => {
  try {
    let assetHolderHistory = [];
    let assetHolderActive = [];
    const assetData = get(allAssetDataAtom);
    assetData.map((asset) => {
      if (asset.asset_holder !== null) {
        const assetHolder = asset.asset_holder;
        const dataHolder = {
          ...assetHolder,
          asset_id: asset?._id,
          asset_name: asset?.item,
          category: asset?.category,
          peripheral_type: asset?.peripheral_type,
          date_received: asset?.doi,
          asset,
        };
        if (assetHolderActive.length > 0) {
          assetHolderActive = [...assetHolderActive, dataHolder];
        } else {
          assetHolderActive = [dataHolder];
        }
      }
      asset?.asset_holder_history.map((history) => {
        const historyData = {
          ...history,
          asset_id: asset?._id,
          asset_name: asset?.item,
          category: asset?.category,
          peripheral_type: asset?.peripheral_type,
          asset,
        };
        if (assetHolderHistory.length > 0) {
          assetHolderHistory = [...assetHolderHistory, historyData];
        } else {
          assetHolderHistory = [historyData];
        }
      });
    });
    const { user } = await getUsers("/users");
    if (user) {
      let userData = [];
      user.map((user) => {
        const returnedUser = {
          ...user,
          asset_holder_history: assetHolderHistory?.filter((history) => {
            return history.sub === user.sub;
          }),
          asset_holder_active: assetHolderActive?.filter(
            (active) => active.sub === user.sub
          ),
        };
        if (userData.length === 0) {
          userData = [returnedUser];
        } else {
          userData = [...userData, returnedUser];
        }
      });
      console.log("UserData: ", userData);
      set(userAtom, userData);
      return { success: true, message: "Users Found!", user: userData };
    } else {
      return { success: true, message: "User Not Found" };
    }
  } catch (error) {
    console.log("Error: ", error);
    return { success: false, message: error };
  }
});
