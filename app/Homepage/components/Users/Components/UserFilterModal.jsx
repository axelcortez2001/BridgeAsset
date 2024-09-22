import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const UserFilterModal = ({ isOpen, onClose, applyFilter }) => {
  const [filterItem, setFilterItem] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCompleteStatus, setFilterCompleteStatus] = useState("All");

  const handleSave = () => {
    applyFilter([filterItem, filterStatus, filterCompleteStatus]);
    onClose();

    toast.success("Filter Applied!");
  };

  const filterOptionItem = [
    {
      key: "all",
      value: "All",
    },
    {
      key: "laptop",
      value: "Laptop",
    },
    {
      key: "monitor",
      value: "Monitor",
    },
    {
      key: "peripheral",
      value: "Peripheral",
    },
  ];

  const filterOptionStatus = [
    {
      key: "all",
      value: "All",
    },
    {
      key: "active",
      value: "Active",
    },
    {
      key: "no_issued",
      value: "No Issued",
    },
  ];

  const filterOptionCompleteStatus = [
    {
      key: "all",
      value: "All",
    },
    {
      key: "complete",
      value: "Complete",
    },
    {
      key: "incomplete",
      value: "Incomplete",
    },
  ];

  useEffect(() => {
    if (filterItem === "All") {
      setFilterStatus("All");
    }
  }, [filterItem]);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={() => onClose()}
        size="2xl"
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader className="h-[60px] p-4 border-b border-a-grey/80">
            <div className="flex items-center">
              <p>FILTER ASSET</p>
            </div>
          </ModalHeader>
          <ModalBody className="p-4 ">
            <div className="h-min flex items-center ">
              <div className="w-full space-y-4 p-2">
                <div className="w-full space-y-2">
                  <div>
                    <p className="font-semibold">Asset Item:</p>
                  </div>
                  <div className="flex gap-2 w-full flex-wrap">
                    {filterOptionItem.map((item) => (
                      <Button
                        key={item.key}
                        onPress={() => setFilterItem(item.value)}
                        className={`flex-1 rounded-lg font-medium tracking-wide bg-transparent border-a-blue border hover:bg-a-blue hover:text-a-white text-a-blue ${
                          filterItem === item.value
                            ? "bg-a-blue text-a-white font-bold"
                            : "bg-transparent"
                        }`}
                      >
                        {item.value}
                      </Button>
                    ))}
                  </div>
                </div>

                {filterItem !== "All" && (
                  <div className="space-y-2">
                    <div>
                      <p className="font-semibold">Individual Status</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {filterOptionStatus.map((item) => (
                        <Button
                          key={item.key}
                          onPress={() => setFilterStatus(item.value)}
                          className={`flex-1 rounded-lg font-medium tracking-wide bg-transparent border-a-blue border hover:bg-a-blue hover:text-a-white text-a-blue ${
                            filterStatus === item.value
                              ? `${
                                  filterStatus === "Active"
                                    ? "bg-a-green text-a-black font-bold border-a-green hover:border-none"
                                    : `${
                                        filterStatus === "No Issued"
                                          ? "bg-a-red text-a-white font-bold border-a-red"
                                          : "bg-a-blue text-a-white font-bold"
                                      }`
                                }`
                              : "bg-transparent"
                          }`}
                        >
                          {item.value}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="w-full space-y-2">
                  <div>
                    <p className="font-semibold">Complete Status:</p>
                  </div>
                  <div className="flex gap-2 w-full flex-wrap">
                    {filterOptionCompleteStatus.map((item) => (
                      <Button
                        key={item.key}
                        onPress={() => setFilterCompleteStatus(item.value)}
                        className={`flex-1 rounded-lg font-medium tracking-wide bg-transparent border-a-blue border hover:bg-a-blue hover:text-a-white text-a-blue ${
                          filterCompleteStatus === item.value
                            ? `${
                                filterCompleteStatus === "Complete"
                                  ? "bg-a-green text-a-black font-bold border-a-green hover:border-none"
                                  : `${
                                      filterCompleteStatus === "Incomplete"
                                        ? "bg-a-red text-a-white font-bold border-a-red"
                                        : "bg-a-blue text-a-white font-bold"
                                    }`
                              }`
                            : "bg-transparent"
                        }`}
                      >
                        {item.value}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="p-2 h-[60px] border-t border-a-grey/80">
            <div className="flex gap-2">
              <Button
                onPress={() => onClose()}
                className="bg-a-red text-a-white"
              >
                Cancel
              </Button>
              <Button onPress={handleSave} className="bg-a-blue text-a-white">
                Save
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UserFilterModal;
