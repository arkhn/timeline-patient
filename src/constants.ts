type EnhancedWindow = typeof window & {
  env: {
    PUBLIC_URL: string;
    API_URL?: string;
  };
};

let { PUBLIC_URL, REACT_APP_API_URL: API_URL } = process.env;

// when using the app with a production build, environment variables are templated in index.html.
if (process.env.NODE_ENV === "production") {
  ({ PUBLIC_URL, API_URL } = (window as EnhancedWindow).env);
}

export { PUBLIC_URL, API_URL };
