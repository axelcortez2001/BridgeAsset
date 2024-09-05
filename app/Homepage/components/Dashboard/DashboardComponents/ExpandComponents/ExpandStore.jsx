import { atom } from "jotai";

export const selectedValueDataAtom = atom(null);
export const isBranchOpenAtom = atom(false);
export const filterTypeAtom = atom("monthly");

export const statusLabelsAtom = atom([
  {
    name: "Stock",
    backgroundColor: "rgba(249, 115, 22, 0.5)",
    borderColor: "rgba(249, 115, 22,  1)",
  },
  {
    name: "Active",
    backgroundColor: "rgba(34, 197, 94, 0.5)",
    borderColor: "rgba(34, 197, 94, 1)",
  },
  {
    name: "Defective",
    backgroundColor: "rgba(239, 68, 68,  0.5)",
    borderColor: "rgba(239, 68, 68, 1)",
  },
  {
    name: "Others",
    backgroundColor: "rgba(146, 64, 14,  0.5)",
    borderColor: "rgba(2146, 64, 14, 1)",
  },
]);

export const branchLabelsAtom = atom([
  {
    name: "laoag",
    backgroundColor: "rgba(249, 115, 22, 0.5)",
    borderColor: "rgba(249, 115, 22,  1)",
  },
  {
    name: "makati",
    backgroundColor: "rgba(34, 197, 94, 0.5)",
    borderColor: "rgba(34, 197, 94, 1)",
  },
  {
    name: "australia",
    backgroundColor: "rgba(146, 64, 14,  0.5)",
    borderColor: "rgba(2146, 64, 14, 1)",
  },
]);

export const warrantyLabelsAtom = atom([
  {
    name: "above",
    backgroundColor: "rgba(249, 115, 22, 0.5)",
    borderColor: "rgba(249, 115, 22,  1)",
  },
  {
    name: "Good",
    backgroundColor: "rgba(34, 197, 94, 0.5)",
    borderColor: "rgba(34, 197, 94, 1)",
  },
  {
    name: "outOfWarranty",
    backgroundColor: "rgba(239, 68, 68,  0.5)",
    borderColor: "rgba(239, 68, 68, 1)",
  },
  {
    name: "invalid",
    backgroundColor: "rgba(146, 64, 14,  0.5)",
    borderColor: "rgba(2146, 64, 14, 1)",
  },
]);
