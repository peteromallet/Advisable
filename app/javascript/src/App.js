import React from "react";
import Routes from "./Routes";
import BaseStyling from "./BaseStyling";
import ApplicationProvider from "./components/ApplicationProvider";
import RootErrorBoundary from "./views/RootErrorBoundary";
import { NotificationsProvider } from "./components/Notifications";
import "./i18n";

const App = () => {
  return (
    <>
      <BaseStyling />
      <RootErrorBoundary>
        <ApplicationProvider>
          <NotificationsProvider>
            <Routes />
          </NotificationsProvider>
        </ApplicationProvider>
      </RootErrorBoundary>
    </>
  );
};

export default App;
