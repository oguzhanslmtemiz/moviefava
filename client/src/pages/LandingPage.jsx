import React from "react";
import {
  Box,
  Button,
  Container,
  styled,
  Typography,
  AppBar,
  Link,
} from "@mui/material";
import MuiToolbar from "@mui/material/Toolbar";

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  height: 64,
  [theme.breakpoints.up("sm")]: {
    height: "10vh",
  },
}));

function LandingHeader() {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            href="/"
            sx={{ fontSize: 24, color: "secondary.dark" }}
          >
            {"Moviefava"}
          </Link>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Link
              variant="h6"
              underline="none"
              href="/sign-in-up"
              sx={{ fontSize: 16, color: "text.primary", ml: 3 }}
            >
              {"Sign In/Up"}
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}

function Copyright() {
  return (
    <Typography variant="body2">
      {"Copyright © "}
      <Link
        sx={{ color: "primary.dark" }}
        href="https://moviefava.herokuapp.com/"
      >
        Moviefava
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function LandingFooter() {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        bgcolor: "secondary.main",
        py: 3,
        px: 2,
        height: "10vh",
      }}
    >
      <Container sx={{ display: "flex" }}>
        <Copyright />
      </Container>
    </Box>
  );
}

const backgroundImage =
  "https://images.unsplash.com/photo-1585951237318-9ea5e175b891?auto=format&fit=crop&w=1400&q=80";

const LandingPageLayout = styled("section")(({ theme }) => ({
  color: theme.palette.common.white,
  position: "relative",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    height: "80vh",
    minHeight: 500,
    maxHeight: 1300,
  },
}));

const Background = styled(Box)({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  zIndex: -2,
});

export default function LandingPage() {
  return (
    <>
      <LandingHeader />
      <LandingPageLayout>
        <Container
          sx={{
            mt: 3,
            mb: 14,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Increase the network loading priority of the background image. */}
          <img
            style={{ display: "none" }}
            src={backgroundImage}
            alt="increase priority"
          />
          <Typography
            color="inherit"
            align="center"
            variant="h2"
            marked="center"
          >
            Keep track of the movies you have seen
          </Typography>
          <Typography
            color="inherit"
            align="center"
            variant="h5"
            sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
          >
            Moviefava helps you keep a personal list of movies you have seen and
            liked. It's fun and easy to use, whether you're a movie geek or just
            a casual watcher.
          </Typography>
          <Button
            color="secondary"
            variant="contained"
            size="large"
            component="a"
            href="/sign-in-up"
            sx={{ minWidth: 200 }}
          >
            Register
          </Button>
          <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
            Discover the experience
          </Typography>

          <Box
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              backgroundColor: "common.black",
              opacity: 0.5,
              zIndex: -1,
            }}
          />

          <Background
            sx={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundColor: "#7fc7d9", // Average color of the background image.
              backgroundPosition: "center",
            }}
          />
        </Container>
      </LandingPageLayout>
      <LandingFooter />
    </>
  );
}
