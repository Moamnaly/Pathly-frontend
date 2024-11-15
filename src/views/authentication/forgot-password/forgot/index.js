import React from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Link,
} from "@mui/material";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import cardStyle from "../../../../theme/card-layout";
import { AuthApis } from "../../../../service/auth";
import { useNotification } from "../../../../hooks/use-notification";
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

function ForgotPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { notifySuccess, notifyError} = useNotification();


  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

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
            email: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            console.log(values, "values");
            try {
              
              AuthApis.sendOTP(values.email).then((res) => {
                console.log("res?.data?.data", res);
                notifySuccess(res.data.message);
                navigate("/otp",{state : { email:values.email}});
               
              }).catch((err) => {
                console.log("errrr", err)
                notifyError(err?.response?.data?.error)
              });
              
            } catch (err) {
              console.log("errr", err)
              notifyError(err?.response?.data?.error)
            }

           
          }}
        >
          {({ handleSubmit }) => (
            <Form>
              <Grid item xs={12} marginBottom={1}>
                <Typography
                  variant="body"
                  gutterBottom
                  sx={{
                    // fontFamily:
                    //   "sharp-sans-bold, fallback-font, Arial, sans-serif",
                    fontSize: "24px",
                    lineHeight: "32px",
                    letterSpacing: "0em",
                    textTransform: "none",
                    marginBottom: "12px",
                    fontWeight: 800,
                    // color: "#0477C5",
                  }}
                >
                  Forgot Password
                </Typography>
              </Grid>
              <Grid container >
                <Grid item xs={12}>
                    <Field
                      as={TextField}
                      variant="outlined"
                      fullWidth
                      placeholder="Email"
                      name="email"
                      sx={cardStyle}
                    />
                  <ErrorMessage
                    name="email"
                    component="div"
                    style={{ color: "red", marginTop: "8px" }}
                  />
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
                }}
                onClick={handleSubmit}
              >
                Send OTP
              </Button>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    // variant="body1"
                    style={{
                      cursor: "pointer",
                      textDecoration :"none"
                    }}
                    component={RouterLink}
                    to="/signin"
                  >
                    <ArrowBackIosNewOutlinedIcon
                      color="primary"
                      sx={{
                        fontSize: "12px",
                        marginRight: "10px",
                        fontWeight: 700,
                      }}
                    />
                    <Link style={{
                          textDecoration: "none",
                        }} color="primary">Back to Sign in</Link>
                  </Typography>
                </Grid>
              </Grid>
             
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

export default ForgotPage;
