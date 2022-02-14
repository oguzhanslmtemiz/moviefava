import { Box, Container, Fab, Grid } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Header from "../components/Header";
import CategoryButton from "../components/CategoryButton";
import ScrollTop from "../components/ScrollTop";
import Post from "../components/Post";
import { useParams } from "react-router-dom";
import AddButton from "../components/AddButton";
import FormDialog from "../components/FormDialog";
import { useEffect, useState } from "react";
import { getMyProfile, getProfile, getUserProfile } from "../api";

export default function Movie() {
  const initial = {
    id: 167,
    type: "movie",
    title: "Lord of The Rings",
    user: "oguzhanslmtemiz",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic nemo atque libero dolores cum rem ex unde dicta deserunt eos!",
    image: "https://source.unsplash.com/random",
  };

  const [post, setPost] = useState([initial]);

  const { movieId } = useParams();
  console.log(movieId);

  // useEffect(() => {
  //   async function fetchData() {
  //     const { data } = await getProfile(userId);
  //     console.log(data);
  //     const posts = data.data;
  //     setPosts(posts);

  //   }
  //   fetchData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      <Header />
      <Box sx={{ bgcolor: "background.default" }}>
        <Container>
          <Box sx={{ display: "flex", justifyContent: "center", pt: 5 }}></Box>
          {/* <AddButton /> */}
          {/* <FormDialog setPosts={setPosts} /> */}
          <Grid container spacing={4} sx={{ pb: 5 }}>
            <Post key={post.id} post={post} />
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
