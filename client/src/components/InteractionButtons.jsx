import React, { useState } from "react";
import { Box, ButtonGroup, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";

export default function InteractionButtons({ post }) {
  let [like, setLike] = useState(false);
  let [likeCount, setLikeCount] = useState(12);

  const handleLike = () => {
    if (like) {
      setLikeCount(--likeCount);
      setLike(false);
    } else {
      setLikeCount(++likeCount);
      setLike(true);
    }
  };

  return (
    <ButtonGroup variant="text">
      <Box sx={{ display: "flex", alignItems: "center", mr: 4 }}>
        <IconButton aria-label="add to favorites" onClick={handleLike}>
          <FavoriteIcon color="error" />
        </IconButton>
        <Typography>{likeCount}</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton aria-label="share" href={`/${post.type}/${post.id}/comments`}>
          <CommentIcon />
        </IconButton>
        <Typography>23</Typography>
      </Box>
    </ButtonGroup>
  );
}
