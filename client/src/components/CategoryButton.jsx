import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";

export default function CategoryButton({ setPosts, allPosts }) {
  const [alignment, setAlignment] = useState("All");

  const handleChange = (event, newAlignment) => {
    if (newAlignment) {
      setAlignment(newAlignment);
      newAlignment === "Movies"
        ? setPosts(allPosts.filter((post) => post.title))
        : newAlignment === "Actors"
        ? setPosts(allPosts.filter((post) => post.fullname))
        : setPosts(allPosts);
    }
  };

  const btnStyle = { px: 3, py: 1 };

  return (
    <ToggleButtonGroup
      sx={{ mb: 3 }}
      size="large"
      exclusive
      value={alignment}
      onChange={handleChange}
    >
      <ToggleButton sx={btnStyle} value="All">
        All
      </ToggleButton>
      <ToggleButton sx={btnStyle} value="Movies">
        Movies
      </ToggleButton>
      <ToggleButton sx={btnStyle} value="Actors">
        Actors
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
