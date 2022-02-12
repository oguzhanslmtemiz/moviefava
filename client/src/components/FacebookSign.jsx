import React from "react";
// import { useNavigate } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import FacebookIcon from "@mui/icons-material/Facebook";
import { sendFacebookCredentialsThenFetchToken } from "../api";
import "../styles/style.css";

export default function FacebookSign() {
  // let navigate = useNavigate();

  const responseFacebook = async (response) => {
    try {
      const { data } = await sendFacebookCredentialsThenFetchToken(response);
      localStorage.setItem("jwt", JSON.stringify(data));
      // redirect
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  return (
    <FacebookLogin
      appId="281962514006264"
      fields="name,email,picture"
      callback={responseFacebook}
      icon={<FacebookIcon sx={{ mr: 1 }} />}
      size="small"
    />
  );
}
