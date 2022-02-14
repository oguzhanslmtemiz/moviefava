import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function CategoryButton() {
  const [alignment, setAlignment] = React.useState("All");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const btnStyle = { px: 3, py: 1 };

  return (
    <ToggleButtonGroup size="large" exclusive value={alignment} onChange={handleChange}>
      <ToggleButton sx={btnStyle} value="All">
        All
      </ToggleButton>
      <ToggleButton sx={btnStyle} value="Movies" disabled>
        Movies
      </ToggleButton>
      <ToggleButton sx={btnStyle} value="Actors" disabled>
        Actors
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
