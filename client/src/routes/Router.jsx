import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Profile from "../pages/Profile";
import SignInUp from "../pages/SignInUp/SignInUp";
import Timeline from "../pages/Timeline";
import RequireAuth from "./RequireAuth";
import SinglePost from "../pages/SinglePost";

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
        path="/my/movies/:movieId"
        element={
          <RequireAuth>
            <SinglePost />
          </RequireAuth>
        }
      />
      <Route
        path="/my/actors/:actorId"
        element={
          <RequireAuth>
            <SinglePost />
          </RequireAuth>
        }
      />
      <Route
        path="/movies/:movieId"
        element={
          <RequireAuth>
            <SinglePost />
          </RequireAuth>
        }
      />
      <Route
        path="/actors/:actorId"
        element={
          <RequireAuth>
            <SinglePost />
          </RequireAuth>
        }
      />
      <Route path="*" element={<h1>No routes matched this location</h1>} />
    </Routes>
  );
}
