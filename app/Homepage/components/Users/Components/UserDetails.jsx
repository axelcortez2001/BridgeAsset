import {
  assetDataAtom,
  globalActionStatusAtom,
  globalSelectedassetAtom,
  selectedAssetDataAtom,
  selectedTypeAtom,
  sideBarLocation,
} from "@/app/Homepage/AssetStore";
import { isValid } from "date-fns";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Listbox,
  ListboxItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import ViewModal from "../../Assets/AssetOtherComponents/ViewModal";
import { toast } from "sonner";
import { itemStatusOptionAtom } from "../../Assets/Store/LaptopStore";
import AddAsset from "../../Assets/AssetComponents/Asset";
import { useState } from "react";
import NoItems from "@/app/SharedComponents/NoItems";

const UserDetails = ({ userData }) => {
  const [isViewModal, setViewModal] = useState(false);
  const [isUpdateModal, setUpdateModal] = useState(false);

  const handleUpdateModal = () => {
    setUpdateModal((prev) => !prev);
  };

  const active = userData?.asset_holder_active;
  console.log("active: ", active);

  const formatDate = (opt) => {
    if (isValid(new Date(opt))) {
      const formattedDate = new Date(opt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      return formattedDate;
    } else {
      return "No Date";
    }
  };

  //navigation routing
  const setSideBar = useSetAtom(sideBarLocation);
  const [selectedType, setSelectedType] = useAtom(selectedTypeAtom);
  const [selectedAssetData, setSelectedAssetData] = useAtom(
    selectedAssetDataAtom
  );
  const setGlobalActionStatus = useSetAtom(globalActionStatusAtom);
  const assetData = useAtomValue(assetDataAtom);
  const [selectedAssetHere, setSelectedAssetHere] = useState(null);

  const handleOpen = (asset) => {
    setSelectedAssetHere(asset?.asset);
    setSelectedType(asset?.category);
    handleViewModal();
  };

  const setGlobalSelected = useSetAtom(globalSelectedassetAtom);

  const setItemStatusOption = useSetAtom(itemStatusOptionAtom);

  const handleSelect = async () => {
    if (selectedAssetHere === null) {
      toast.error("Invalid Asset Data");
    } else {
      setSelectedType(selectedAssetHere?.category);
      setSelectedAssetData(selectedAssetHere);
      setGlobalActionStatus(true);
      setGlobalSelected(selectedAssetHere);
      if (selectedAssetHere.category === "laptop") {
        setItemStatusOption("Update");
      }
    }
    handleUpdateModal();
  };

  const handleViewModal = () => {
    setViewModal((prev) => !prev);
  };

  return (
    <>
      {active.length > 0 ? (
        <Table
          shadow="md"
          hideHeader
          aria-label="ShowData"
          classNames={{
            wrapper: "rounded-lg p-0 mb-2",
            td: "border",
          }}
        >
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Item Type</TableColumn>
            <TableColumn>Date Received</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow className="cursor-default select-none">
              <TableCell className="font-bold text-center">Name</TableCell>
              <TableCell className="font-bold text-center">Item Type</TableCell>
              <TableCell className="font-bold text-center">
                Date Received
              </TableCell>
            </TableRow>

            {active &&
              active?.map((item, index) => (
                <TableRow
                  key={index}
                  onClick={() => handleOpen(item)}
                  className="cursor-pointer select-none hover:bg-a-blue/20 hover:text-a-blue/80 "
                >
                  <TableCell>{item?.asset_name}</TableCell>
                  <TableCell>
                    {item?.peripheral_type
                      ? item?.peripheral_type
                      : item?.category}
                  </TableCell>
                  <TableCell>{formatDate(item?.date_received)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      ) : (
        <div className="mb-2">
          <NoItems
            classNameImage={"h-[100px] w-auto"}
            classNameLabel={"text-base"}
            label="No Asset"
          />
        </div>
      )}

      {selectedAssetHere !== null && (
        <>
          <ViewModal
            isOpen={isViewModal}
            onClose={handleViewModal}
            asset={selectedAssetHere}
            handleSelectAsset={handleSelect}
          />

          <AddAsset
            isOpen={isUpdateModal}
            onclose={handleUpdateModal}
            from="modal"
            type="update"
          />
        </>
      )}
    </>
  );
};

export default UserDetails;
