import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import PostForm from "./PostForm";

export default function CardMenu({ formData }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [formAnchorEl, setFormAnchorEl] = React.useState(null);
  const [formType, setFormType] = React.useState();

  const open = Boolean(anchorEl);
  const formOpen = Boolean(formAnchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    if (event.target.id === "edit") {
      setFormType(formData.type);
      setFormAnchorEl(true);
    } else if (event.target.id === "delete") {
      // delete req
    }
  };

  const handleFormClose = () => {
    setFormAnchorEl(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormAnchorEl(false);
    const formData = new FormData(event.currentTarget);
    const body = Object.fromEntries(formData.entries());
    // handlePut(body);
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
      <PostForm
        handleClose={handleFormClose}
        handleSubmit={handleSubmit}
        open={formOpen}
        formType={formType}
        formData={formData}
      />
    </div>
  );
}
