import React from "react";
import StartApplication from "./StartApplication";
import SetPassword from "./SetPassword";

export default [
  {
    title: "Start Application",
    component: StartApplication,
    path: "/freelancers/join",
    exact: true,
  },
  {
    title: "Set Password",
    component: SetPassword,
    path: "/freelancers/join/set_password",
  },
  {
    title: "Thank You",
    component: React.Fragment,
    path: "/freelancers/join/thank_you",
  },
];
