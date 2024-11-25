import React from "react";
import { Box, Avatar, Typography } from "@mui/material";

const ProfileHeader = ({ name, email, avatarSrc }) => {
  return (
    <>
      <Box
        sx={{
          padding: 4,
          backgroundColor: "blue",
          height: "150px",
          position: "relative",
        }}
      >
        <Avatar
          alt="Profile Photo"
          src={avatarSrc || "/default-avatar.jpg"}
          sx={{
            width: 120,
            height: 120,
            position: "absolute",
            bottom: "-100px",
            left: "8%",
            transform: "translateX(-50%)",
            border: "3px solid white",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          marginTop: "20px",
          marginLeft: "230px",
        }}
      >
        <Box>
          <Typography variant="h6" color="black">
            {name}
          </Typography>
          <Typography variant="body2" color="black">
            {email}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ProfileHeader;
