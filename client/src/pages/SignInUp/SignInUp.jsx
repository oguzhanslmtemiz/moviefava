import { useState } from "react";
import { Box } from "@mui/material";
import Form from "./Form";
import Panel from "./Panel";
import styles from "./SignInUp.module.css";

export default function SignInUp() {
  const [signUpMode, setSignUpMode] = useState("");

  return (
    <Box
      sx={{ bgcolor: "background.default" }}
      className={[styles.container, styles[signUpMode]].join(" ")}
    >
      <Form />
      <Panel setSignUpMode={setSignUpMode} />
    </Box>
  );
}
