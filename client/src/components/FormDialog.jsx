import { useSnackbar } from "notistack";
import AddButton from "./AddButton";
import { Box } from "@mui/system";
import { createPost } from "../api";
import PostForm from "./PostForm";
import { useState } from "react";

export default function FormDialog({ setPosts, setAllPosts }) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState();

  const handleClickOpenFormDialog = (type) => {
    setFormType(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePost = async (body) => {
    try {
      const { data } = await createPost(formType.toLowerCase(), body);
      enqueueSnackbar(JSON.stringify(data.message), { variant: "success" });
      setPosts((prevState) => [{ ...data.data, type: formType }, ...prevState]);
      setAllPosts((prevState) => [{ ...data.data, type: formType }, ...prevState]);
      handleClose();
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
    const formData = new FormData(event.currentTarget);
    const body = Object.fromEntries(formData.entries());
    handlePost(body);
  };

  return (
    <Box sx={{ textAlign: "center" }}>
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
