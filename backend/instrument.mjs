import * as Sentry from "@sentry/node";
import { NODE_ENV, SENTRY_DSN } from "./src/config/serverConfig.js";

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  environment: NODE_ENV || "development",
  includeLocalVariables: true,

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});
