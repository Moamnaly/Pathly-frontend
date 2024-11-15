import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../../store/slices/snackbarSlice";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useAuth from "../../../hooks/useAuth";
import cardStyle from "../../../theme/card-layout";
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";
// import Logo from "../../../assets/final.svg";

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
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

function LoginPage() {
  const dispatch = useDispatch();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
            email: "",
            password: "",
            rememberMe: false,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            setLoading(true);
            try {
            await login(values.email, values.password);
            localStorage.setItem("openCallWindow", false)
            localStorage.setItem("meeting_start", false)
            setLoading(false);
          } catch (err) {
            console.log("first err", err.response.data.error)
            setLoading(false);
              dispatch(openSnackbar({
                open: true,
                message: err.response.data.error,
                variant: 'alert',
                alert: { color: 'error' }
              }));
          } 
          }}
        >
          {({ handleSubmit }) => (
            <>
            <Form>
              <Grid item xs={12} marginBottom={1}>
                <Typography
                  gutterBottom
                  sx={{
                    fontSize: "24px",
                    lineHeight: "32px",
                    letterSpacing: "0em",
                    textTransform: "none",
                    fontWeight: 800,
                    marginBottom: "25px",
                  }}
                >
                  Hey, good to see you
                </Typography>
              </Grid>
              <Grid item xs={12} marginBottom={1}>
                <Typography
                  sx={{
                    fontSize: "20px",
                    lineHeight: "32px",
                    letterSpacing: "0em",
                    textTransform: "none",
                    fontWeight: 800,
                    marginBottom: "15px",
                  }}
                >
                  Let's sign you in
                </Typography>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    placeholder="Email"
                    name="email"
                    size="small"
                    style={cardStyle}
                    onKeyDown={(event) => event.keyCode === 13 ?  handleSubmit() : null}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    style={{ color: "red" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    size="small"
                    placeholder="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'} // Ternary to show/hide password
                    style={cardStyle}
                    onKeyDown={(event) => event.keyCode === 13 ?  handleSubmit() : null}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePasswordVisibility}>
                            {!showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    style={{ color: "red" }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "end" }}
                >
                  <Grid  style={{
                        marginTop: "10px",
                        cursor: "pointer",
                      }}>
                    <Typography
                      variant="body"
                    >
                      <Link
                        color="primary"
                        component={RouterLink}
                        // to="/forgotPassword"
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        Forgot Password?
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                fullWidth
                style={{
                  marginTop: "16px",
                  color: "#FFF",
                  marginBottom: "16px",
                  height: "40px",
                  fontWeight: 700,
                  textTransform: "none",
                  backgroundColor: "primary"
                }}
                onClick={handleSubmit}
              >
                Let's get started
                {loading && (
                  <CircularProgress size={18} style={{ marginLeft: '10px', color: "white" }} />
                )}
              </Button>
            </Form>
            </>
          
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
