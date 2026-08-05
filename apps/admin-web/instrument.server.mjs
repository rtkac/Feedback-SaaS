import * as Sentry from '@sentry/tanstackstart-react';

Sentry.init({
  dsn: 'https://24eded254d969d6f403f0ad263fbdba3@o4511858751176704.ingest.de.sentry.io/4511858763694160',
  enabled: process.env.NODE_ENV === 'production',
  environment: process.env.APP_ENV ?? process.env.NODE_ENV,

  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/tanstackstart-react/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: [],
  },
});
