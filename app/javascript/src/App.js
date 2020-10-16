import Routes from "./Routes";
import ApplicationProvider from "./components/ApplicationProvider";
import RootErrorBoundary from "./views/RootErrorBoundary";
import { NotificationsProvider } from "./components/Notifications";

const App = () => {
  return (
    <ApplicationProvider>
      <RootErrorBoundary>
        <NotificationsProvider>
          <Routes />
        </NotificationsProvider>
      </RootErrorBoundary>
    </ApplicationProvider>
  );
};

export default App;
