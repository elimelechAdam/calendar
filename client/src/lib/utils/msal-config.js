export const config = {
  appId: "7c1c570a-146e-44cf-b715-ecc470c6436c",
  redirectUri: import.meta.env.VITE_REDIRECT_URL,
  scopes: ["User.Read", "User.Read.All", "Calendars.ReadWrite"],
};

export const msalConfig = {
  auth: {
    clientId: config.appId,
    redirectUri: config.redirectUri,
  },
  cache: {
    cacheLocation: "localStorage", // This sets the cache location to localStorage
    storeAuthStateInCookie: true, // Set to true for IE11 or Edge
  },
};
