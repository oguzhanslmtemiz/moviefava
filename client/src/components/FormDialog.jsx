import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSnackbar } from "notistack";
import AddButton from "./AddButton";
import { FormControl, FormControlLabel, Switch } from "@mui/material";
import { Box } from "@mui/system";
import { createPost } from "../api";
import PostForm from "./PostForm";

export default function FormDialog({ setPosts }) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const [formType, setFormType] = React.useState();

  const handleClickOpenFormDialog = (type) => {
    setFormType(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePost = async (body) => {
    try {
      const { data } = await createPost(formType, body);
      console.log(data);
      enqueueSnackbar(JSON.stringify(data.message), { variant: "success" });
      setPosts((prevState) => [...prevState, { ...data.data, type: formType }]);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose();
    const formData = new FormData(event.currentTarget);
    const body = Object.fromEntries(formData.entries());
    console.log(body);
    handlePost(body);
  };

  return (
    <Box sx={{ textAlign: "center", mt: 2, mb: 0 }}>
      <AddButton handleClickOpenFormDialog={handleClickOpenFormDialog} />
      <PostForm
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        open={open}
        formType={formType}
      />
    </Box>
  );
}
