import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Profile from "../pages/Profile";
import Movie from "../pages/Movie";
import SignInUp from "../pages/SignInUp/SignInUp";
import Timeline from "../pages/Timeline";
import RequireAuth from "./RequireAuth";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign-in-up" element={<SignInUp />} />
      <Route
        path="/profile"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
      <Route
        path="/profile/:userId"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
      <Route
        path="/timeline"
        element={
          <RequireAuth>
            <Timeline />
          </RequireAuth>
        }
      />
      <Route
        path="/movies/:movieId"
        element={
          <RequireAuth>
            <Movie />
          </RequireAuth>
        }
      />
      <Route path="*" element={<h1>No routes matched this location</h1>} />
    </Routes>
  );
}
