import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom";
import { Container, useBreakpoint } from "@advisable/donut";
import View from "src/components/View";
import ClientSettingsNavigation from "./ClientSettingsNavigation";
import PaymentSettings from "./PaymentSettings";
import Team from "./Team";
import Invoices from "./Invoices";
import OldInvoices from "./StripeInvoices";
import Password from "./Password";
import Invoice from "./StripeInvoices/Invoice";
import AccountSettings from "../AccountSettings";

// Renders the settings view for a client user type.
const ClientSettings = () => {
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
          <ClientSettingsNavigation />
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
            <Route path="/settings/payments">
              <PaymentSettings />
            </Route>
            <Route path="/settings/team">
              <Team />
            </Route>
            <Route path="/settings/invoices/old/:invoice_id">
              <Invoice />
            </Route>
            <Route path="/settings/invoices/old">
              <OldInvoices />
            </Route>
            <Route path="/settings/invoices">
              <Invoices />
            </Route>
            <Route path="/settings/password">
              <Password />
            </Route>
            <Route path="/settings/account">
              <AccountSettings />
            </Route>
            {/* If the user is not on a small screen, then redirect them to the
          first settings page when they are on exactly /settings */}
            {breakpointS && (
              <Route exact path={match.path}>
                <Redirect to={`/settings/account`} />
              </Route>
            )}
          </Switch>
        </Container>
      </View.Content>
    </View>
  );
};

ClientSettings.propTypes = {
  match: PropTypes.object,
};

export default ClientSettings;
