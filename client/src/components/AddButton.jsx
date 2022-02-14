import * as React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";

const types = ["Movie", "Actor"];

function SimpleDialog(props) {
  const { onClose, selectedValue, open, handleClickOpenFormDialog } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
    handleClickOpenFormDialog(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add Movie or Actor</DialogTitle>
      <List sx={{ pt: 0 }}>
        {types.map((type) => (
          <ListItem button onClick={() => handleListItemClick(type)} key={type}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>{type[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={type} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default function AddButton({ handleClickOpenFormDialog }) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(types[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <AddIcon />
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        handleClickOpenFormDialog={handleClickOpenFormDialog}
      />
    </div>
  );
}
