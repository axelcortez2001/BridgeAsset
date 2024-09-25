import Image from "next/image";

const NoItems = ({ item }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex items-center justify-center mr-4">
        <Image
          loading="eager"
          className="drop-shadow-xl saturate-[.60]"
          src={"/Image/emptyBox.png"}
          alt="Empty_Box"
          width={180}
          height={180}
        />
      </div>
      <p className="font-medium text-lg text-center">
        THERE ARE NO
        <span className="font-semibold"> {item.toUpperCase()}</span> ITEMS
      </p>
    </div>
  );
};

export default NoItems;
