import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "../../../components/Layout";
import { useBreakpoint } from "@advisable/donut";
import Sidebar from "./Sidebar";
import PaymentSettings from "./PaymentSettings";
import Invoices from "./Invoices";
import Password from "./Password";
import Invoice from "./Invoices/Invoice";

// Renders the settings view for a client user type.
const ClientSettings = ({ match }) => {
  let breakpointS = useBreakpoint("sUp");

  return (
    <Layout>
      {/* On mobile we only show the navigation menu if the URL is exactly
      /settings. On desktop we want to display it as a sidebar on all settings
      pages. We use a Route with exact prop to achieve this. */}
      <Route path={match.path} component={Sidebar} exact={!breakpointS} />
      <Layout.Main>
        <Switch>
          <Route path="/settings/payments" component={PaymentSettings} />
          <Route path="/settings/invoices" exact component={Invoices} />
          <Route path="/settings/invoices/:invoice_id" component={Invoice} />
          <Route path="/settings/password" component={Password} />
          {/* If the user is not on a small screen, then redirect them to the
          first settings page when they are on exactly /settings */}
          {breakpointS && (
            <Route
              exact
              path={match.path}
              render={() => <Redirect to="/settings/payments" />}
            />
          )}
        </Switch>
      </Layout.Main>
    </Layout>
  );
};

ClientSettings.propTypes = {
  match: PropTypes.object,
};

export default ClientSettings;
