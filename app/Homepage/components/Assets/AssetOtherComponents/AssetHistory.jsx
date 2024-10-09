import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Image,
} from "@nextui-org/react";
import { useState } from "react";
import { format } from "date-fns";
import AssetHistoryModal from "./AssetHistoryModal";

const AssetHistory = ({ history, type }) => {
  const [isHistoryModal, setHistoryModal] = useState(false);
  const [viewHistoryData, setHistoryData] = useState("");

  const formatDate = (opt) => {
    let formattedDate = format(new Date(opt), "MMM d, yyyy");
    return formattedDate;
  };

  const handleHistoryModal = (item) => {
    setHistoryData(item);
    setHistoryModal((prev) => !prev);
  };

  const details = {
    asset: {
      header1: "DATE UPDATED",
      header2: "ACTIONS TAKEN",
    },
    user: {
      header1: "USER",
      header2: "DATE RANGE",
    },
  };

  return (
    <>
      {history.length > 0 ? (
        <div className="h-full w-full">
          <Table
          shadow="md"
            hideHeader
            aria-label="ShowData"
            classNames={{
              wrapper: "p-0 rounded-lg",
              td: "border",
              
            }}
          >
            <TableHeader>
              <TableColumn>{details?.[type].header1}</TableColumn>
              <TableColumn>{details?.[type].header2}</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="Header">
                <TableCell className="font-bold text-center">
                  {details?.[type].header1}
                </TableCell>
                <TableCell className="font-bold text-center">
                  {details?.[type].header2}
                </TableCell>
              </TableRow>

              {history?.map((item, index) => (
                <TableRow
                  key={index}
                  onClick={() => handleHistoryModal(item)}
                  className="cursor-pointer select-none hover:bg-a-blue/20 hover:text-a-blue/80 "
                >
                  <TableCell className="font-bold">
                    {item !== "" && item !== null && item !== undefined ? (
                      type === "asset" ? (
                        formatDate(item.date_updated)
                      ) : (
                        type === "user" && (
                          <div className="flex flex-row items-center gap-2">
                            <Image
                              src={item?.picture}
                              alt="avatar"
                              className="h-[36px] w-[36px] rounded-full"
                            />
                            <p>{item?.name}</p>
                          </div>
                        )
                      )
                    ) : (
                      <p className="text-a-red">NO RECORD</p>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    {item !== "" && item !== null && item !== undefined ? (
                      type === "asset" ? (
                        <div className="flex flex-row gap-2 items-center">
                          {item.actions_taken[0]}{" "}
                          {item.actions_taken.length > 1 && (
                            <div className="bg-a-grey rounded-full px-2 flex-none ">
                              + {item.actions_taken.length - 1}
                            </div>
                          )}
                        </div>
                      ) : (
                        type === "user" && (
                          <p>
                            {formatDate(item?.date_received)} -{" "}
                            {formatDate(item?.date_return)}
                          </p>
                        )
                      )
                    ) : (
                      <p className="text-a-red">NO RECORD</p>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-a-red">NO RECORD</p>
      )}

      <AssetHistoryModal
        isOpen={isHistoryModal}
        onClose={handleHistoryModal}
        history={viewHistoryData}
        type={type}
      />
    </>
  );
};

export default AssetHistory;
