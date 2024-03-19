import { client } from "../../App";

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
    console.log("result: ", result);
    return result;
  } catch (error) {
    console.error("Error granting calendar permissions", error);
    throw error;
  }
};

export const sendMail = async (emailDetails) => {
  console.log(emailDetails);
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

    const filteredPermissions = await permissions.value.filter(
      (permission) => permission.role !== "freeBusyRead"
    );

    return filteredPermissions;
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
export const getAllUsers = async () => {
  let users = [];
  try {
    let response = await client.api("/users").get();
    users = users.concat(response.value);

    // Loop through each page of users
    while (response["@odata.nextLink"]) {
      response = await client.api(response["@odata.nextLink"]).get();
      users = users.concat(response.value);
    }
    console.log(users);
  } catch (error) {
    console.error("Error fetching users:", error);
  }

  return users;
};
export const searchUser = async (searchTerm) => {
  try {
    //search by email or name
    // =startswith(displayName,'${searchTerm}') or
    const response = await client
      // .api(`/users?$filter=startswith(mail,'${searchTerm}')`)
      .api(
        `/users?$filter=startswith(mail,'${encodeURIComponent(
          searchTerm
        )}') or startswith(displayName,'${encodeURIComponent(searchTerm)}')`
      )
      .get();
    return response.value;
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
};
