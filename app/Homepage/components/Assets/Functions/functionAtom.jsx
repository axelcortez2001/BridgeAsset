import { fetchUserAttributes } from "aws-amplify/auth";
import { atom } from "jotai";
import { actionHistoryAtom } from "../Store/LaptopStore";
import { actionMonitorHistoryAtom } from "../Store/MonitorStore";
import { actionPeripheralHistoryAtom } from "../Store/PeripheralStore";

export const historyActionfunction = atom(
  null,
  async (get, set, message) => {
    const user = await fetchUserAttributes();
    const historyArray = get(actionHistoryAtom);
    const action = message;
    const actionDefinition = user.name + " " + action;
    const newActionHistory = [actionDefinition, ...historyArray];
    set(actionHistoryAtom, newActionHistory);
  }
);
export const historyMonitorActionFunction = atom(
  null,
  async (get, set, field, newData, oldData) => {
    const user = await fetchUserAttributes();
    const historyArray = get(actionMonitorHistoryAtom);
    const action = "set" + field + " to " + newData + " from " + oldData;
    const actionDefinition = user.name + " " + action;
    const newActionHistory = [actionDefinition, ...historyArray];
    set(actionMonitorHistoryAtom, newActionHistory);
  }
);
export const historyPeripheralActionFunction = atom(
  null,
  async (get, set, field, newData, oldData) => {
    const user = await fetchUserAttributes();
    const historyArray = get(actionPeripheralHistoryAtom);
    const action = "set" + field + " to " + newData + " from " + oldData;
    const actionDefinition = user.name + " " + action;
    const newActionHistory = [actionDefinition, ...historyArray];
    set(actionPeripheralHistoryAtom, newActionHistory);
  }
);
//inputSelection function
export const handleInput = (setter) => (field, newData, oldData) => {
  console.log("Field ", field);
  console.log("New Data: ", newData);
  console.log("Old Data: ", oldData);
};
