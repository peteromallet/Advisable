import React from "react";
import { Route, Routes, Navigate, useMatch } from "react-router-dom";
import { Container, useBreakpoint } from "@advisable/donut";
import View from "src/components/View";
import ClientSettingsNavigation from "./ClientSettingsNavigation";
import PaymentSettings from "./PaymentSettings";
import Team from "./Team";
import Invoices from "./Invoices";
import OldInvoices from "./StripeInvoices";
import Password from "../Password";
import Invoice from "./StripeInvoices/Invoice";
import AccountSettings from "../AccountSettings";
import NotificationSettings from "./Notifications";

// Renders the settings view for a client user type.
const ClientSettings = () => {
  const breakpointS = useBreakpoint("sUp");
  const isMobileView = useMatch({ path: "/settings", end: !breakpointS });

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
          <Routes>
            <Route path="/payments" element={<PaymentSettings />} />
            <Route path="/team" element={<Team />} />
            <Route path="/invoices/old/:invoice_id" element={<Invoice />} />
            <Route path="/invoices/old" element={<OldInvoices />} />
            <Route path="/invoices/*" element={<Invoices />} />
            <Route path="/password" element={<Password />} />
            <Route path="/account" element={<AccountSettings />} />
            <Route path="/notifications" element={<NotificationSettings />} />
            {/* If the user is not on a small screen, then redirect them to the
          first settings page when they are on exactly /settings */}
            {breakpointS && (
              <Route
                exact
                path="/"
                element={<Navigate to="/settings/account" />}
              />
            )}
          </Routes>
        </Container>
      </View.Content>
    </View>
  );
};

export default ClientSettings;
