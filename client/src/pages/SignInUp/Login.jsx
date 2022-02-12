import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, TextField, Button, Box } from "@mui/material";
import { useSnackbar } from "notistack";
import styles from "./SignInUp.module.css";
import GoogleSign from "../../components/GoogleSign";
import FacebookSign from "../../components/FacebookSign";
import { signIn } from "../../api";

export default function Login() {
  const { enqueueSnackbar } = useSnackbar();

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  let navigate = useNavigate();

  const handleLogin = async (body) => {
    try {
      const { data } = await signIn(body);
      enqueueSnackbar(JSON.stringify(data.message), { variant: "success" });
      navigate("/profile");
      localStorage.setItem("jwt", JSON.stringify(data.data));
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { data, payload } = error.response.data;
        enqueueSnackbar(JSON.stringify(payload?.message), {
          variant: "error",
        });
        // console.log("error.response", error.response.data);
        data?.forEach((err) => {
          if (err.context.key === "email") {
            setEmailError(true);
            setEmailErrorMessage(err.message);
          }
          if (err.context.key === "password") {
            setPasswordError(true);
            setPasswordErrorMessage(err.message);
          }
        });
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        enqueueSnackbar("Bad things happened :(", {
          variant: "error",
        });
        console.log("error.request", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        enqueueSnackbar("Something happened :)", { variant: "error" });
        console.log("Error", error.message);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = Object.fromEntries(formData.entries());
    handleLogin(body);
  };

  const inputStyle = { maxWidth: 380, width: "100%" };

  return (
    <FormControl
      className={styles["sign-in-form"]}
      component="form"
      onSubmit={handleSubmit}
      noValidate
    >
      <TextField
        sx={inputStyle}
        margin="normal"
        label="Email Address"
        name="email"
        type="email"
        required
        error={emailError}
        helperText={emailErrorMessage}
        onChange={() => {
          setEmailError(false);
          setEmailErrorMessage("");
        }}
      />
      <TextField
        sx={inputStyle}
        margin="normal"
        required
        name="password"
        label="Password"
        type="password"
        error={passwordError}
        helperText={passwordErrorMessage}
        onChange={() => {
          setPasswordError(false);
          setPasswordErrorMessage("");
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          width: 150,
          height: 49,
          bgcolor: "#f45d48",
          ":hover": { bgcolor: "#ef523c" },
          my: 2,
        }}
      >
        Sign In
      </Button>
      <Box sx={{ mt: 1 }}>
        <GoogleSign />
      </Box>
      <Box sx={{ mt: 1 }}>
        <FacebookSign />
      </Box>
    </FormControl>
  );
}
