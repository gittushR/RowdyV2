import React from "react";
import "./login.css";
import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div className="loginPage">
      <SignIn
        routing="virtual"
        signUpUrl="/sign-up"
        fallbackRedirectUrl={"/dashboard"}
      ></SignIn>
    </div>
  );
};

export default Login;
