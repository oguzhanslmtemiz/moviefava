import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { useSnackbar } from "notistack";
import { sendGoogleCredentialsThenFetchToken } from "../api";
import useAuth from "../contexts/AuthContext";

export default function GoogleSign() {
  const { enqueueSnackbar } = useSnackbar();
  const { login, setUser } = useAuth();

  const navigate = useNavigate();

  const onSuccess = async (response) => {
    try {
      const { data } = await sendGoogleCredentialsThenFetchToken(response.profileObj);

      await login().then(() => {
        localStorage.setItem("jwt", data.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...data.data.user, avatar: response.profileObj.imageUrl })
        );
        setUser({ ...data.data.user, avatar: response.profileObj.imageUrl });
        enqueueSnackbar(JSON.stringify(data.message), { variant: "success" });
        navigate("/profile");
      });
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
