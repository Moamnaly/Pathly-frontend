import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Link,
  CircularProgress,
  Alert,
  Divider
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginApi } from "../../api/auth";
import "./Login.css"; // Import the CSS file
import { FcGoogle } from "react-icons/fc";
import FacebookIcon from "@mui/icons-material/Facebook"; // Importing Facebook Icon
import AppleIcon from "@mui/icons-material/Apple"; // Importing Apple Icon
import Header from "../Header/header";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginApi(username, password);
      localStorage.setItem("token", data.access);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <Container maxWidth="sm">
        <Header />
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Log in to your account
          </Typography>
          <Typography>Welcome Back! Please enter your details.</Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 2, width: "100%" }}
          >
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
              required
              placeholder="Enter your email"
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "40px", // Set a fixed height for the text field
                  "& input": {
                    padding: "8px" // Adjust padding for input text
                  }
                }
              }}
            />
            <TextField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
              required
              placeholder="Enter password"
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "40px", // Set a fixed height for the text field
                  "& input": {
                    padding: "8px" // Adjust padding for input text
                  }
                }
              }}
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3, mb: 2, backgroundColor: "blue" }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Continue with email"}
            </Button>
            <Divider sx={{ color: "grey", fontSize: "15px" }}>OR</Divider>
          </Box>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link href="/signup" underline="hover">
              Sign Up
            </Link>
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px",
                borderColor: "gray" // Neutral border color
              }}
            >
              <FcGoogle sx={{ marginRight: "10px" }} size={20} />
              Continue with Google
            </Button>

            <Button
              variant="outlined"
              fullWidth
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px",
                borderColor: "#4267B2" // Facebook button color
              }}
            >
              <FacebookIcon sx={{ marginRight: "8px", color: "#4267B2" }} />
              Continue with Facebook
            </Button>

            <Button
              variant="outlined"
              fullWidth
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px",
                borderColor: "#000000" // Apple button color
              }}
            >
              <AppleIcon sx={{ marginRight: "8px", color: "#000000" }} />
              Continue with Apple
            </Button>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default Login;
