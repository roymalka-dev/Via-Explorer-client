const env = import.meta.env.VITE_APP_ENV || process.env.VITE_APP_ENV;
const devApiBaseUrl =
  import.meta.env.VITE_APP_LOCAL_API_BASE_URL ||
  process.env.VITE_APP_LOCAL_API_BASE_URL;
const prodApiBaseUrl =
  import.meta.env.VITE_APP_API_BASE_URL || process.env.VITE_APP_API_BASE_URL;

const devBaseUrl =
  import.meta.env.VITE_APP_LOCAL_BASE_URL ||
  process.env.VITE_APP_LOCAL_BASE_URL;

const prodBaseUrl =
  import.meta.env.VITE_APP_BASE_URL || process.env.VITE_APP_BASE_URL;

const googleClientId =
  import.meta.env.VITE_APP_GOOGLE_CLIENT_ID ||
  process.env.VITE_APP_GOOGLE_CLIENT_ID;

const apiPrefix =
  import.meta.env.VITE_APP_API_PERFIX || process.env.VITE_APP_API_PERFIX;

const appConfig = {
  apiPrefix: apiPrefix,
  baseUrl: env === "DEV" ? devBaseUrl : prodBaseUrl,
  apiBaseUrl: env === "DEV" ? devApiBaseUrl : prodApiBaseUrl,
  googleClientId: googleClientId,
  authenticatedEntryPath: "/",
  unAuthenticatedEntryPath: "/auth/login",
  tourPath: "",
  locale: "en",
  enableMock: true,
};

export default appConfig;
