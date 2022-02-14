import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function PostForm({ handleClose, handleSubmit, open, formType, formData }) {
  const [state, setState] = useState(formData);
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setState({ [name]: value });
  };

  return (
    <FormControl component="form" onSubmit={handleSubmit}>
      <Dialog disablePortal open={open}>
        <DialogTitle>{formType}</DialogTitle>
        <DialogContent>
          {formType === "Movie" || formType === "movie" ? (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Title"
                type="text"
                name="title"
                fullWidth
                variant="standard"
                onChange={handleInputChange}
                value={formData && state.title}
              />
              <TextField
                margin="dense"
                label="Description"
                type="text"
                name="description"
                fullWidth
                variant="standard"
                onChange={handleInputChange}
                value={formData && state.description}
              />
              <TextField
                margin="dense"
                label="Image URL"
                type="text"
                name="image"
                fullWidth
                variant="standard"
                onChange={handleInputChange}
                value={formData && state.image}
              />
              <FormControlLabel
                sx={{ mt: 2 }}
                name="shareable"
                control={
                  <Switch
                    sx={{ mr: 1 }}
                    name="shareable"
                    onChange={handleInputChange}
                    checked={formData && state.shareable}
                    value={true}
                  />
                }
                label="Shareable"
              />
            </>
          ) : (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Full Name"
                type="text"
                name="fullname"
                fullWidth
                onChange={handleInputChange}
                value={formData && state.title}
                variant="standard"
              />
              <TextField
                margin="dense"
                label="Description"
                type="text"
                name="description"
                fullWidth
                onChange={handleInputChange}
                value={formData && state.description}
                variant="standard"
              />
              <TextField
                margin="dense"
                label="Image URL"
                type="text"
                name="image"
                fullWidth
                onChange={handleInputChange}
                value={formData && state.image}
                variant="standard"
              />
              <FormControlLabel
                sx={{ mt: 2 }}
                control={
                  <Switch
                    sx={{ mr: 1 }}
                    name="shareable"
                    onChange={handleInputChange}
                    checked={formData && state.shareable}
                    value={true}
                  />
                }
                label="Shareable"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Send</Button>
        </DialogActions>
      </Dialog>
    </FormControl>
  );
}
