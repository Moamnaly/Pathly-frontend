import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  TextField
} from "@mui/material";
import { LuHome, LuPlus, LuClock } from "react-icons/lu";
import { BiSolidUpArrowCircle } from "react-icons/bi";
import { PiGraduationCapBold } from "react-icons/pi";
import { IoBagOutline } from "react-icons/io5";

const PathlyBot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = (predefinedMessage = null) => {
    const textToSend = predefinedMessage || message.trim();
    if (textToSend) {
      setMessages([...messages, { text: textToSend, sentByUser: true }]);
      setMessage("");
    }
  };
  

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: "black",
        overflow: "hidden" // Prevent content overflow
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: { xs: "60px", sm: "80px" },
          backgroundColor: "black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 2
        }}
      >
        {/* Sidebar Icons */}
        {/* <IconButton color="inherit" sx={{ color: "white", mb: 2 }}>
          <LuHome size={24} />
        </IconButton> */}
        <IconButton color="inherit" sx={{ color: "white", mb: 2 }}>
          <LuPlus size={24} />
        </IconButton>
        <IconButton color="inherit" sx={{ color: "white" }}>
          <LuClock size={24} />
        </IconButton>
      </Box>

      {/* Main Layout */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <AppBar position="static" sx={{ backgroundColor: "black" }}>
          <Toolbar>
            <IconButton color="inherit" aria-label="home" sx={{ mr: 2 }}>
              <LuHome />
            </IconButton>
            <Button
              onClick={() => console.log("Pathly button clicked")} // Add desired onClick functionality
              sx={{
                textTransform: "none",
                justifyContent: "flex-start",
                flexGrow: 1,
                cursor: "pointer",
                color: "white",
                fontSize: "1rem"
              }}
            >
              Pathly
            </Button>

            {/* Right Section Buttons */}
            <Button sx={{ textTransform: "none", color: "white", mr: 2 }}>
              Become an Instructor
            </Button>
            <Button
              color="inherit"
              sx={{
                textTransform: "none",
                backgroundColor: "blue",
                color: "white"
              }}
            >
              Join as Student
            </Button>
          </Toolbar>
        </AppBar>

        {/* Chat Area */}
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: "black",
            padding: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            overflowY: "auto",
            paddingBottom: "150px"
          }}
        >
          {/* Conditionally Render Initial Section */}
          {messages.length === 0 ? (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Typography variant="h4" sx={{ mb: 2, color: "white" }}>
                Talk to&nbsp;
                <span style={{ color: "blue" }}>Pathly</span>
              </Typography>

              {/* Buttons */}
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => handleSendMessage("Talk to me as Instructor")}
                  sx={{
                    textTransform: "none",
                    border: "1px solid #677081",
                    backgroundColor: "#080808",
                    color: "white",
                    borderRadius: "20px",
                    fontSize: "15px",
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                  }}
                ><IoBagOutline /> 
                
                  Talk to me as Instructor
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => handleSendMessage("Talk to me as Student")}
                  sx={{
                    textTransform: "none",
                    border: "1px solid #677081",
                    backgroundColor: "#080808",
                    color: "white",
                    borderRadius: "20px",
                    fontSize: "15px",
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                  }}
                ><PiGraduationCapBold />
                  Talk to me as Student
                </Button>
              </Box>
            </Box>
          ) : (
            // Display Sent Messages
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 1
              }}
            >
              {messages.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: msg.sentByUser ? "flex-end" : "flex-start"
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "70%",
                      padding: 1.5,
                      backgroundColor: msg.sentByUser ? "blue" : "#2f2f2f",
                      color: "white",
                      borderRadius: "20px",
                      boxShadow: 2
                    }}
                  >
                    {msg.text}
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* Input Box */}
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: "80px",
            right: 0,
            display: "flex",
            alignItems: "center",
            padding: "10px 20px",
            boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
            zIndex: 1000,
            backgroundColor: "black",
            paddingBottom: "30px"
          }}
        >
          <TextField
            fullWidth
            placeholder="Send a message..."
            value={message}
            onChange={handleInputChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            sx={{
              marginRight: 2,
              borderRadius: "50px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "1px solid #344157",
                  borderRadius: "50px"
                },
                "&:hover fieldset": {
                  borderColor: "#344157"
                },
                "& input": {
                  color: "white"
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#344157"
                }
              }
            }}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleSendMessage} sx={{ color: "blue" }}>
                  <BiSolidUpArrowCircle size={40} />
                </IconButton>
              )
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PathlyBot;
