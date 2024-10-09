import {
  MdOutlineDashboard,
  MdMonitor,
  MdOutlineMouse,
  MdLaptop,
} from "react-icons/md";
import { FaRegUser, FaRegClipboard } from "react-icons/fa";
import { LuMonitorPlay } from "react-icons/lu";
import { IoMenu } from "react-icons/io5";
import { FaListUl } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import { RxCardStack } from "react-icons/rx";
import { CiViewTable } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";

const dashboardIcon = (className) => {
  return <MdOutlineDashboard className={`${className} h-5 w-5`} />;
};

const userIcon = (className) => {
  return <FaRegUser className={`${className} h-5 w-5 `} />;
};

const assetIcon = (className) => {
  return <FaRegClipboard className={`${className} h-5 w-5`} />;
};

const laptopIcon = (className) => {
  return <MdLaptop className={`${className} h-5 w-5`} />;
};

const monitorIcon = (className) => {
  return <LuMonitorPlay className={`${className} h-5 w-5`} />;
};

const peripheralsIcon = (className) => {
  return <MdOutlineMouse className={`${className} h-5 w-5`} />;
};

const menuIcon = (className) => {
  return <IoMenu className={`${className} h-5 w-5`} />;
};

const allIcon = (className) => {
  return <FaListUl className={`${className} h-5 w-5`} />;
};

const filterIcon = (className) => {
  return <IoFilter className={`${className} h-5 w-5`} />;
};

const searchIcon = (className) => {
  return <IoSearch className={`${className} h-5 w-5`} />;
};

const addIcon = (className) => {
  return <IoIosAdd className={`${className} h-5 w-5`} />;
};

const cardIcon = (className) => {
  return <RxCardStack className={`${className} h-5 w-5`} />;
};

const tableIcon = (className) => {
  return <CiViewTable className={`${className} h-5 w-5`} />;
};

const editIcon = (className) => {
  return <FaRegEdit className={`${className} h-5 w-5`} />;
};

export {
  dashboardIcon,
  userIcon,
  assetIcon,
  laptopIcon,
  monitorIcon,
  peripheralsIcon,
  menuIcon,
  allIcon,
  filterIcon,
  searchIcon,
  addIcon,
  cardIcon,
  tableIcon,
  editIcon,
};
