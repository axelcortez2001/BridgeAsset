import { Input, Textarea } from "@nextui-org/react";

const InputFields = ({
  isRequired = false,
  label,
  value,
  setValue,
  type = "text",
  size = "sm",
  isDisabled = false,
  textArea = false,
  className,
}) => {
  return (
    <div>
      {!textArea ? (
        <Input
          isDisabled={isDisabled}
          isRequired={isRequired}
          type={type}
          label={label}
          size={size}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          classNames={{
            inputWrapper: "bg-a-lightgrey drop-shadow-sm",
            label: "text-a-black",
          }}
        />
      ) : (
        <Textarea
          isDisabled={isDisabled}
          isRequired={isRequired}
          type={type}
          label={label}
          size={size}
          value={value}
          className={className}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
    </div>
  );
};

export default InputFields;
