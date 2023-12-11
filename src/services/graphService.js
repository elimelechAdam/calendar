import { Client } from "@microsoft/microsoft-graph-client";
// import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
// import { endOfWeek, startOfWeek } from "date-fns";
// import { zonedTimeToUtc } from "date-fns-tz";
// import { User, Event } from "@microsoft/microsoft-graph-types";

import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";

let graphClient = undefined;

function ensureClient(authProvider) {
  if (!graphClient) {
    graphClient = Client.initWithMiddleware({
      authProvider: authProvider,
    });
  }

  return graphClient;
}

export async function getUser(authProvider) {
  ensureClient(authProvider);

  // Return the /me API endpoint result as a User object
  const user = await graphClient
    .api("/me")
    // Only retrieve the specific fields needed
    .get();
  return user;
}

export async function grantCalendarAccess(
  authProvider,
  userId,
  userEmail,
  role
) {
  ensureClient(authProvider);

  const permission = {
    emailAddress: {
      address: userEmail,
      name: userEmail,
    },
    isInsideOrganization: true,
    isRemovable: true,
    role: role, // e.g., "write" or "read"
    allowedRoles: ["none", "freeBusyRead", "limitedRead", "read", "write"],
  };

  const result = await graphClient
    .api(`/users/${userId}/calendar/calendarPermissions`)
    .post(permission);

  return result;
}

// Get Calendar Permissions
export async function getCalendarPermissions(authProvider) {
  ensureClient(authProvider);
  try {
    const permissions = await graphClient
      .api("/me/calendar/calendarPermissions")
      .get();

    return permissions.value; // This will be an array of permission objects
  } catch (error) {
    console.error("Error fetching calendar permissions", error);
    throw error;
  }
}

export async function sendEmail(authProvider, emailDetails) {
  ensureClient(authProvider);

  // Correctly structure the email message according to Graph API expectations
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

  // Send the email
  try {
    await graphClient
      .api("/me/sendMail")
      .post({ message: email.message, saveToSentItems: email.saveToSentItems });
  } catch (error) {
    console.error("Error sending email", error);
    throw error;
  }
}
export async function getAllUsersEmails(authProvider) {
  ensureClient(authProvider);

  try {
    const users = await graphClient.api("/users").get();

    return users; // Extracting the email addresses from the response
  } catch (error) {
    console.error("Error fetching users' emails", error);
    throw error;
  }
}
