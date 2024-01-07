export const config = {
  // f4bcd30f-08e3-46e8-a00e-4a161a23b8ca
  // appId: "61fc7fce-34de-489f-a3ea-8138cbaf26fb",
  appId: "7c1c570a-146e-44cf-b715-ecc470c6436c",
  redirectUri: "http://localhost:5173",
  scopes: [
    "user.read",
    // "User.ReadBasic.All",
    // "Mail.Send",
    // "Mail.Read",
    // "MailboxSettings.ReadWrite",
    // "MailboxSettings.Read",
    "Calendars.ReadWrite",
    // "Calendars.Read.Shared",
  ],
};

export const msalConfig = {
  auth: {
    clientId: config.appId,
    redirectUri: config.redirectUri,
  },
};
