import React, { lazy} from "react";

// auth component
import ForgotPage  from "../views/authentication/forgot-password/forgot/index"
export const Signin = lazy(() => import("../views/authentication/sign-in"));

const OTP = lazy(() => import("../views/authentication/forgot-password/OTP"));
const ResetPassword = lazy(() =>
  import("../views/authentication/forgot-password/reset")
);
const SessionTerminated = lazy(() => import("../ui-component/SessionTerminated"));


export const AuthRoutes = [
    {id: "signin", url: "/", element: <Signin/> },
    { id: "signin-2", url: "/signin", element:<Signin/>},
    { id: "session_terminated", url: "/session_terminated", element:<SessionTerminated/>},
    { id: "signin-3", url: "/signup", element:<Signin/>}, // add sign up route
    { id: "reset-password", url: "/resetPassword", element: <ResetPassword/> },
    { id: "otp", url: "/otp", element: <OTP/>},
    { id: "forgot-password", url: "/forgotPassword", element: <ForgotPage/> },
];
