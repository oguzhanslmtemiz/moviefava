import { Button } from "@mui/material";
import styles from "./SignInUp.module.css";

export default function Panel({ setSignUpMode }) {
  const handleSignMode = (e) => {
    e.target.id === "sign-up-btn"
      ? setSignUpMode("sign-up-mode")
      : setSignUpMode("");
  };

  return (
    <div className={styles["panels-container"]}>
      <div className={[styles.panel, styles["left-panel"]].join(" ")}>
        <div className={styles["content"]}>
          <h3>New here ?</h3>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
            ex ratione. Aliquid!
          </p>
          <Button
            variant="outlined"
            id="sign-up-btn"
            onClick={handleSignMode}
            sx={{
              border: "2px solid #fff",
              width: 130,
              height: 41,
              color: "white",
              bgcolor: "#f45d48",
              ":hover": { bgcolor: "#ef523c", border: "2px solid #fff" },
            }}
          >
            Sign Up
          </Button>
        </div>
        <img src="img/login.svg" className={styles["image"]} alt="" />
      </div>
      <div className={[styles.panel, styles["right-panel"]].join(" ")}>
        <div className={styles["content"]}>
          <h3>One of us ?</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            laboriosam ad deleniti.
          </p>
          <Button
            variant="outlined"
            id="sign-in-btn"
            onClick={handleSignMode}
            sx={{
              border: "2px solid #fff",
              width: 130,
              height: 41,
              color: "white",
              bgcolor: "#f45d48",
              ":hover": { bgcolor: "#ef523c", border: "2px solid #fff" },
            }}
          >
            Sign In
          </Button>
        </div>
        <img src="img/register.svg" className={styles["image"]} alt="" />
      </div>
    </div>
  );
}
