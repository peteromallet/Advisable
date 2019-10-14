// Renders the freelancer signup flow.
import React from "react";
import { get } from "lodash";
import { useQuery } from "react-apollo";
import { useTheme, Box } from "@advisable/donut";
import { Switch, Route, Redirect, matchPath } from "react-router-dom";
import Logo from "../../components/Logo";
import Loading from "../../components/Loading";
import { Main, Content } from "./styles";
import Skills from "./Skills";
import Confirm from "./Confirm";
import Sidebar from "./Sidebar";
import WorkHistory from "./WorkHistory";
import BuildProfile from "./BuildProfile";
import AccountDetails from "./AccountDetails";
import FreelancingPreferences from "./FreelancingPreferences";
import GET_SPECIALIST from "./getProfile";

// Each of the steps is defined in the STEPS array below. Each step must have
// a path and a component key. It can also have 'exact' which will be passed
// to the react router route component.
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
    // some users still need to confirm their account, however, their account
    // status is not 'Started'. Because of this we want to allow them to enter
    // the flow and then be redirected out after confirming their account
    allowAnyAccountStatus: true,
  },
  {
    path: "/preferences",
    component: FreelancingPreferences,
    authRequired: true, // everything after the confirmation step requires the
    // user to be authenticated so we set the 'authRequired' key to true.
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
  const { loading, data } = useQuery(GET_SPECIALIST);

  // Throughout this flow we want the background to be completely white. We
  // can achieve this by updating the theme using a React effect.
  React.useLayoutEffect(() => {
    updateTheme({ background: "white" });
    return () => updateTheme({ background: "default" });
  }, []);

  if (loading) return <Loading />;

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
                    if (!viewer) {
                      // redirect to first step
                      return <Redirect to="/freelancers/signup" />;
                    }
                  }

                  // If there is a viewer and their applicationStage is not
                  // 'Started' then redirect to the root path.
                  if (
                    !step.allowAnyAccountStatus &&
                    Boolean(viewer) &&
                    viewer.applicationStage !== "Started"
                  ) {
                    return <Redirect to="/" />;
                  }

                  const Component = step.component;
                  return <Component {...route} specialist={viewer} />;
                }}
              />
            ))}
          </Switch>
        </Content>
      </Main>
      <Sidebar specialist={viewer} />
    </Box>
  );
};

export default FreelancerSignup;
