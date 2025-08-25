import "dotenv/config";

export const PORT = process.env.PORT || 5001;

export const MONGODB_URI = process.env.MONGODB_URI;

export const NODE_ENV = process.env.NODE_ENV;

export const CLERK_PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY;

export const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;

export const STREAM_API_KEY = process.env.STREAM_API_KEY;

export const STREAM_SECRET_KEY = process.env.STREAM_SECRET_KEY;

export const SENTRY_DSN = process.env.SENTRY_DSN;

export const INNGEST_EVENT_KEY = process.env.INNGEST_EVENT_KEY;

export const INNGEST_SIGNING_KEY = process.env.INNGEST_SIGNING_KEY;
