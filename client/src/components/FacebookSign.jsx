import { useNavigate } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useSnackbar } from "notistack";
import { sendFacebookCredentialsThenFetchToken } from "../api";
import useAuth from "../contexts/AuthContext";
import "../styles/style.css";

export default function FacebookSign() {
  const { enqueueSnackbar } = useSnackbar();
  const { login, setUser } = useAuth();

  const navigate = useNavigate();

  const responseFacebook = async (response) => {
    try {
      const { data } = await sendFacebookCredentialsThenFetchToken(response);
      login().then(() => {
        localStorage.setItem("jwt", data.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...data.data.user, avatar: response.picture.data.url })
        );
        setUser({ ...data.data.user, avatar: response.picture.url });
        enqueueSnackbar(JSON.stringify(data.message), { variant: "success" });
        navigate("/profile");
      });
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  return (
    <FacebookLogin
      appId="645304280003435"
      fields="name,email,picture"
      callback={responseFacebook}
      icon={<FacebookIcon sx={{ mr: 1 }} />}
      size="small"
    />
  );
}
