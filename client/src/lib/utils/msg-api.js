import { client } from "../../App";

export const getUserDetails = async () => {
  try {
    const user = await client.api("/me").get();
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Will be used in the future
// To get all users - need admin consent for that
export const getUsersDetails = async () => {
  console.log("getUsersDetails");
  try {
    let users = await client.api("/users").get();
    console.log(users);
    return users;
  } catch (error) {
    console.log("getUsersDetails error: ", error);
    throw error;
  }
};

export const grantCalendarPermissions = async ({ email, userId, role }) => {
  const permissions = {
    emailAddress: {
      address: email,
      name: email,
    },
    isInsideOrganization: true,
    isRemovable: true,
    role: role,
    allowedRoles: ["none", "freeBusyRead", "limitedRead", "read", "write"],
  };
  try {
    const result = await client
      .api(`/users/${userId}/calendar/calendarPermissions`)
      .post(permissions);
    return result;
  } catch (error) {
    console.error("Error granting calendar permissions", error);
    throw error;
  }
};

export const sendMail = async (emailDetails) => {
  const email = {
    message: {
      subject: emailDetails.subject,
      body: {
        contentType: "HTML",
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
    const response = await client.api("/me/sendMail").post(email);
    return response;
  } catch (error) {
    console.error("Error sending email", error);
    throw error;
  }
};

export const getCalendarPermissions = async () => {
  try {
    const permissions = await client
      .api("/me/calendar/calendarPermissions")
      .get();

    return permissions.value;
  } catch (error) {
    console.error("Error fetching calendar permissions", error);
    throw error;
  }
};

export const getCalendar = async () => {
  try {
    const calendar = await client.api("me/calendar/events").get();
    return calendar;
  } catch (error) {
    console.error("Error fetching calendar", error);
    throw error;
  }
};

// no permissions yet
export const getAllUsers = async () => {
  try {
    const users = await client.api("/users").get();
    return users;
  } catch (error) {
    console.error("Error fetching users", error);
    throw error;
  }
};
