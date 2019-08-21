import React from "react";
import { useTheme, Box } from "@advisable/donut";
import { Switch, Route, Redirect } from "react-router-dom";
import Logo from "../../components/Logo";
import { Container, Main, Sidebar, Content } from "./styles";
import Skills from "./Skills";
import Confirm from "./Confirm";
import AccountDetails from "./AccountDetails";

const STEPS = [
  {
    path: "/",
    exact: true,
    component: Skills,
  },
  {
    path: "/account",
    component: AccountDetails,
  },
  {
    path: "/confirm",
    component: Confirm,
  },
  {
    path: "/preferences",
    component: () => <>Freelancing preferences</>,
  },
];

// Renders the freelancer signup flow.
const FreelancerSignup = () => {
  const { updateTheme } = useTheme();

  React.useLayoutEffect(() => {
    updateTheme({ background: "white" });
    return () => updateTheme({ background: "default" });
  }, []);

  return (
    <Container>
      <Main>
        <Content>
          <Box mt="l" mb="xxl">
            <Logo />
          </Box>
          <Switch>
            {STEPS.map(step => (
              <Route
                key={step.path}
                path={`/freelancers/signup${step.path}`}
                exact={step.exact}
                component={step.component}
              />
            ))}
          </Switch>
        </Content>
      </Main>
      <Sidebar>sidebar</Sidebar>
    </Container>
  );
};

export default FreelancerSignup;
