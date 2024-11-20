import React from "react";
import { Typography, Box } from "@mui/material";

const Header = () => {
  return (
    <Box sx={{ textAlign: "center", mb: 4 }}>
      <Typography variant="h6" component="h1" sx={{ color: "blue", fontWeight: "bold" }}>
        PathlyHub
      </Typography>
    </Box>
  );
};

export default Header;