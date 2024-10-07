import Image from "next/image";

const NoItems = ({
  label = "",
  item = "",
  classNameImage = "",
  classNameLabel = "text-lg",
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex items-center justify-center mr-4">
        <Image
          loading="eager"
          className={`drop-shadow-xl saturate-[.60] ${classNameImage}`}
          src={"/Image/emptyBox.png"}
          alt="Empty_Box"
          width={180}
          height={180}
        />
      </div>
      <p className={`font-medium text-center ${classNameLabel}`}>
        {label === "" ? (
          <>
            THERE ARE NO
            <span className="font-semibold"> {item.toUpperCase()}</span> ITEMS
          </>
        ) : (
          <>{label}</>
        )}
      </p>
    </div>
  );
};

export default NoItems;
