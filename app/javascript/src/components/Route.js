import * as Sentry from "@sentry/react";
import { Route } from "react-router-dom";
export default Sentry.withSentryRouting(Route);
