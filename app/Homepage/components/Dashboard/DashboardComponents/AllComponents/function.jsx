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

export const dynamicValues = (chartData, labels) => {
  const statusLabels = [
    {
      name: "Stock",
      backgroundColor: "rgba(249, 115, 22, 0.2)",
      borderColor: "rgba(249, 115, 22,  1)",
    },
    {
      name: "Active",
      backgroundColor: "rgba(34, 197, 94, 0.2)",
      borderColor: "rgba(34, 197, 94, 1)",
    },
    {
      name: "Defective",
      backgroundColor: "rgba(239, 68, 68,  0.2)",
      borderColor: "rgba(239, 68, 68, 1)",
    },
    {
      name: "Others",
      backgroundColor: "rgba(146, 64, 14,  0.2)",
      borderColor: "rgba(2146, 64, 14, 1)",
    },
  ];
  console.log("ChartData: ", chartData);
  const datasets = statusLabels.map((stat) => {
    const label = stat.name;
    const backgroundColor = stat.backgroundColor;
    const borderColor = stat.borderColor;

    const data = labels.map((category) => {
      let count = 0;

      chartData.newAsset[category].forEach((asset) => {
        if (asset.category === "laptop") {
          // Define a condition for each status
          const isStock = stat.name === "Stock" && asset.item_stats === "SOH";
          const isActive =
            stat.name === "Active" && asset.item_stats === "Active";
          const isDefective =
            stat.name === "Defective" && asset.item_stats === "For Repair";
          const isOthers =
            stat.name === "Others" &&
            asset.item_stats !== "For Repair" &&
            asset.item_stats !== "Active" &&
            asset.item_stats !== "SOH";
          if (isStock || isActive || isDefective || isOthers) {
            count += 1;
          }
        } else if (
          asset.category === "monitor" ||
          asset.category === "peripheral"
        ) {
          const isStock =
            stat.name === "Stock" && asset.status.name === "Stock";
          const isActive =
            stat.name === "Active" &&
            (asset.status.name === "Active" || asset.status.name === "Issued");
          const isDefective =
            stat.name === "Defective" && asset.status.name === "Defective";
          const isOthers =
            stat.name === "Others" &&
            (asset.status.name === "Archive" ||
              asset.status.name === "Transfer");
          if (isStock || isActive || isDefective || isOthers) {
            count += 1;
          }
        }
      });

      return count;
    });

    return { label, backgroundColor, borderColor, data };
  });
  const newData = labels.map((category) => {
    let count = 0;
    const newData = chartData.newAsset[category].map((asset) => {
      if (asset.status.name === "Stock") {
        count += 1;
      }
    });
    return count;
  });
  console.log("Data Sets: ", datasets);
  console.log(newData);
  return { labels, datasets };
};
