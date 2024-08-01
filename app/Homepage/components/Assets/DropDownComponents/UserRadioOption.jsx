import React from "react";
import { RadioGroup, Radio } from "@nextui-org/react";
const UserRadioOption = ({ userType, setUserType, isDisabled }) => {
  return (
    <RadioGroup
      label=' User Type'
      orientation='horizontal'
      value={userType}
      onValueChange={setUserType}
      isDisabled={isDisabled}
    >
      <Radio value='Employee'>Employee</Radio>
      <Radio value='Interns'>Interns</Radio>
      <Radio value='Admin'>Admin</Radio>
    </RadioGroup>
  );
};

export default UserRadioOption;
