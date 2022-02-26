import { Box, Container, Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Header from "../components/Header";
import ScrollTop from "../components/ScrollTop";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyPost, getPost } from "../api";
import Post from "../components/Post";
import { useSnackbar } from "notistack";

export default function SinglePost() {
  const { enqueueSnackbar } = useSnackbar();
  const [post, setPost] = useState();
  const [postOwner, setPostOwner] = useState();
  const { movieId, actorId } = useParams();
  const postType = movieId ? "movie" : "actor";
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const navigate = useNavigate();
  const isMe = postOwner?.id === loggedInUser?.id;
  const isMyPost = location.pathname.startsWith("/my");

  useEffect(() => {
    async function fetchData() {
      try {
        if (isMyPost) {
          const { data } = await getMyPost(postType, movieId || actorId);
          const { user, ...post } = data.data;
          setPostOwner(user);
          setPost(post);
        } else {
          const { data } = await getPost(postType, movieId || actorId);
          setPost(data.data);
        }
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
        navigate(-1);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <Box
        sx={{
          bgcolor: "background.default",
        }}
      >
        <Container
          sx={{
            pb: 5,
            display: { smmd: "flex" },
            justifyContent: { smmd: "center" },
            alignItems: { smmd: "center" },
            flexDirection: { smmd: "column" },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", pt: 5 }}></Box>
          {post && isMyPost ? (
            <>
              <Post
                post={post}
                postOwner={postOwner}
                loggedInUser={loggedInUser}
                page={{ singlePost: "my" }}
                isMe={isMe}
                location={location}
              />
            </>
          ) : (
            post && (
              <Post
                post={post}
                postOwner={post.user}
                loggedInUser={loggedInUser}
                page={{ singlePost: "public" }}
                isMe={isMe}
                location={location}
              />
            )
          )}
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
