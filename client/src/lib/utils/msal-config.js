export const config = {
  appId: "61fc7fce-34de-489f-a3ea-8138cbaf26fb",
  redirectUri: "http://localhost:5173",
  scopes: [
    "user.read",
    // "User.ReadBasic.All",
    "Mail.Send",
    "Mail.Read",
    "MailboxSettings.ReadWrite",
    "MailboxSettings.Read",
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
