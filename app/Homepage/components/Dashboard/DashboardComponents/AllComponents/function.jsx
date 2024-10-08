import { addYears, format, isValid } from "date-fns";
import { computeYTD } from "../../../Assets/TableComponents/TableFunction";

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

export const categorizedBranch = (data) => {
  let laoag = [];
  let makati = [];
  let australia = [];
  data.forEach((item) => {
    if (item.branch.toLocaleLowerCase() === "laoag") laoag.push(item);
    else if (item.branch.toLocaleLowerCase() === "makati") makati.push(item);
    else if (item.branch.toLocaleLowerCase() === "australia")
      australia.push(item);
  });
  const newAsset = {
    laoag: laoag,
    makati: makati,
    australia: australia,
  };
  return { newAsset };
};

export const generateWarrantyStatus = (data) => {
  let Good = [];
  let above = [];
  let outOfWarranty = [];
  let invalid = [];
  //loop through data and set its warranty status
  data.forEach((item) => {
    const opt = item?.warranty_period;
    const dop = item?.dop;
    if (opt && dop) {
      const dateToday = new Date();
      const newDop = addYears(new Date(dop), parseFloat(opt));
      const threeYearsDop = addYears(new Date(dop), 3);
      if (dateToday <= newDop) {
        Good.push(item);
      } else if (dateToday > threeYearsDop) {
        above.push(item);
      } else {
        outOfWarranty.push(item);
      }
    } else {
      invalid.push(item);
    }
  });
  const newAsset = {
    Good: Good,
    above: above,
    outOfWarranty: outOfWarranty,
    invalid: invalid,
  };
  return { newAsset };
};

export const categorizedDate = (data, filterType) => {
  //filter date first
  const formatDate = (date, filterType) => {
    const d = new Date(date);
    switch (filterType) {
      case "daily":
        return isValid(d) ? format(d, "PP") : "No Date";

      case "monthly":
        return isValid(d) ? format(d, "MMMM yyyy") : "No Date";
      case "yearly":
        return isValid(d) ? format(d, "yyyy") : "No Date";
      default:
        return isValid(d) ? format(d, "PP") : "No Date";
    }
  };

  // Step 1: Sort Data by Date in Descending Order
  const sortedData = data.sort((a, b) => new Date(b.dop) - new Date(a.dop));
  // Step 2: Group by Date and Sum Unit Prices
  const dateMap = sortedData.reduce((acc, item) => {
    const formattedDate = formatDate(item.dop, filterType);
    if (!acc[formattedDate]) {
      acc[formattedDate] = 0;
    }
    acc[formattedDate] += item.unit_price;
    return acc;
  }, {});
  const dateValue = sortedData.reduce((acc, item) => {
    const formattedDate = formatDate(item.dop, filterType);
    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }
    acc[formattedDate].push(item);
    return acc;
  }, {});

  // Step 3: Convert Grouped Data to Arrays
  const labels = Object.keys(dateMap);
  const unitPrices = Object.values(dateMap);
  // Step 4: Sort Arrays by Date (Ascending)
  const sortedLabels = labels.sort((a, b) => new Date(a) - new Date(b));
  const sortedUnitPrices = sortedLabels.map((label) => dateMap[label]);
  // Get sorted values based on sorted labels
  const sortedValue = sortedLabels.map((label) => dateValue[label]);
  const newAsset = {
    labels: sortedLabels,
    unitPrices: sortedUnitPrices,
    value: sortedValue,
  };
  return { newAsset };
};
export const filterCategoryStatus = (chartData, labels, stat) => {
  const data = labels.map((category) => {
    let filteredArray = [];
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
          filteredArray.push(asset);
        }
      } else if (
        asset.category === "monitor" ||
        asset.category === "peripheral"
      ) {
        const isStock = stat.name === "Stock" && asset.status.name === "Stock";
        const isActive =
          stat.name === "Active" &&
          (asset.status.name === "Active" || asset.status.name === "Issued");
        const isDefective =
          stat.name === "Defective" && asset.status.name === "Defective";
        const isOthers =
          stat.name === "Others" &&
          (asset.status.name === "Archive" || asset.status.name === "Transfer");
        if (isStock || isActive || isDefective || isOthers) {
          filteredArray.push(asset);
        }
      }
    });

    return filteredArray;
  });
  return data;
};

export const generateYTD = (data) => {
  const ytdData = data.reduce((acc, item) => {
    const ytdDate = new Date(item.dop);
    const newItem = item?.item;
    if (!acc[newItem]) {
      acc[newItem] = [];
    }

    acc[newItem] = isNaN(computeYTD(ytdDate)) ? "No Data" : computeYTD(ytdDate);
    console.log(acc);
    return acc;
  }, []);
  return ytdData;
};
export const sortYTDData = (ytdData) => {
  const sortableArray = Object.entries(ytdData).map(([item, value]) => ({
    item,
    value: value === "No Data" ? -Infinity : value,
  }));

  sortableArray.sort((a, b) => b.value - a.value);
  const sortedYTD = sortableArray.reduce((acc, { item, value }) => {
    acc[item] = value === -Infinity ? "No Data" : value;
    return acc;
  }, {});

  return sortedYTD;
};

export const categorizedStatus = (data) => {
  let Stock = [];
  let Active = [];
  let Defective = [];
  let Others = [];
  data.forEach((item) => {
    if (item.category === "laptop") {
      if (item.item_stats === "SOH") Stock.push(item);
      else if (item.item_stats === "Active") Active.push(item);
      else if (item.item_stats === "For Repair") Defective.push(item);
      else Others.push(item);
    } else if (item.category === "monitor" || item.category === "peripheral") {
      if (item.status.name === "Stock") Stock.push(item);
      else if (item.status.name === "Active" || item.status.name === "Issued")
        Active.push(item);
      else if (item.status.name === "Defective") Defective.push(item);
      else Others.push(item);
    }
  });
  const newAsset = {
    Stock: Stock,
    Active: Active,
    Defective: Defective,
    Others: Others,
  };
  return { newAsset };
};
export const dynamicValues = (chartData, labels, expandIndex) => {
  const statusLabels = [
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
  ];
  const oldDataSets = statusLabels.map((stat) => {
    const label = stat.name;
    const backgroundColor = stat.backgroundColor;
    const borderColor = stat.borderColor;

    const filteredData = filterCategoryStatus(chartData, labels, stat);
    const data = labels.map((category) => {
      let count = 0;
      let filteredArray = [];
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
            filteredArray.push(asset);
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

    return { label, backgroundColor, borderColor, data, filteredData };
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
  let datasets = oldDataSets;
  if (expandIndex !== null) {
    datasets = datasets.filter((data, index) => {
      if (index === expandIndex) {
        return data;
      }
    });
  }
  return { labels, datasets };
};

//hakdog functions
export const expandAllFiltering = (data, expandIndex) => {
  if (data && Array.isArray(data.labels) && Array.isArray(data.datasets)) {
    const classificationMap = {};
    data.labels.forEach((label, index) => {
      if (expandIndex === null) {
        const returnData = {};
        classificationMap[label] = data.datasets?.forEach((dat) => {
          returnData[dat.label] = dat.filteredData[index];
        });

        classificationMap[label] = returnData;
      } else {
        classificationMap[label] =
          data.datasets[expandIndex]?.filteredData[index];
      }
    });

    return classificationMap;
  }
};

export const computeStat = (filteredData) => {
  if (filteredData?.length > 0) {
    let count = 0;
    const newData = filteredData.map((data) => {
      console.log();
    });
    return count;
  }
};
