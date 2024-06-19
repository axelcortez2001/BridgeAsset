"use client";
import React, { useEffect } from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import config from "../../src/amplifyconfiguration.json";

import { useAtom, useSetAtom } from "jotai";
import { registerUser, userDataAtom } from "./AssetStore";
import MainContent from "./maincontent";

Amplify.configure(config);
const Homepage = () => {
  const userData = useAtom(userDataAtom);
  const register = useSetAtom(registerUser);
  useEffect(() => {
    const handleSignin = async () => {
      try {
        const result = await register();
        if (result.success) {
          console.log("User Registered");
        } else {
          console.log("User Failed");
        }
      } catch (error) {
        console.log("Error registering user: ", error);
      }
    };
    handleSignin();
  }, [userData]);
  return (
    <Authenticator>
      <MainContent />
    </Authenticator>
  );
};

export default withAuthenticator(Homepage);
