import { useEffect, useState } from "react";
import {
  CardActions,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Link,
  Typography,
  Collapse,
} from "@mui/material";
import moment from "moment";
import InteractionButtons from "./InteractionButtons";
import Avatar from "./Avatar";
import CardMenu from "./CardMenu";
import Commenters from "./Commenters";
import Likers from "./Likers";

export default function Post({
  post,
  postOwner,
  loggedInUser,
  deletePostFromState,
  page,
  isMe,
  location,
}) {
  const title = post.title ? post.title : post.fullname;
  const postType = post.title ? "Movie" : "Actor";
  const [expanded, setExpanded] = useState(true);
  const [expandType, setExpandType] = useState("likers");
  const [like, setLike] = useState(false);
  const [likers, setLikers] = useState([]);
  const [countOfComments, setCountOfComments] = useState(0);
  const [formData, setFormData] = useState({
    title,
    postType,
    fullname: title,
    image: post.image,
    description: post.description,
    shareable: post.shareable,
    postId: post.id,
  });

  useEffect(() => {
    const likes = post?.likes?.map((like) => like.liker);
    setLikers(likes);
    setCountOfComments(post?.countOfComments);
    location?.state === "commenters" && setExpandType(location.state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post, setLikers]);

  return (
    <Grid
      item
      xs={12}
      sm={6}
      lg={4}
      sx={
        page.singlePost
          ? {
              maxWidth: { sm: "500px" },
              margin: { xs: "auto" },
              right: { smmd: "calc(350/2 * 1px)", md: "calc(500/2 * 1px)" },
              position: { smmd: "relative" },
            }
          : { display: "flex", justifyContent: "center" }
      }
    >
      <Card
        sx={
          page.singlePost
            ? {
                display: "flex",
                flexDirection: "column",
                position: { smmd: "relative" },
                left: { smmd: "350px", md: "500px" },
                width: { smmd: "350px" },
                height: { smmd: "600px", md: "900px" },
                overflow: { smmd: "visible" },
              }
            : {
                display: "flex",
                flexDirection: "column",
                maxWidth: { xs: 350 },
                maxHeight: { xs: 700 },
              }
        }
      >
        <CardHeader
          avatar={
            <Link href={`/profile/${postOwner.id}`}>
              <Avatar src={postOwner.avatar} alt={postOwner.username} />
            </Link>
          }
          action={
            page &&
            isMe && (
              <CardMenu
                formData={formData}
                postType={postType}
                setFormData={setFormData}
                deletePostFromState={deletePostFromState}
              />
            )
          }
          title={postType === "Movie" ? formData.title : formData.fullname}
          subheader={moment(post.createdAt).fromNow() + " 🔘 " + postType}
        />
        <CardActionArea
          component="a"
          href={
            isMe
              ? `/my/${postType.toLowerCase()}s/${post.id}`
              : `/${postType.toLowerCase()}s/${post.id}`
          }
          sx={
            page.singlePost
              ? {
                  width: { smmd: "350px", md: "500px" },
                  right: { smmd: "350px" },
                  position: { smmd: "absolute" },
                  height: { smmd: "100%" },
                  top: { smmd: "0px" },
                }
              : { overflow: "hidden", maxHeight: "100%", maxWidth: "100%", flexGrow: 1 }
          }
        >
          <CardMedia
            component="img"
            image={
              formData.image?.startsWith("http")
                ? formData.image
                : `https://picsum.photos/id/${post.id}/400/800`
            }
            sx={
              page.singlePost
                ? { borderRadius: { smmd: 1 }, height: { smmd: "100%" } }
                : { maxHeight: "100%", maxWidth: "100%" }
            }
          />
        </CardActionArea>
        <CardContent sx={{ p: 1 }}>
          <Typography variant="caption" color="text.secondary">
            {formData.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <InteractionButtons
            post={post}
            postType={postType}
            loggedInUser={loggedInUser}
            expanded={expanded}
            setExpanded={setExpanded}
            setExpandType={setExpandType}
            likers={likers}
            setLikers={setLikers}
            like={like}
            setLike={setLike}
            page={page}
            isMe={isMe}
            countOfComments={countOfComments}
          />
        </CardActions>
        {page.singlePost && (
          <Collapse in={expanded} sx={{ overflowY: "auto" }}>
            {expandType === "likers" ? (
              <Likers likers={likers} />
            ) : (
              <Commenters
                setCountOfComments={setCountOfComments}
                postType={postType}
                postId={post.id}
                loggedInUser={loggedInUser}
              />
            )}
          </Collapse>
        )}
      </Card>
    </Grid>
  );
}
