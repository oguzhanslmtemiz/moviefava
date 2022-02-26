import { useEffect, useState } from "react";
import { Box, Container, Fab, Grid, styled, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Header from "../components/Header";
import CategoryButton from "../components/CategoryButton";
import ScrollTop from "../components/ScrollTop";
import { useNavigate, useParams } from "react-router-dom";
import FormDialog from "../components/FormDialog";
import { getProfilePosts } from "../api";
import Avatar from "../components/Avatar";
import Post from "../components/Post";

export default function Profile() {
  const { enqueueSnackbar } = useSnackbar();
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [postOwner, setPostOwner] = useState({});
  const { userId } = useParams();
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const isMe = postOwner?.id === loggedInUser?.id;

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await getProfilePosts(userId);
        const userObjectWithAllPosts = data.data;
        if (!userObjectWithAllPosts) {
          enqueueSnackbar("This account doesn’t exist", {
            variant: "info",
          });
          return navigate("/timeline");
        }
        const { id, username, email, avatar, movies, actors } = userObjectWithAllPosts;
        const postOwner = { id, username, email, avatar };
        const userPosts = [...movies, ...actors].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setPostOwner(postOwner);
        setPosts(userPosts);
        setAllPosts(userPosts);
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

  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
    display: "flex",
    alignItems: "center",
  }));

  const deletePostFromState = (postId) => {
    setPosts((prevState) => prevState.filter((post) => post.id !== postId));
    setAllPosts((prevState) => prevState.filter((post) => post.id !== postId));
  };

  return (
    <>
      <Header />
      <Box sx={{ bgcolor: "background.default" }}>
        <Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              pt: 2,
            }}
          >
            <Div>
              {userId && (
                <Typography sx={{ mr: 2 }}>
                  {isMe ? "Your Public Page" : "Public Page of"}
                </Typography>
              )}
              <Avatar
                alt={postOwner.username}
                src={postOwner.avatar}
                sx={{ width: 56, height: 56, mr: 2 }}
              />
              <Typography>{postOwner.username}</Typography>
            </Div>
            <CategoryButton setPosts={setPosts} allPosts={allPosts} />
          </Box>
          {isMe && !userId && <FormDialog setPosts={setPosts} setAllPosts={setAllPosts} />}
          <Grid container spacing={4} sx={{ pb: 5 }}>
            {posts.map((post) => (
              <Post
                key={post.id + "-" + post.createdAt}
                post={post}
                postOwner={postOwner}
                loggedInUser={loggedInUser}
                setPosts={setPosts}
                setAllPosts={setAllPosts}
                deletePostFromState={deletePostFromState}
                page={"profile"}
                isMe={isMe}
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
