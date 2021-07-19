import React from "react";
import { Switch, Redirect } from "react-router-dom";
import Route from "src/components/Route";
import { Container, useBreakpoint } from "@advisable/donut";
import View from "src/components/View";
import Navigation from "./SpecialistSettingsNavigation";
import General from "./General";
import Password from "./Password";
import PaymentSettings from "./PaymentSettings";
import Availability from "./Availability";

function SpecialistSettings({ match }) {
  let breakpointS = useBreakpoint("sUp");

  return (
    <View>
      {/* On mobile we only show the navigation menu if the URL is exactly
      /settings. On desktop we want to display it as a sidebar on all settings
      pages. We use a Route with exact prop to achieve this. */}
      <Route path={match.path} exact={!breakpointS}>
        <View.Sidebar>
          <Navigation />
        </View.Sidebar>
      </Route>

      <View.Content>
        <Container
          pt={{ _: 4, s: 0, l: 12 }}
          pb={10}
          paddingX={[4, 4, 6, 8]}
          maxWidth={{ l: "940px" }}
        >
          <Switch>
            <Route path="/settings/general" component={General} />
            <Route path="/settings/availability" component={Availability} />
            <Redirect from="/settings/references" to="/profile" />
            <Route
              path="/settings/payment-settings"
              component={PaymentSettings}
            />
            <Route path="/settings/password" component={Password} />
            {/* If the user is not on a small screen, then redirect them to the
          first settings page when they are on exactly /settings */}
            {breakpointS && <Redirect to="/settings/general" />}
          </Switch>
        </Container>
      </View.Content>
    </View>
  );
}

export default SpecialistSettings;
