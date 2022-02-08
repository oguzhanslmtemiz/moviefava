import { Button, FormControl, TextField } from "@mui/material";
import styles from "./SignInUp.module.css";

const inputStyle = { maxWidth: 380, width: "100%" };

export default function Register() {
  return (
    <FormControl className={styles["sign-up-form"]} component="form" noValidate>
      <TextField
        sx={inputStyle}
        margin="normal"
        // id="username"
        label="Username"
        name="username"
        required
      />
      <TextField
        sx={inputStyle}
        margin="normal"
        // id="email"
        label="Email Address"
        type="email"
        name="email"
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
        Sign Up
      </Button>
    </FormControl>
  );
}
