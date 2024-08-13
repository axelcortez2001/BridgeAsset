import { fetchUserAttributes } from "aws-amplify/auth";
import { atom } from "jotai";
import { getUsers, restDelete, restGet, restInsert } from "../utils";

export const selectedTypeAtom = atom("laptop");
export const employeeOptionsAtom = atom([]);
export const filteredEmployeesAtom = atom([]);
export const filteredEmployeesForMonitorAtom = atom([]);
export const selectedAssetDataAtom = atom(null);
export const assetDataAtom = atom(null);

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
    return { success: true, userResponse };
  } else {
    return { success: false };
  }
});

export const fetchAssetDataAtom = atom(null, async (get, set) => {
  const response = await restGet("/assets");
  const selectedType = get(selectedTypeAtom);
  console.log(response);
  if (response?.success) {
    const willReturn = response?.response;
    if (response && response?.response?.length > 0) {
      const finalReturn = willReturn.filter((asset) => {
        return asset?.category === selectedType;
      });
      
      return { success: true, response: finalReturn };
    } else {
      return [];
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
    console.log("Category: ", category);
    const filteredAssetData = assetData.filter((asset) => {
      return asset?.category === category;
    });
    console.log("filteredAssetData: ", filteredAssetData);
    const assetDataWithHolder = filteredAssetData
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
    const { user } = await getUsers("/users");
    const returnedUser = user.filter(
      (user) => !assetDataWithHolder.includes(user.sub)
    );
    set(filteredEmployeesAtom, returnedUser);
    set(employeeOptionsAtom, returnedUser);
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
      set(assetDataAtom, newAssetData);
      return { success: true, response };
    } else {
      return { success: false };
    }
  } catch (e) {
    console.log("Error: ", e);
  }
});
