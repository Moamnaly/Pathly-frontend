import React from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { TextField, Button, Grid, Typography, List } from "@mui/material";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNotification } from "../../../../hooks/use-notification";
import cardStyle from "../../../../theme/card-layout";
import { AuthApis } from "../../../../service/auth";
// import Logo from "../../../../assets/final.svg";

const MainContainer = styled(Grid)({
  height: "100vh",
  display: "flex",
});

const LeftSection = styled(Grid)({
  width: "50%",
  background: "white",
  padding: "10rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const RightSection = styled(Grid)({
  width: "50%",
  background: "#42427C",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { notifySuccess, notifyError} = useNotification();
  const validRequirementStyle = {
    color: "green",
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
    .required("New Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])/,
      "Password must contain at least one lowercase letter"
    )
    .matches(
      /^(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter"
    )
    .matches(/^(?=.*\d)/, "Password must contain at least one number")
    .matches(/^(?=.*[@#$%^&+=])/, "Password must contain at least one symbol"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  });

  const PasswordRequirements = [
    { lable: "Minimum 8 characters long - the more, the better" },
    { lable: "At least one lowercase character" },
    { lable: "At least one uppercase character" },
    { lable: "At least one number" },
    { lable: "At least one symbol" },
  ];

  const isRequirementMet = (requirementName, yourPassword) => {
    // Create a regular expression for each condition
    const regexPatterns = {
      minLength: /^.{8,}$/, // Minimum 8 characters long
      hasLowerCase: /[a-z]/, // At least one lowercase character
      hasUpperCase: /[A-Z]/, // At least one uppercase character
      hasNumber: /[0-9]/, // At least one number
      hasSymbol: /[@#$%^&+=]/, // At least one symbol
    };
  
    // Check the specified requirement
    switch (requirementName) {
      case "Minimum 8 characters long - the more, the better":
        return regexPatterns.minLength.test(yourPassword); // Replace yourPassword with the actual password to test
      case "At least one lowercase character":
        return regexPatterns.hasLowerCase.test(yourPassword); // Replace yourPassword with the actual password to test
      case "At least one uppercase character":
        return regexPatterns.hasUpperCase.test(yourPassword); // Replace yourPassword with the actual password to test
      case "At least one number":
        return regexPatterns.hasNumber.test(yourPassword); // Replace yourPassword with the actual password to test
      case "At least one symbol":
        return regexPatterns.hasSymbol.test(yourPassword); // Replace "yourPassword" with the actual password to test
      default:
        // Handle other requirements or throw an error for unknown requirements
        throw new Error(`Unknown requirement: ${requirementName}`);
    }
  };
  return (
    <MainContainer>
      <LeftSection
        sx={{
          width: { xs: "100%", md: "50%" },
          ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
            height: "15px",
          },
        }}
      >
        <Formik
          initialValues={{
            password: "",
            confirm_password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values, "values");
            AuthApis.changePassword(location?.state?.token, values).then((res) => {
              console.log("res?.data?.data", res);
              notifySuccess(res.data.message);
              navigate("/signin");
             
            }).catch((err) => {
              console.log("errrr", err)
              notifyError(err?.response?.data?.error)
            });
          }}
        >
          {({ values, handleSubmit }) => (
            <Form>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  // fontSize: "24px",
                  // lineHeight: "32px",
                  // letterSpacing: "0em",
                  // textTransform: "none",
                  marginBottom: "15px",
                  fontWeight: 700,
                  // color: "#0477C5",
                }}
              >
                Reset Password
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Field
                      as={TextField}
                      variant="outlined"
                      size="small"
                      fullWidth
                      placeholder="Enter new password"
                      name="password"
                      sx={cardStyle}
                    />
                  <ErrorMessage
                    name="password"
                    component="div"
                    style={{ color: "red", marginTop: "10px" }}
                  />
                </Grid>
                <Grid item xs={12}>
                    <Field
                      as={TextField}
                      variant="outlined"
                      fullWidth
                      size="small"
                      placeholder="Enter confirm password"
                      name="confirm_password"
                      type="password"
                      sx={cardStyle}
                    />
                  <ErrorMessage
                    name="confirm_password"
                    component="div"
                    style={{ color: "red", marginTop: "10px" }}
                  />
                </Grid>
              </Grid>
              <Grid container xs={12} sx={1} paddingTop={2}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    Password Requirements :
                  </Typography>
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                      }}
                    >
                      Ensure that this requirement are met:
                    </Typography>
                  </Grid>

                  <List>
                    {PasswordRequirements.map((field) => {
                      const isMet = isRequirementMet(
                        field.lable,
                        values.password
                      );
                      return (
                        <>
                          <Typography
                            key={field.lable}
                            variant="body1"
                            sx={{
                              marginBottom: "5px",
                              fontSize: "16px",
                              ...(isMet ? validRequirementStyle : ""),
                            }}
                          >
                            {field.lable}
                          </Typography>
                        </>
                      );
                    })}
                  </List>
                </Grid>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{
                  marginTop: "16px",
                  color: "#FFF",
                  marginBottom: "16px",
                  height: "40px",
                  fontWeight: 700,
                  textTransform: 'none',
                  fontSize: "16px"
                }}
                onClick={handleSubmit}
              >
                Update Password
              </Button>
            </Form>
          )}
        </Formik>
      </LeftSection>
      <RightSection
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
          background: theme.palette.primary.main,
        }}
        >
        <img
          // src={Logo}
          alt="Logo"
          style={{
            width: '30%',
            height: 'auto',
            marginLeft: '37%',
            marginTop: '43vh',
          }}
          />
      </RightSection>
    </MainContainer>
  );
}

export default LoginPage;
