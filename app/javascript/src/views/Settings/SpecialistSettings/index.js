import React from "react";
import { Route, Routes, Navigate, useMatch } from "react-router-dom";
import { Container, useBreakpoint } from "@advisable/donut";
import View from "src/components/View";
import Navigation from "./SpecialistSettingsNavigation";
import General from "./General";
import Password from "../Password";
import PaymentSettings from "./PaymentSettings";
import Availability from "./Availability";
import AccountSettings from "../AccountSettings";
import SpecialistNotificationSettings from "./Notifications";

function SpecialistSettings() {
  const breakpointS = useBreakpoint("sUp");
  const isMobileView = useMatch({ path: "/settings", end: !breakpointS });

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
          <Routes>
            <Route path="/general" element={<General />} />
            <Route path="/availability" element={<Availability />} />
            <Route path="/payment-settings" element={<PaymentSettings />} />
            <Route path="/password" element={<Password />} />
            <Route path="/account" element={<AccountSettings />} />
            <Route
              path="/notifications"
              element={<SpecialistNotificationSettings />}
            />
            {/* If the user is not on a small screen, then redirect them to the
          first settings page when they are on exactly /settings */}
            {breakpointS && (
              <Route path="*" element={<Navigate to="/settings/general" />} />
            )}
          </Routes>
        </Container>
      </View.Content>
    </View>
  );
}

export default SpecialistSettings;
