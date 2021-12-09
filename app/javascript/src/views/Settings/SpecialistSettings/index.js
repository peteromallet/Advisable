import React from "react";
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom";
import { Container, useBreakpoint } from "@advisable/donut";
import View from "src/components/View";
import Navigation from "./SpecialistSettingsNavigation";
import General from "./General";
import Password from "./Password";
import PaymentSettings from "./PaymentSettings";
import Availability from "./Availability";

function SpecialistSettings() {
  const match = useRouteMatch();
  const breakpointS = useBreakpoint("sUp");
  const isMobileView = useRouteMatch({ path: match.path, exact: !breakpointS });

  return (
    <View>
      {/* On mobile we only show the navigation menu if the URL is exactly
      /settings. On desktop we want to display it as a sidebar on all settings
      pages. We use a Route with exact prop to achieve this. */}
      {isMobileView && (
        <View.Sidebar>
          <Navigation />
        </View.Sidebar>
      )}

      <View.Content>
        <Container
          pt={{ _: 4, s: 0, l: 12 }}
          pb={10}
          paddingX={[4, 4, 6, 8]}
          maxWidth={{ l: "940px" }}
        >
          <Switch>
            <Route path="/settings/general">
              <General />
            </Route>
            <Route path="/settings/availability">
              <Availability />
            </Route>
            <Route path="/settings/payment-settings">
              <PaymentSettings />
            </Route>
            <Route path="/settings/password">
              <Password />
            </Route>
            {/* If the user is not on a small screen, then redirect them to the
          first settings page when they are on exactly /settings */}
            {breakpointS && (
              <Route>
                <Redirect to="/settings/general" />
              </Route>
            )}
          </Switch>
        </Container>
      </View.Content>
    </View>
  );
}

export default SpecialistSettings;
