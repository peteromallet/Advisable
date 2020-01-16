import React from "react";
import Routes from "./Routes";
import ApplicationProvider from "./components/ApplicationProvider";
import RootErrorBoundary from "./views/RootErrorBoundary";
import { NotificationsProvider } from "./components/Notifications";

const App = () => {
  return (
    <RootErrorBoundary>
      <ApplicationProvider>
        <NotificationsProvider>
          <Routes />
        </NotificationsProvider>
      </ApplicationProvider>
    </RootErrorBoundary>
  );
};

export default App;
