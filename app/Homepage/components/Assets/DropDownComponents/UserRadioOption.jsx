import React from "react";
import { RadioGroup, Radio } from "@nextui-org/react";
const UserRadioOption = ({ userType, setUserType, isDisabled }) => {
  return (
    <>
      <p className="text-sm text-a-black">User Type</p>
      <RadioGroup
        orientation="horizontal"
        value={userType}
        onValueChange={setUserType}
        isDisabled={isDisabled}
      >
        <Radio
          classNames={{
            control: "bg-a-blue",
            wrapper: "border-2 !border-a-blue",
          }}
          value="Employee"
        >
          Employee
        </Radio>
        <Radio
          classNames={{
            control: "bg-a-blue",
            wrapper: "border-2 !border-a-blue",
          }}
          value="Interns"
        >
          Interns
        </Radio>
        <Radio
          classNames={{
            control: "bg-a-blue",
            wrapper: "border-2 !border-a-blue",
          }}
          value="Admin"
        >
          Admin
        </Radio>
      </RadioGroup>
    </>
  );
};

export default UserRadioOption;
