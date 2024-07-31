import React from "react";
import { RadioGroup, Radio } from "@nextui-org/react";
const UserRadioOption = ({ userType, setUserType }) => {
  return (
    <RadioGroup
      label=' User Type'
      orientation='horizontal'
      value={userType}
      onValueChange={setUserType}
    >
      <Radio value='Employee'>Employee</Radio>
      <Radio value='Interns'>Interns</Radio>
      <Radio value='Admin'>Admin</Radio>
    </RadioGroup>
  );
};

export default UserRadioOption;
