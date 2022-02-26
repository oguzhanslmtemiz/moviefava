import { Box, ButtonGroup, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { useSnackbar } from "notistack";
import { likeAndUnlikePost } from "../api";
import TotalAvatars from "./TotalAvatars";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function InteractionButtons({
  post,
  postType,
  loggedInUser,
  expanded,
  setExpanded,
  setExpandType,
  likers,
  setLikers,
  like,
  setLike,
  page,
  isMe,
  countOfComments,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    likers?.map((liker) => liker.id === loggedInUser.id && setLike(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likers]);

  const handleLikeFetch = async (postId) => {
    try {
      await likeAndUnlikePost(postType.toLowerCase(), postId, loggedInUser.id);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
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
  };

  const handleExpandClick = (expandType) => {
    setExpandType((prevState) => {
      if (prevState === expandType || prevState === undefined) {
        setExpanded(!expanded);
        return expandType;
      } else if (prevState !== expandType && expanded) {
        setExpanded(expanded);
        return expandType;
      } else {
        setExpanded(!expanded);
        return expandType;
      }
    });
  };

  const handleLike = () => {
    handleLikeFetch(post.id);
    if (like) {
      setLike(false);
      setLikers(
        (prevState) => prevState && prevState.filter((liker) => liker.id !== loggedInUser.id)
      );
    } else {
      setLike(true);
      setLikers((prevState) => {
        return prevState ? [loggedInUser, ...prevState] : [loggedInUser];
      });
    }
  };

  const handleNavigate = (type) => {
    !page.singlePost &&
      (isMe
        ? navigate(`/my/${postType.toLowerCase()}s/${post.id}`, { state: type })
        : navigate(`/${postType.toLowerCase()}s/${post.id}`, { state: type }));
  };

  return (
    <ButtonGroup
      variant="text"
      sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton aria-label="add to favorites" onClick={handleLike}>
          {like ? <FavoriteIcon color="error" /> : <FavoriteIcon />}
        </IconButton>
        {likers && (
          <TotalAvatars
            handleExpandClick={handleExpandClick}
            likers={likers}
            loggedInUser={loggedInUser}
            setLike={setLike}
            like={like}
            handleNavigate={handleNavigate}
          />
        )}
      </Box>
      <Box
        sx={{ display: "flex", alignItems: "center", cursor: "pointer", mr: 1 }}
        onClick={() => {
          handleNavigate("commenters");
          handleExpandClick("commenters");
        }}
      >
        <IconButton>
          <CommentIcon />
        </IconButton>
        <Typography>{countOfComments}</Typography>
      </Box>
    </ButtonGroup>
  );
}
