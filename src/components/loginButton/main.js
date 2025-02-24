import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./style.scss"; // Import styles

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button className="login-button" onClick={() => loginWithRedirect()}>
      Log In
    </button>
  );
};

export default LoginButton;