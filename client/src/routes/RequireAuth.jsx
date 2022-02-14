import { Navigate } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import useAuth from "../contexts/AuthContext";
import { authControl } from "../api/index";
import { useEffect, useState } from "react";

export default function RequireAuth({ children }) {
  const { authed, login, logout } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        await authControl();
        await login();
        setLoading(false);
      } catch (error) {
        await logout();
        setLoading(false);
        console.error("Error:", error.response?.data?.payload);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : authed ? (
    children
  ) : (
    <Navigate to="/sign-in-up" replace />
  );
}
