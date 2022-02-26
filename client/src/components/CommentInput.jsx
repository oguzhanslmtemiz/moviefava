import { Divider, IconButton, InputBase, Paper, Typography } from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useSnackbar } from "notistack";
import { createComment } from "../api";

export default function CommentInput({
  postType,
  postId,
  setComments,
  loggedInUser,
  setCountOfComments,
}) {
  const [input, setInput] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const comment = formData.get("comment");
    handleComment({ comment });
  };

  const handleComment = async (body) => {
    try {
      const { data } = await createComment(postType.toLowerCase(), postId, body);
      setComments((prevState) => [
        { id: Date.now(), comment: input, commenter: loggedInUser },
        ...prevState,
      ]);
      setInput("");
      setCountOfComments((prevState) => ++prevState);
      enqueueSnackbar(JSON.stringify(data.message), { variant: "success" });
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

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: "2px 0px",
        bgcolor: "Background",
        color: "white",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, color: "inherit" }}
        placeholder="Add Comment"
        name="comment"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        inputProps={{ "aria-label": "add comment" }}
        autoFocus
      />
      <Divider sx={{ height: 28, m: 0.5, bgcolor: "white" }} orientation="vertical" />
      <IconButton
        type="submit"
        sx={{ p: "10px", flexDirection: "column", color: "inherit" }}
        aria-label="send"
      >
        <SendIcon />
        <Typography>Send</Typography>
      </IconButton>
    </Paper>
  );
}
