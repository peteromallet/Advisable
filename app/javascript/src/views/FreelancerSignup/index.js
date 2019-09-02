import React from "react";
import { get } from "lodash";
import { useQuery } from "react-apollo";
import { useTheme, Box } from "@advisable/donut";
import { Switch, Route, Redirect, matchPath } from "react-router-dom";
import Logo from "../../components/Logo";
import { Main, Content } from "./styles";
import Skills from "./Skills";
import Confirm from "./Confirm";
import Sidebar from "./Sidebar";
import WorkHistory from "./WorkHistory";
import BuildProfile from "./BuildProfile";
import AccountDetails from "./AccountDetails";
import FreelancingPreferences from "./FreelancingPreferences";
import GET_SPECIALIST from "./getProfile";

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
    component: FreelancingPreferences,
    authRequired: true,
  },
  {
    path: "/profile",
    component: BuildProfile,
    authRequired: true,
  },
  {
    path: "/work",
    component: WorkHistory,
    authRequired: true,
  },
];

// Renders the freelancer signup flow.
const FreelancerSignup = ({ location }) => {
  const { updateTheme } = useTheme();
  const { loading, data, errors } = useQuery(GET_SPECIALIST);

  React.useLayoutEffect(() => {
    updateTheme({ background: "white" });
    return () => updateTheme({ background: "default" });
  }, []);

  if (loading) return <>loading...</>;

  const viewer = get(data, "viewer");

  return (
    <Box pr={{ _: 0, m: "40%" }}>
      <Main>
        <Content>
          <Box mt="l" mb="xxl" position="relative">
            <Logo />
            <Box display="flex" position="absolute" right={0} top={15}>
              {STEPS.map(step => {
                const isActive = matchPath(location.pathname, {
                  path: `/freelancers/signup${step.path}`,
                  exact: step.exact,
                });

                return (
                  <Box
                    ml="xxs"
                    width={isActive ? 8 : 6}
                    height={6}
                    key={step.path}
                    borderRadius={3}
                    bg={isActive ? "blue.3" : "neutral.1"}
                    css="transition: width 300ms; background 300ms;"
                  />
                );
              })}
            </Box>
          </Box>
          <Switch>
            {STEPS.map(step => (
              <Route
                key={step.path}
                path={`/freelancers/signup${step.path}`}
                exact={step.exact}
                render={route => {
                  // If the step required authenticated user
                  if (step.authRequired) {
                    // and there is no viewer
                    if (!Boolean(viewer)) {
                      // redirect to first step
                      return <Redirect to="/freelancers/signup" />;
                    }
                  } else {
                    // if it doesn't require auth but there is a viewer and
                    // their accountStatus is Started then redirect to the
                    // confirmation step
                    // if (Boolean(viewer) && viewer.accountStatus === "Started") {
                    //   return <Redirect to="/freelancers/signup/confirm" />;
                    // }
                  }

                  // If there is a viewer and their accountStatus is not
                  // 'Started' then redirect to the root path.
                  if (Boolean(viewer) && viewer.accountStatus !== "Started") {
                    return <Redirect to="/" />;
                  }

                  const Component = step.component;
                  return <Component {...route} specialist={data.viewer} />;
                }}
              />
            ))}
          </Switch>
        </Content>
      </Main>
      <Sidebar specialist={data.viewer} />
    </Box>
  );
};

export default FreelancerSignup;
