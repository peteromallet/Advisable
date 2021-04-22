import StartApplication from "./StartApplication";
import SetPassword from "./SetPassword";

export default [
  {
    title: "Start Application",
    component: StartApplication,
    path: "/clients/join",
    exact: true,
  },
  {
    title: "Set Password",
    component: SetPassword,
    path: "/clients/join/set_password",
  },
];
