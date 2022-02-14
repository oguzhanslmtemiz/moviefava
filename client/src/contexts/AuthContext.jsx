import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function useAuth() {
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState({ id: "", email: "", username: "", avatar: "" });

  return {
    authed,
    user,
    setUser,
    login() {
      return new Promise((res) => {
        setAuthed(true);
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        setAuthed(false);
        res();
      });
    },
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export default function AuthConsumer() {
  return useContext(AuthContext);
}
