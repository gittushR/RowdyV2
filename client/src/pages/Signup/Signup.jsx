import React from "react";
import "./signup.css";
import { SignUp } from "@clerk/clerk-react";

const Signup = () => {
  return (
    <div className="signUpPage">
      <SignUp routing="virtual" />
    </div>
  );
};

export default Signup;

