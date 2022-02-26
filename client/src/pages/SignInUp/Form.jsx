import Login from "./Login";
import Register from "./Register";
import styles from "./SignInUp.module.css";

export default function Form({setSignUpMode}) {
  return (
    <div className={styles["forms-container"]}>
      <div className={styles["signin-signup"]}>
        <Login />
        <Register setSignUpMode={setSignUpMode}/>
      </div>
    </div>
  );
}
