import { Divider, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import Avatar from "./Avatar";
import { getComments } from "../api";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useEffect } from "react";
import { Box } from "@mui/system";
import CommentInput from "./CommentInput";

export default function Commenters({ postType, postId, loggedInUser, setCountOfComments }) {
  const { enqueueSnackbar } = useSnackbar();
  const [comments, setComments] = useState([]);

  const handleGetCommentsFetch = async (postId) => {
    try {
      const { data } = await getComments(postType.toLowerCase(), postId);
      setComments(data.data);
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

  useEffect(() => {
    (async function () {
      try {
        handleGetCommentsFetch(postId);
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
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <List
      sx={{
        height: { xs: 300, sm: "unset" },
        width: "100%",
        bgcolor: "background.paper",
      }}
    >
      {/* COMMENT INPUT START*/}
      <CommentInput
        postType={postType}
        postId={postId}
        setComments={setComments}
        loggedInUser={loggedInUser}
        setCountOfComments={setCountOfComments}
      />
      {/* COMMENT INPUT END */}

      <Divider variant="fullWidth" />

      {comments?.map((comment) => (
        <Box key={comment.id}>
          <ListItem alignItems="center">
            <ListItemAvatar>
              <Avatar alt={comment.commenter.username} src={comment.commenter.avatar} />
            </ListItemAvatar>
            <ListItemText primary={comment.comment} />
          </ListItem>
          <Divider variant="middle" component="li" />
        </Box>
      ))}
    </List>
  );
}
