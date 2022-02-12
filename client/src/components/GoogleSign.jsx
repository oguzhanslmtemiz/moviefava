import React from "react";
// import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { sendGoogleCredentialsThenFetchToken } from "../api";

export default function GoogleSign() {
  // let navigate = useNavigate();

  const onSuccess = async (response) => {
    try {
      const { data } = await sendGoogleCredentialsThenFetchToken(response.profileObj);
      localStorage.setItem("jwt", JSON.stringify(data));
      // redirect
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  const onFailure = (response) => {
    console.log("ERROR:", response);
  };

  return (
    <GoogleLogin
      clientId="127748844213-jpopkbo6q993o1udkdg8dv07qpfq8kpd.apps.googleusercontent.com"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
}
