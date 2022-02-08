import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import SignInUp from "../pages/SignInUp/SignInUp";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign-in-up" element={<SignInUp />} />
    </Routes>
  );
}
