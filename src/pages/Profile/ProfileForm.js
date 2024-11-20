import React from "react";
import ProfileNav from "../components/ProfileNav";
import { useFormik } from "formik";
import * as Yup from "yup";
import { saveProfileData } from "../../api/auth";
import countryList from "react-select-country-list";
// import moment from 'moment-timezone';
import "react-toastify/dist/ReactToastify.css"; 

import {
  Box,
  Avatar,
  Typography,
  Link,
  TextField,
  Divider,
  MenuItem,
  Button,
  IconButton
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom"; 
const ProfileForm = () => {
  const countryOptions = countryList().getData(); 

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      degree: "",
      country: "",
      timezone: "",
      bio: "",
      photo: null
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      degree: Yup.string().required("Degree is required"),
      country: Yup.string().required("Country is required"),
      timezone: Yup.string().required("Timezone is required"),
      bio: Yup.string().required("Bio is required"),
      photo: Yup.mixed().required("Photo is required")
    }),
    onSubmit: async (values) => {
      console.log("Form submitted:", values);
      await saveProfileData(values); 
      formik.resetForm(); 
    }
  });

  return (
    <Box
      sx={{
        maxHeight: "100vh",
        minHeight: "100vh",
        overflowY: "auto", 
        paddingBottom: "100px"
      }}
    >
      <ProfileNav />
      <Box
        sx={{
          padding: 4,
          backgroundColor: "blue",
          height: "150px", 
          position: "relative" 
        }}
      >
        <Avatar
          alt="Profile Photo"
          src="/path-to-avatar.jpg" 
          sx={{
            width: 120,
            height: 120,
            position: "absolute", 
            bottom: "-100px", 
            left: "8%",
            transform: "translateX(-50%)", 
            border: "3px solid white" 
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          marginTop: "20px", 
          marginLeft: "230px" 
        }}
      >
        <Box>
          <Typography variant="h6" color="black">
            Marco Kelly
          </Typography>
          <Typography variant="body2" color="black">
            marcokelly@pathlyhub.com 
          </Typography>
        </Box>
      </Box>

      {/* Content Below the Profile Photo */}
      <Box
        sx={{
          padding: 4,
          backgroundColor: "white",
          marginTop: "60px" 
        }}
      >
        <Box
          sx={{
            paddingLeft: 15,
            display: "flex",
            gap: 5 
          }}
        >
          <Link
            component={RouterLink} 
            to="/details"
            sx={{
              textDecoration: "none",
              color: "grey",
              fontSize: "16px",
              "&:hover": {
                color: "blue" 
              }
            }}
          >
            My details
          </Link>
          <Link
            component={RouterLink}
            to="/password"
            sx={{
              textDecoration: "none",
              color: "grey",
              fontSize: "16px",
              "&:hover": {
                color: "blue"
              }
            }}
          >
            Password
          </Link>
          <Link
            component={RouterLink}
            to="/plan"
            sx={{
              textDecoration: "none",
              color: "grey",
              fontSize: "16px",
              "&:hover": {
                color: "blue" 
              }
            }}
          >
            Plan
          </Link>
          <Link
            component={RouterLink}
            to="/billing"
            sx={{
              textDecoration: "none",
              color: "grey",
              fontSize: "16px",
              "&:hover": {
                color: "blue" 
              }
            }}
          >
            Billing
          </Link>
          <Link
            component={RouterLink}
            to="/notifications"
            sx={{
              textDecoration: "none",
              color: "grey",
              fontSize: "16px",
              "&:hover": {
                color: "blue" 
              }
            }}
          >
            Notifications
          </Link>
          <Link
            component={RouterLink}
            to="/reading-list"
            sx={{
              textDecoration: "none",
              color: "grey",
              fontSize: "16px",
              "&:hover": {
                color: "blue" 
              }
            }}
          >
            Reading List
          </Link>
          <Link
            component={RouterLink}
            to="/books"
            sx={{
              textDecoration: "none",
              color: "grey",
              fontSize: "16px",
              "&:hover": {
                color: "blue" 
              }
            }}
          >
            Books
          </Link>
        </Box>
        {/* Form Below the Links */}
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ padding: 6, marginLeft: "80px" }}>
            <Box sx={{ marginBottom: "20px" }}>
              <Typography sx={{ fontWeight: "bold" }}>Personal info</Typography>
              <Typography>
                Update your photo and personal details here.
              </Typography>
            </Box>
            <Divider sx={{ marginBottom: "20px" }} />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px"
                // Ensures label and text fields start at the same point
              }}
            >
              <Typography
                color="black"
                sx={{ marginRight: "20px", width: "150px" }}
              >
                Name <span>*</span>
              </Typography>
              <TextField
                name="firstName"
                // variant="outlined"
                placeholder="first name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                sx={{
                  marginRight: "20px",
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    "& input": {
                      padding: "8px"
                    }
                  }
                }}
              />
              <TextField
                name="lastName"
                // variant="outlined"
                placeholder="last name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    "& input": {
                      padding: "8px",
                      marginRight: "20px"
                    }
                  }
                }}
              />
            </Box>
            <Divider sx={{ marginBottom: "20px" }} />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px"
              }}
            >
              <Typography
                color="black"
                sx={{ marginRight: "20px", width: "150px" }}
              >
                Email Address <span>*</span>
              </Typography>
              <TextField
                name="email"
                placeholder="Enter email address"
                value={formik.values.email}
                onChange={formik.handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    "& input": {
                      padding: "8px",
                      marginRight: "20px",
                      WebkitTextFillColor: "inherit",
                      backgroundColor: "transparent"
                    },
                    "& input:focus": {
                      color: "inherit"
                    },
                    "& input:-webkit-autofill": {
                      WebkitBoxShadow: "0 0 0 30px white inset",
                      color: "inherit"
                    }
                  }
                }}
              />
            </Box>
            <Divider sx={{ marginBottom: "20px" }} />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px"
              }}
            >
              <Typography color="black" sx={{ marginRight: "20px" }}>
                Your Photo <span>*</span>
              </Typography>
              <IconButton
                color="primary"
                component="label"
                sx={{ width: 50, height: 50, marginLeft: "50px" }}
              >
                <Avatar
                  alt="Profile Photo"
                  src={formik.values.photo || "/path-to-avatar.jpg"} // Default photo or uploaded one
                  sx={{ width: 50, height: 50 }}
                />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(event) => {
                    const file = event.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        formik.setFieldValue("photo", reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </IconButton>
            </Box>
            <Divider sx={{ marginBottom: "20px" }} />

            <Box
              sx={{
                display: "flex",
                marginBottom: "20px"
              }}
            >
              <Typography
                color="black"
                sx={{ marginRight: "20px", width: "150px" }}
              >
                Degree <span>*</span>
              </Typography>
              <TextField
                name="degree"
                select
                value={formik.values.degree}
                onChange={formik.handleChange}
                variant="outlined"
                sx={{ width: "250px" }}
                size="small"
              >
                <MenuItem value="Bachelor">Bachelor</MenuItem>
                <MenuItem value="Master">Master</MenuItem>
                <MenuItem value="PhD">PhD</MenuItem>
              </TextField>
            </Box>
            <Divider sx={{ marginBottom: "20px" }} />

            <Box
              sx={{
                display: "flex",
                marginBottom: "20px"
              }}
            >
              <Typography
                color="black"
                sx={{ marginRight: "20px", width: "150px" }}
              >
                Country <span>*</span>
              </Typography>

              <TextField
                name="country"
                select
                value={formik.values.country}
                onChange={formik.handleChange}
                variant="outlined"
                size="small"
                sx={{ width: "250px" }}
              >
                {countryOptions.map((country) => (
                  <MenuItem key={country.value} value={country.value}>
                    {country.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Divider sx={{ marginBottom: "20px" }} />

            <Box
              sx={{
                display: "flex",
                //   alignItems: "center",
                //   gap: 2,
                //   width: "100%",
                marginBottom: "20px"
              }}
            >
              <Typography
                color="black"
                sx={{ marginRight: "20px", width: "150px" }}
              >
                Timezone <span>*</span>
              </Typography>
              <TextField
                name="timezone"
                select
                value={formik.values.timezone}
                onChange={formik.handleChange}
                variant="outlined"
                //   fullWidth
                size="small"
                sx={{ width: "250px" }}
              >
                <MenuItem value="UTC-5">UTC-5</MenuItem>
                <MenuItem value="UTC+1">UTC+1</MenuItem>
                <MenuItem value="UTC+5.5">UTC+5.5</MenuItem>
              </TextField>
            </Box>
            <Divider sx={{ marginBottom: "20px" }} />

            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start", // Align items to the top
                gap: 2, // Add space between the label and inputs
                width: "100%",
                marginBottom: "20px"
              }}
            >
              {/* Label */}
              <Typography color="black" sx={{ width: "150px" }}>
                Bio <span>*</span>
              </Typography>

              {/* Input Fields */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column", // Stack inputs vertically
                  gap: 1 // Add space between the text field and textarea
                }}
              >
                {/* Single-line Text Field */}
                <TextField
                  variant="outlined"
                  placeholder="Brief introduction"
                  sx={{
                    width: "200px",
                    "& .MuiOutlinedInput-root": {
                      height: "40px", // Single-line height
                      "& input": {
                        padding: "8px"
                      }
                    }
                  }}
                />

                {/* Multi-line Text Area */}
                <TextField
                  name="bio"
                  variant="outlined"
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  multiline
                  rows={4} // Number of visible lines
                  placeholder="Write more about yourself"
                  sx={{
                    width: "400px",
                    "& .MuiOutlinedInput-root": {
                      "& textarea": {
                        padding: "8px" // Adjust padding for textarea
                      }
                    }
                  }}
                />
              </Box>
            </Box>
            <Divider sx={{ marginBottom: "20px" }} />

            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  marginRight: "10px",
                  color: "black"
                }}
              >
                cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "blue"
                }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default ProfileForm;
