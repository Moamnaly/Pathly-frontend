import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { TextField, Grid, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useTheme } from "@mui/material/styles";
import * as Yup from "yup";
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

const OTPForm = () => {
  const navigate = useNavigate();
  const { notifySuccess, notifyError } = useNotification();
  const inputRef = useRef(null);

  const location = useLocation();
  const validationSchema = Yup.object().shape({
    digit1: Yup.string()
      .matches(/^\d$/, "Enter a single digit")
      .required(" "),
    digit2: Yup.string()
      .matches(/^\d$/, "Enter a single digit")
      .required(" "),
    digit3: Yup.string()
      .matches(/^\d$/, "Enter a single digit")
      .required(" "),
    digit4: Yup.string()
      .matches(/^\d$/, "Enter a single digit")
      .required(" "),
    digit5: Yup.string()
      .matches(/^\d$/, "Enter a single digit")
      .required(" "),
    digit6: Yup.string()
      .matches(/^\d$/, "Enter a single digit")
      .required(" "),
  });
  const resendOTP = () => {
    console.log('resend otp');
    AuthApis.sendOTP(location?.state?.email).then((res) => {
      console.log("res?.data?.data", res);
      notifySuccess(res.data.message);
      setTimer(90)
      // navigate("/otp",{state : { email:values.email}});

    }).catch((err) => {
      console.log("errrr", err)
      notifyError(err?.response?.data?.error)
    });

  }

  const formik = useFormik({
    initialValues: {
      digit1: "",
      digit2: "",
      digit3: "",
      digit4: "",
      digit5: "",
      digit6: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const otp = `${values.digit1}${values.digit2}${values.digit3}${values.digit4}${values.digit5}${values.digit6}`;
      // Handle OTP submission here
      console.log("Submitted OTP: ", otp);
      try {

        AuthApis.verifyOTP(location?.state?.email, otp).then((res) => {
          console.log("res?.data?.data", res);
          notifySuccess(res.data.message);
          navigate("/resetPassword", { state: { token: res.data.token } });

        }).catch((err) => {
          console.log("errrr", err)
          notifyError(err?.response?.data?.error)
        });

      } catch (err) {
        console.log("errr", err)
        notifyError("Something went wrong")
      }
    },
  });

  const [timer, setTimer] = useState(90); // Initial timer value in seconds

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1); // Decrement the timer by 1 second
      }
    }, 1000); // Update the timer every 1000 milliseconds (1 second)

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [timer]);

  // Convert the timer value into "mm:ss" format
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;



  const handleInputChange = (index, event) => {
    const fieldName = `digit${index}`;
    formik.setFieldValue(fieldName, event.target.value);
    formik.setFieldTouched(fieldName, true);
    // Check if the current input is not the last one and has a value
    if (index < 6 && event.target.value !== "") {
      const nextIndex = index + 1;
      const nextFieldName = `digit${nextIndex}`;
      const nextFieldValue = formik.values[nextFieldName];
      if (!nextFieldValue) {
        document.querySelector(`input[name=${nextFieldName}]`).focus();
      }
    }
  };
  const handleKeyDown = (index, e) => {
    const previousInputName = `digit${index - 1}`;
    const currentInputName = `digit${index}`;
    if (e.key === 'Backspace' && e.target.value === "") {
      document.getElementsByName(previousInputName)[0]?.focus();
    }
    if (e.key === 'Backspace' && e.target.value !== "") {
      document.getElementsByName(currentInputName)[0]?.focus();
    } else if (e.target.value !== "" && e.key !== 'Backspace') {
      document.getElementsByName(currentInputName)[0]?.focus();
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography
        variant="body"
        gutterBottom
        sx={{
          // fontFamily: 'sharp-sans-bold, fallback-font, Arial, sans-serif',
          fontSize: "24px",
          lineHeight: "32px",
          letterSpacing: "0em",
          textTransform: "none",
          marginBottom: "12px",
          fontWeight: 800,
          // color: '#0477C5',
        }}
      >
        Enter OTP
      </Typography>
      <Typography
        gutterBottom
        varient="body"
        sx={{
          // fontFamily: 'sharp-sans-bold, fallback-font, Arial, sans-serif',
          fontSize: "16px",
          lineHeight: "32px",
          letterSpacing: "0em",
          textTransform: "none",
          marginBottom: "12px",
          // fontWeight: 800,
          // color: "#0477C5",
        }}
      >
        We have sent OTP on your email.
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
            height: "20px",
          },
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <Grid item xs={2} key={index}>
            <TextField
              variant="outlined"
              name={`digit${index}`}
              color="primary"
              inputProps={{ maxLength: 1 }}
              {...formik.getFieldProps(`digit${index}`)}
              error={
                formik.touched[`digit${index}`] &&
                Boolean(formik.errors[`digit${index}`])
              }
              // helperText={
              //   formik.touched[`digit${index}`] &&
              //   formik.errors[`digit${index}`]
              // }
              onInput={(e) => handleInputChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={inputRef}
            />
            {formik.touched[`digit${index}`] && formik.errors[`digit${index}`] && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%', // Adjust this value to position the error message as needed
                  left: 0,
                  color: 'red', // or any other styles you want to apply
                }}
              >
                {formik.errors[`digit${index}`]}
              </div>
            )}
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{
              color: "#FFF",
              // marginBottom: "16px",
              height: "40px",
              fontWeight: 700,
              textTransform: 'none'
            }}
          >
            Submit OTP
          </Button>
        </Grid>
        <Grid style={{ marginTop: "10px" }}>
          {/* <Tooltip title="Click to reset OTP" arrow> */}

          <Button
            gutterBottom
            type="button"
            varient="body"
            color={"primary"}
            style={{ paddingLeft: "8px" }}
            onClick={resendOTP}
            disabled={timer !== 0}
            sx={{
              // fontFamily: 'sharp-sans-bold, fallback-font, Arial, sans-serif',
              fontSize: "16px",
              lineHeight: "32px",
              letterSpacing: "0em",
              textTransform: "none",
              // color: '#0477C5',
              marginLeft: "8px",
            }}
          >
            Resend OTP again
          </Button>
          {/* </Tooltip>   */}
        </Grid>
      </Grid>
      <Grid>
        <Typography
          gutterBottom
          varient="body"
          sx={{
            // fontFamily: 'sharp-sans-bold, fallback-font, Arial, sans-serif',
            fontSize: "12px",
            lineHeight: "32px",
            letterSpacing: "0em",
            textTransform: "none",
            // color: "#0477C5",
          }}
        >
          Resend OTP in{" "}
          <span style={{ color: "#02176a" }}>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds} secs
          </span>
        </Typography>
      </Grid>
    </form>
  );
};

const OTP = () => {

  const theme = useTheme();

  return (
    <MainContainer>
      <LeftSection sx={{ width: { xs: "100%", md: "50%" } }}>
        <OTPForm />
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
};

export default OTP;
