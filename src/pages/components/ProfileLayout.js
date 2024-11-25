import React from "react";
import ProfileNav from "../components/ProfileNav";
import ProfileHeader from "../components/ProfileHeader";
import { Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const ProfileLayout = ({ name, email, avatarSrc, children }) => {
  const menuLinks = [
    { label: "My details", path: "/profile" },
    { label: "Password", path: "/password" },
    { label: "Plan", path: "/plan" },
    { label: "Billing", path: "/billing" },
    { label: "Notifications", path: "/notifications" },
    { label: "Reading List", path: "/reading-list" },
    { label: "Books", path: "/books" },
  ];

  return (
    <Box
      sx={{
        maxHeight: "100vh",
        minHeight: "100vh",
        overflowY: "auto",
        paddingBottom: "100px",
      }}
    >
      <ProfileNav />
      <ProfileHeader name={name} email={email} avatarSrc={avatarSrc} />
      <Box
        sx={{
          padding: 4,
          backgroundColor: "white",
          marginTop: "60px",
        }}
      >
        <Box
          sx={{
            paddingLeft: 15,
            display: "flex",
            gap: 5,
          }}
        >
          {menuLinks.map((link) => (
            <Link
              key={link.path}
              component={RouterLink}
              to={link.path}
              sx={{
                textDecoration: "none",
                color: "grey",
                fontSize: "16px",
                "&:hover": {
                  color: "blue",
                },
              }}
            >
              {link.label}
            </Link>
          ))}
        </Box>
        <Box sx={{ marginTop: 4 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default ProfileLayout;
