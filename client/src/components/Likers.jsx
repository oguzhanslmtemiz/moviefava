import { Box, Divider, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import Avatar from "./Avatar";

export default function Likers({ likers }) {
  return (
    <List
      sx={{ width: "100%", maxWidth: { xs: 360, sm: "unset" }, bgcolor: "background.paper" }}
    >
      <Divider variant="fullWidth" />
      {likers.map((liker, i) => (
        <Box key={liker.id}>
          <ListItem alignItems="center">
            <ListItemAvatar>
              <Avatar alt={liker.username} src={liker.avatar} />
            </ListItemAvatar>
            <ListItemText primary={liker.username} />
          </ListItem>
          <Divider variant="middle" component="li" />
        </Box>
      ))}
    </List>
  );
}
