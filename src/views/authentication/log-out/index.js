import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
import { Formik, Form } from "formik";
import { closeDrawer, openDrawer } from "../../../store/slices/drawerSlices";
import { AuthActions } from "../../../contexts/auth";
// import Logo from "../../../assets/final.svg";
import { AuthApis } from "../../../service/auth";

const MainContainer = styled(Grid)({
  height: "93.1vh",
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
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    dispatch(closeDrawer())
    return () => {
      dispatch(openDrawer())
    };
  }, [dispatch])
  


  return (
    <MainContainer >
      <LeftSection sx={{ width: { xs: "100%", md: "50%" } }}>
        <Grid container display={"flex"} justifyContent={"center"}>
        <Formik>
          {() => (
            <Form
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body"
                gutterBottom
                sx={{
                  fontSize: "22px",
                  lineHeight: "32px",
                  letterSpacing: "0em",
                  textTransform: "none",
                  marginBottom: "12px",
                  fontWeight: 800,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Want to Log out ?
              </Typography>
              <Typography
                gutterBottom
                varient="body"
                sx={{
                  fontSize: "18px",
                  lineHeight: "32px",
                  letterSpacing: "0em",
                  textTransform: "none",
                  marginBottom: "12px",
                  fontWeight: 800,
                  color: "#0477C5",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Are you sure ?
              </Typography>
              <Grid container spacing={2}>
      <Grid item xs={8} md={12} lg={8}>
        <Button
          variant="contained"
          name="Yes"
          style={{
            backgroundColor: "#FEE4E2",
            color: "#BB251A",
            fontWeight: 600,
          }}
          onClick={() => {
            AuthApis.logout()
              .then((response) => {
                console.log("logout successfully", response)
              })
              .catch((error) => {
                console.error("Error fetching data:", error);
              });
            dispatch({ type: AuthActions.clearUser });
            localStorage.setItem("openCallWindow", false)
            localStorage.setItem("meeting_start", false)
            navigate("/signin");
          }}
        >
          Yes, Log me out
        </Button>
      </Grid>
      <Grid item xs={4} md={12} lg={4}>
        <Button
          variant="contained"
          name="No"
          style={{
            backgroundColor: "#FFF",
            color: "black",
            fontWeight: 600,
          }}
          onClick={() => {
            navigate("/analytics");
          }}
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
            </Form>
          )}
        </Formik>
        </Grid>
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
