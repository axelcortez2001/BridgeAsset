import {
  addIcon,
  cardIcon,
  filterIcon,
  searchIcon,
  tableIcon,
} from "@/public/Icon";
import { Button, Input } from "@nextui-org/react";
import UserFilterModal from "../Homepage/components/Users/Components/UserFilterModal";
import { useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";

const SearchBar = ({
  dataIsLoading,
  searchValue,
  setSearchValue,
  filterOption = false,
  viewOption = false,
  addOption = false,
  applyFilter,
  isViewBlock,
  changeView,
  addAction,
}) => {
  const [isFilterModal, setFilterModal] = useState(false);

  const handleFilterModal = () => {
    setFilterModal((prev) => !prev);
  };

  return (
    <div className="flex gap-2">
      <Input
        startContent={searchIcon("text-a-black")}
        placeholder="Search here..."
        className="tracking-wide"
        classNames={{ inputWrapper: "bg-a-white drop-shadow-md" }}
        value={searchValue}
        onValueChange={setSearchValue}
        isDisabled={dataIsLoading}
        endContent={
          <>
            <TiDeleteOutline
              onClick={() => setSearchValue("")}
              className={`${
                searchValue === "" ? "hidden" : "block"
              } h-6 w-6 text-a-black cursor-pointer`}
            />
          </>
        }
      />

      {filterOption && (
        <div>
          <Button
            className="bg-a-white drop-shadow-md"
            isIconOnly
            onClick={handleFilterModal}
            isDisabled={dataIsLoading}
          >
            {filterIcon()}
          </Button>
        </div>
      )}

      {viewOption && (
        <div>
          <Button
            onClick={() => changeView()}
            className="bg-a-white drop-shadow-md"
          >
            <div>{isViewBlock ? cardIcon() : tableIcon()}</div>
            <div>{isViewBlock ? "Card View" : "Table View"}</div>
          </Button>
        </div>
      )}

      {addOption && (
        <div>
          <Button
            className="bg-a-white drop-shadow-md"
            onPress={() => addAction()}
            isIconOnly
          >
            {addIcon()}
          </Button>
        </div>
      )}

      <UserFilterModal
        isOpen={isFilterModal}
        onClose={handleFilterModal}
        applyFilter={applyFilter}
      />
    </div>
  );
};

export default SearchBar;
