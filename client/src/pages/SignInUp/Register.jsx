import { useState } from "react";
import { Button, FormControl, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import styles from "./SignInUp.module.css";
import { signUp } from "../../api";

const inputStyle = { maxWidth: 380, width: "100%" };

export default function Register({setSignUpMode}) {
  const { enqueueSnackbar } = useSnackbar();

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const handleRegister = async (body) => {
    try {
      const { data } = await signUp(body);
      enqueueSnackbar(JSON.stringify(data.message), { variant: "success" });
      enqueueSnackbar("You will not be redirected. Please go and login", { variant: "info" });
      setSignUpMode("")
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { data, payload } = error.response.data;
        payload?.statusCode === 409
          ? enqueueSnackbar(
              `A user with this ${payload.message.split("'")[1]} already exists`,
              { variant: "warning" }
            )
          : enqueueSnackbar(JSON.stringify(payload?.message), {
              variant: "error",
            });
        console.log("error.response", error.response.data);
        data?.forEach((err) => {
          if (err.context.key === "username") {
            setUsernameError(true);
            setUsernameErrorMessage(err.message);
          }
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
    handleRegister(body);
  };

  return (
    <FormControl
      className={styles["sign-up-form"]}
      component="form"
      noValidate
      onSubmit={handleSubmit}
    >
      <TextField
        sx={inputStyle}
        margin="normal"
        label="Username"
        name="username"
        required
        error={usernameError}
        helperText={usernameErrorMessage}
        onChange={() => {
          setUsernameError(false);
          setUsernameErrorMessage("");
        }}
      />
      <TextField
        sx={inputStyle}
        margin="normal"
        label="Email Address"
        type="email"
        name="email"
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
          mt: 3,
        }}
      >
        Sign Up
      </Button>
    </FormControl>
  );
}
