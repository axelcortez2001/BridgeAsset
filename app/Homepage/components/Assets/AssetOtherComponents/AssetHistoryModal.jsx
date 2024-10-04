import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Image,
  Divider,
} from "@nextui-org/react";
import { format } from "date-fns";

const AssetHistoryModal = ({ isOpen, onClose, history, type }) => {
  const formatDate = (opt) => {
    let formattedDate = format(new Date(opt), "MMM d, yyyy");
    return formattedDate;
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={() => onClose()}
        size={type === "asset" && "xl"}
        className={`rounded-lg max-h-[80%]`}
      >
        <ModalContent>
          <ModalHeader className="h-[40px] border-b flex flex-col bg-a-lightgrey justify-center">
            {type === "asset" ? (
              <p>
                History logs at {history && formatDate(history.date_updated)}
              </p>
            ) : (
              "USER HISTORY"
            )}
          </ModalHeader>
          <ModalBody className="p-4 overflow-y-auto">
            {history && type === "asset" ? (
              <>
                <Table
                  shadow="md"
                  hideHeader
                  aria-label="ShowData"
                  classNames={{
                    wrapper: "p-0 rounded-lg",
                    td: "border ",
                  }}
                >
                  <TableHeader>
                    <TableColumn>DATE UPDATED</TableColumn>
                  </TableHeader>

                  <TableBody>
                    <TableRow key="Header">
                      <TableCell className="font-bold text-center">
                        Actions Taken
                      </TableCell>
                    </TableRow>
                    {history &&
                      history?.actions_taken.map((item, index) => (
                        <TableRow
                          key={index}
                          className="select-none hover:bg-a-blue/20 hover:text-a-blue/80 "
                        >
                          <TableCell className="font-medium">{item}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </>
            ) : (
              <div>
                <div className="flex flex-row gap-2 items-center">
                  <div>
                    <Image
                      src={history?.picture}
                      alt="avatar"
                      className="h-[76px] w-[76px] rounded-full"
                    />
                  </div>
                  <div className="leading-tight">
                    <p className="font-medium">{history?.name}</p>
                    <p className="text-a-blue">{history?.email}</p>
                  </div>
                </div>

                <Divider className="my-4" />

                <div className="leading-tight">
                  <p>
                    <span className="font-medium">DATE RECEIVED - </span>
                    {history && formatDate(history?.date_received)}
                  </p>
                  <p>
                    <span className="font-medium">DATE RETURN - </span>
                    {history && formatDate(history?.date_return)}
                  </p>
                </div>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AssetHistoryModal;
