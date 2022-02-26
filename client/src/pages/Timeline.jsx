import { useEffect, useState } from "react";
import { Box, Container, Fab, Grid } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Header from "../components/Header";
import CategoryButton from "../components/CategoryButton";
import ScrollTop from "../components/ScrollTop";
import { useSnackbar } from "notistack";
import { getSharedPosts } from "../api";
import Post from "../components/Post";

export default function Timeline() {
  const { enqueueSnackbar } = useSnackbar();
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await getSharedPosts();
        const sharedPosts = data.data;
        setPosts(sharedPosts);
        setAllPosts(sharedPosts);
      } catch (error) {
        if (error.response) {
          console.log(error.response);
          const { payload } = error.response.data;
          enqueueSnackbar(JSON.stringify(payload?.message), {
            variant: "error",
          });
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          enqueueSnackbar("Bad things happened :(", {
            variant: "error",
          });
          console.log("error.request", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          enqueueSnackbar("Something happened :)", { variant: "error" });
          console.log("Error", error.message);
        }
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <Box sx={{ bgcolor: "background.default" }}>
        <Container>
          <Box sx={{ display: "flex", justifyContent: "center", pt: 5 }}>
            <CategoryButton setPosts={setPosts} allPosts={allPosts} />
          </Box>
          <Grid container spacing={4} sx={{ pb: 5 }}>
            {posts.map((post) => (
              <Post
                key={post.id + "-" + post.createdAt}
                post={post}
                postOwner={post.user}
                loggedInUser={loggedInUser}
                page={"timeline"}
                isMe={post.user.id === loggedInUser.id}
              />
            ))}
          </Grid>
        </Container>
      </Box>
      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}
