// // import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import styles from "./SignInUp.module.css";
import { FormControl, TextField, Button } from "@mui/material";

export default function Login() {
  //   const [message, setMessage] = useState("");
  //   let navigate = useNavigate();

  //   useEffect(() => {
  //     const timer = setTimeout(() => setMessage(""), 3000);
  //     return () => clearTimeout(timer);
  //   }, [message]);

  //   const handleLogin = async (body) => {
  //     const axiosConfig = {
  //       headers: { "Content-Type": "application/json" },
  //       // withCredentials: true,
  //     };
  //     axios.defaults.withCredentials = true;
  //     try {
  //       const { data } = await axios.post(
  //         "http://localhost:3000/login" ,
  //         body,
  //         axiosConfig
  //       );
  //       setMessage(data.message);
  //       console.log(data);
  //       navigate("/dashboard");
  //     } catch (error) {
  //       if (error.response) {
  //         // The request was made and the server responded with a status code
  //         // that falls out of the range of 2xx
  //         setMessage(error.response.data.error);
  //         // console.log(error.response.data);
  //         // console.log(error.response.status);
  //         // console.log(error.response.headers);
  //       } else if (error.request) {
  //         // The request was made but no response was received
  //         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //         // http.ClientRequest in node.js
  //         setMessage("Bad things happened :(");
  //         console.log(error.request);
  //       } else {
  //         // Something happened in setting up the request that triggered an Error
  //         setMessage("Something happened :)");
  //         console.log("Error", error.message);
  //       }
  //     }
  //   };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();

  //     const formData = new FormData(e.target);
  //     const body = Object.fromEntries(formData.entries());

  //     handleLogin(body);
  //   };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
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
        // id="email"
        label="Email Address"
        name="email"
        type="email"
        autoFocus
        required
      />
      <TextField
        sx={inputStyle}
        margin="normal"
        required
        name="password"
        label="Password"
        type="password"
        // id="password"
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
        Sign In
      </Button>
    </FormControl>
  );
}
