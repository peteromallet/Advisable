import StartApplication from "./StartApplication";
import SetPassword from "./SetPassword";

export default [
  {
    title: "Start Application",
    component: StartApplication,
    path: "",
    exact: true,
  },
  {
    title: "Set Password",
    component: SetPassword,
    path: "set_password",
  },
];
