import React, { lazy } from "react";
import {
  DashboardOutlinedIcon,
  LogoutRoundedIcon,
} from "../assets/Icons/SideBarIcons";

// Provider component
const Analytics = lazy(() => import("../views/workspaces/Analytics"));
const Logout = lazy(() => import("../views/authentication/log-out"));

export const User = [
  {
    id: "analytics-user",
    title: "Analytics",
    type: "item",
    icon: <DashboardOutlinedIcon />,
    url: `/analytics`,
    breadcrumbs: true,
    element: <Analytics />,
  },
  {
    id: "logout-user",
    title: "Logout",
    type: "item",
    icon: <LogoutRoundedIcon />,
    url: "/logout",
    breadcrumbs: true,
    element: <Logout />,
  },
];
