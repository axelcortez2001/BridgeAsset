import { addYears, differenceInDays } from "date-fns";

export const checkWarrantyPeriod = (opt, dop) => {
  if (opt && dop) {
    const newDate = addYears(new Date(dop), parseFloat(opt));
    const formattedDate = new Date(newDate).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return <div>{formattedDate}</div>;
  } else {
    return <div className='text-red-400'>Invalid</div>;
  }
};

export const checkWarrantStatus = (opt, dop) => {
  if (opt && dop) {
    const dateToday = new Date();
    const oldDop = new Date(dop);
    const newDop = addYears(new Date(dop), parseFloat(opt));
    const threeYearsDop = addYears(new Date(dop), 3);
    console.log(threeYearsDop);
    if (dateToday <= newDop) {
      return <div className='text-green-500'>Good</div>;
    } else if (dateToday > threeYearsDop) {
      return <div className='text-red-400'>More than 3 years</div>;
    } else {
      return <div className='text-red-400'>Out of warranty</div>;
    }
  } else {
    return <div className='text-red-400'>Invalid</div>;
  }
};

export const computeYTD = (dop) => {
  if (dop) {
    const date = new Date();
    const totalDay = differenceInDays(new Date(date), new Date(dop));
    const ytd = parseFloat((parseFloat(totalDay) / 365.25).toFixed(2));
    if (typeof ytd === "number") {
      return ytd;
    } else {
      return "Invalid";
    }
  } else {
    return "Unavailable";
  }
};
