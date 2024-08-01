export function historyActionfunction(field, newData, oldData) {
  const action = "set" + field + " to " + newData + " from " + oldData;
  console.log(action);
  return action;
}
