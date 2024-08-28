import { restGet } from "@/app/utils";
import { atom } from "jotai";

export const dashBoardDataAtom = atom(null);
export const fetchDashboardDataAtom = atom(null, async (get, set) => {
  try {
    const response = await restGet("/assets");
    if (response?.success) {
      set(dashBoardDataAtom, response?.response);
      return { success: true, message: "Data Fetched" };
    }
  } catch (error) {
    console.log("Error Fetching Dashboard Data");
    return { success: false, error: error };
  }
});
