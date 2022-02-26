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
    setState((prevState) => ({ ...prevState, ...{ [name]: value } }));
  };

  return (
    <FormControl component="form" onSubmit={handleSubmit}>
      <Dialog disablePortal open={open} sx={{ textAlign: "center" }}>
        <DialogTitle>{formType}</DialogTitle>
        <DialogContent>
          <>
            {formType === "Movie" ? (
              <TextField
                margin="dense"
                required
                label="Title"
                type="text"
                name="title"
                fullWidth
                variant="standard"
                onChange={handleInputChange}
                value={formData && state.title}
              />
            ) : (
              <TextField
                margin="dense"
                required
                label="Full Name"
                type="text"
                name="fullname"
                fullWidth
                variant="standard"
                onChange={handleInputChange}
                value={formData && state.fullname}
              />
            )}
            <TextField
              margin="dense"
              required
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
              required
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Send</Button>
        </DialogActions>
      </Dialog>
    </FormControl>
  );
}
