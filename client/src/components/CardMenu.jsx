import { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSnackbar } from "notistack";
import PostForm from "./PostForm";
import { deletePost, updatePost } from "../api";
import Alert from "./Alert";
import { useLocation, useNavigate } from "react-router-dom";

export default function CardMenu({ formData, setFormData, deletePostFromState }) {
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState(null);
  const [formAnchorEl, setFormAnchorEl] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const open = Boolean(anchorEl);
  const formOpen = Boolean(formAnchorEl);
  const isMe = location.pathname.startsWith("/my");

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    if (event.target.id === "edit") {
      setFormAnchorEl(true);
    } else if (event.target.id === "delete") {
      setOpenAlert(true);
    }
  };

  const handleFormClose = () => {
    setFormAnchorEl(null);
  };

  const handleUpdatePost = async (body) => {
    try {
      const { data } = await updatePost(
        formData.postType.toLowerCase(),
        formData.postId,
        body
      );
      enqueueSnackbar(JSON.stringify(data.message), { variant: "success" });
      setFormData((prevState) => ({ ...prevState, ...body }));
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
  const handleDeletePost = async () => {
    try {
      const { data } = await deletePost(formData.postType.toLowerCase(), formData.postId);
      enqueueSnackbar(JSON.stringify(data.message), { variant: "success" });
      isMe ? navigate("/profile") : deletePostFromState(formData.postId);
      // navigate(-1) doesn't refresh page
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
    setFormAnchorEl(false);
    const formData = new FormData(event.currentTarget);
    const body = Object.fromEntries(formData.entries());
    handleUpdatePost(body);
  };

  return (
    <div>
      <IconButton
        aria-label="settings"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem id="edit" onClick={handleClose}>
          Edit
        </MenuItem>
        <MenuItem id="delete" onClick={handleClose}>
          Delete
        </MenuItem>
      </Menu>
      <Alert
        open={openAlert}
        handleClose={handleCloseAlert}
        handleDeletePost={handleDeletePost}
      />
      <PostForm
        handleClose={handleFormClose}
        handleSubmit={handleSubmit}
        open={formOpen}
        formData={formData}
        formType={formData.postType}
      />
    </div>
  );
}
