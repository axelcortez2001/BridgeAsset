import { fetchUserAttributes } from "aws-amplify/auth";
import { atom } from "jotai";
import { getUsers, restInsert } from "../utils";

export const selectedTypeAtom = atom("laptop");
export const employeeOptionsAtom = atom([]);
export const fetchEmployeeAtom = atom(null, async (get, set) => {
  try {
    const { user } = await getUsers("/users");
    set(employeeOptionsAtom, user);
  } catch (e) {
    console.log(e);
  }
});
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
  if (userResponse.success) {
    return { success: true, userResponse };
  } else {
    return { success: false };
  }
});


export const sideBarLocation = atom("dashboard");
export const setSideBarLocation = atom(null, (get, set, location) => {
  set(sideBarLocation, location);
});
