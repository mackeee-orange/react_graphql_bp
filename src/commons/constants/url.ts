export const API_HOST_URL = ((): string => {
  switch (process.env.REACT_APP_ENV) {
    case "local":
      return "http://localhost:4000";
    case "development":
      return "https://api-dev.example.com";
    case "staging":
      return "https://api-stg.example.com";
    case "production":
      return "https://api.example.com";
    default:
      // モックに接続
      return "http://localhost:4000";
  }
})();
