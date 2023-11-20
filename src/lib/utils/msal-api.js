import { Client } from "@microsoft/microsoft-graph-client";

let graphClient = null;

const ensureClient = async (authProvider) => {
  if (!graphClient) {
    graphClient = Client.initWithMiddleware({
      authProvider: authProvider,
    });
  }
  return graphClient;
};

export const getUserDetails = async (authProvider) => {
  try {
    const client = await ensureClient(authProvider);
    const user = await client.api("/me").get();
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const grantCalendarAccess = async (
  authProvider,
  userId,
  email,
  role
) => {
  try {
    const client = await ensureClient(authProvider);
    const request = {
      grantedToId: userId,
      grantedToEmail: email,
      role: role,
    };
    const response = await client
      .api(`/me/calendar/calendarPermissions`)
      .post(request);
    return response;
  } catch (error) {
    console.error("Error fetching calendar permissions", error);
    throw error;
  }
};

export const getCalendarPermissions = async (authProvider) => {
  try {
    const client = await ensureClient(authProvider);
    const response = await client.api(`/me/calendar/calendarPermissions`).get();
    return response;
  } catch (error) {
    console.error("Error fetching calendar permissions", error);
    throw error;
  }
};

export const sendMail = async (authProvider, emailDetails) => {
  const email = {
    message: {
      subject: emailDetails.subject,
      body: {
        contentType: "Text",
        content: emailDetails.body,
      },
      toRecipients: [
        {
          emailAddress: {
            address: emailDetails.to,
          },
        },
      ],
    },
    saveToSentItems: "true",
  };
  try {
    const client = await ensureClient(authProvider);
    const response = await client.api("/me/sendMail").post(email);
    return response;
  } catch (error) {
    console.error("Error sending email", error);
    throw error;
  }
};
