import React from "react";
import ProfileLayout from "../components/ProfileLayout";
import { Box, Typography, Divider, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup"; // For validation
import { changePassword } from "../../api/auth";

const ConfirmPassword = () => {
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Current password is required"),
      newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Please confirm your new password"),
    }),
    onSubmit: async (values, { resetForm }) => {
        try {
          const data = await changePassword(values.currentPassword, values.newPassword);
          alert(data.message);
          resetForm();
        } catch (error) {
          alert(error.message);
        }
      },
    });
  

  return (
    <ProfileLayout
      name="Marco Kelly"
      email="marcokelly@pathlyhub.com"
      avatarSrc="/path-to-avatar.jpg"
    >
      <Box sx={{ padding: 2, marginLeft: "100px" }}>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ marginBottom: "20px" }}>
            <Typography sx={{ fontWeight: "bold" }}>Password</Typography>
            <Typography>
              Please enter your current password to change your password.
            </Typography>
          </Box>
          <Divider sx={{ marginBottom: "20px" }} />

          {/* Current Password */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Typography
              color="black"
              sx={{ marginRight: "200px", fontSize: "15px" }}
            >
              Current Password <span>*</span>
            </Typography>
            <TextField
              name="currentPassword"
              placeholder="Enter current password"
              type="password"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
              helperText={formik.touched.currentPassword && formik.errors.currentPassword}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& input": {
                    padding: "5px",
                    width: "500px",
                  },
                },
              }}
            />
          </Box>
          <Divider sx={{ marginBottom: "20px" }} />

          {/* New Password */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Typography
              color="black"
              sx={{ marginRight: "220px", fontSize: "15px" }}
            >
              New Password <span>*</span>
            </Typography>
            <TextField
              name="newPassword"
              placeholder="Enter new password"
              type="password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
              helperText={formik.touched.newPassword && formik.errors.newPassword}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& input": {
                    padding: "5px",
                    width: "500px",
                  },
                },
              }}
            />
          </Box>
          <Divider sx={{ marginBottom: "20px" }} />

          {/* Confirm New Password */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Typography
              color="black"
              sx={{ marginRight: "165px", fontSize: "15px" }}
            >
              Confirm New Password <span>*</span>
            </Typography>
            <TextField
              name="confirmPassword"
              placeholder="Enter confirm password"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& input": {
                    padding: "5px",
                    width: "500px",
                  },
                },
              }}
            />
          </Box>

          <Divider sx={{ marginBottom: "20px" }} />

          {/* Submit Button */}
          <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  marginRight: "10px",
                  color: "black",
                  borderRadius:"10px"
                }}
              >
                cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "blue",
                  borderRadius:"10px"

                }}
              >
                Update password
              </Button>
            </Box>
        </form>
      </Box>
    </ProfileLayout>
  );
};

export default ConfirmPassword;
