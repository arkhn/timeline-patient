type EnhancedWindow = typeof window & {
  env: {
    PUBLIC_URL: string;
    API_URL?: string;
    FHIR_API_AUTH_TOKEN?: string;
  };
};

let {
  PUBLIC_URL,
  REACT_APP_API_URL: API_URL,
  REACT_APP_FHIR_API_AUTH_TOKEN: FHIR_API_AUTH_TOKEN,
} = process.env;

const TERMINOLOGY_SYSTEM_URL = "http://terminology.arkhn.org/CodeSystem/source";

// when using the app with a production build, environment variables are templated in index.html.
if (process.env.NODE_ENV === "production") {
  ({ PUBLIC_URL, API_URL, FHIR_API_AUTH_TOKEN } = (
    window as EnhancedWindow
  ).env);
}

export { PUBLIC_URL, API_URL, FHIR_API_AUTH_TOKEN, TERMINOLOGY_SYSTEM_URL };
