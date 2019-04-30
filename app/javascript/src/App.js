import React from "react";
import Routes from "./Routes";
import BaseStyling from "./BaseStyling";
import RootErrorBoundary from "./views/RootErrorBoundary";
import { NotificationsProvider } from "./components/Notifications";
import "./i18n";

const App = () => {
  return (
    <RootErrorBoundary>
      <BaseStyling />
      <NotificationsProvider>
        <Routes />
      </NotificationsProvider>
    </RootErrorBoundary>
  );
};

export default App;
