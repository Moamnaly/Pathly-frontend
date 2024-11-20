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
  Divider,
  Stepper,
  Step,
  StepLabel
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signupApi } from "../../api/auth";
import "./Signup.css"; // Import the CSS file
import FacebookIcon from "@mui/icons-material/Facebook"; // Importing Facebook Icon
import AppleIcon from "@mui/icons-material/Apple"; // Importing Apple Icon
import { FcGoogle } from "react-icons/fc";
import Header from "../Header/header";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { MdOutlinePayment } from "react-icons/md";
import { LuRocket } from "react-icons/lu";
import { SlLayers } from "react-icons/sl";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const steps = [
    {
      label: "Your details",
      icon: <AiOutlineExclamationCircle />,
      description: "Provide an email and password"
    },
    {
      label: "Subscription plans",
      icon: <SlLayers />,
      description: "Select a plan that suits you"
    },
    {
      label: "Payment methods",
      icon: <MdOutlinePayment />,
      description: "Add your payment details"
    },
    {
      label: "Welcome to Pathly",
      icon: <LuRocket />,
      description: "Get up and running"
    }
  ];

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await signupApi(username, email, password);
      console.log("Signup successful:", data);
      toast.success("Signup successful! Redirecting to login...");

      navigate("/login"); // Redirect to login screen
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-wrapper" style={{ padding: "50px" }}>
      <div className="signup-container">
        <Container maxWidth="sm">
          <Header />

          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Your details
          </Typography>
          <Typography>Please provide your name and email</Typography>
          <Button>
            <FcGoogle sx={{ marginRight: "8px" }} size={20} />
          </Button>
          <Button>
            <FacebookIcon sx={{ marginRight: "8px", color: "#4267B2" }} />
          </Button>
          <Button>
            <AppleIcon sx={{ marginRight: "8px", color: "#000000" }} />
          </Button>

          <Divider sx={{ color: "grey", fontSize: "15px" }}>OR</Divider>

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
              placeholder="Enter your username"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
              required
              placeholder="Enter your email"
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                  "& input": {
                    padding: "8px"
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
              placeholder="Enter your password"
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                  "& input": {
                    padding: "8px"
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
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "blue"
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Get Started"}
            </Button>
          </Box>

          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link href="/login" underline="hover">
              Login
            </Link>
          </Typography>
        </Container>
      </div>
      <div className="footer" style={{ marginTop: "10%" }}>
        <Stepper alternativeLabel>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                icon={React.cloneElement(step.icon, {
                  size: 20,
                  color: "black"
                })}
              >
                <div style={{ textAlign: "center" }}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {step.label}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "gray" }}>
                    {step.description}
                  </Typography>
                </div>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    </div>
  );
};

export default Signup;
