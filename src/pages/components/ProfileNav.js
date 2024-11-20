import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BsMagic } from "react-icons/bs";


const ProfileNav = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  // Handle dropdown menu
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="default" sx={{ boxShadow: "none", borderBottom: "1px solid #ddd" }}>
      <Toolbar sx={{ justifyContent: "space-between", padding: "0 16px" }}>
        {/* Left Side */}
        <Box sx={{ display: "flex", gap: 2 }}>
        <Button sx={{ color: "blue", fontWeight: "bold" }}>PathlyHub</Button>
          
          {/* Dropdown Button */}
          <Button
            color="inherit"
            endIcon={<RiArrowDropDownLine/>            }
            onClick={handleMenuClick}
          >
            Paths
          </Button>
          
          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Path 1</MenuItem>
            <MenuItem onClick={handleMenuClose}>Path 2</MenuItem>
            <MenuItem onClick={handleMenuClose}>Path 3</MenuItem>
          </Menu>

          <Button color="inherit">Community</Button>
          <Button color="inherit">Mentorship</Button>
          <Button color="inherit">Pathly</Button>
        </Box>

        {/* Right Side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button sx={{color: "blue", fontWeight: "bold"}} size="small" >
          <BsMagic style={{ marginRight: 8}} />
          Talk to Pathly
          </Button>
          <Avatar alt="Profile Photo" src="/path-to-avatar.jpg" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ProfileNav;
