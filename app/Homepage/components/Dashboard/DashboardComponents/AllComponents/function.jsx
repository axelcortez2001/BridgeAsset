export const computeTotalCost = (data) => {
  let totalCost = 0;
  data.forEach((item) => {
    totalCost += parseFloat(item.unit_price) || 0;
  });
  return totalCost.toFixed(2);
};

export const categorizedAsset = (data) => {
  let laptop = [];
  let monitor = [];
  let peripheral = [];
  data.forEach((item) => {
    if (item.category === "laptop") laptop.push(item);
    else if (item.category === "monitor") monitor.push(item);
    else if (item.category === "peripheral") peripheral.push(item);
  });
  const newAsset = {
    laptop: laptop,
    monitor: monitor,
    peripheral: peripheral,
  };
  return { newAsset };
};
