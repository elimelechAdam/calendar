import axios from "axios";
//backend url
// const BASE_URL = "http://localhost:5050/api"; // Local
const BASE_URL = "https://calendar-y87a.vercel.app/api"; // Production

export const getPermissions = async (email, activeTab, page, searchTerm) => {
  try {
    const queryString = `status=${activeTab}&page=${page}&search=${searchTerm}`;
    const url = `${BASE_URL}/permissions/${email}?${queryString}`;
    const response = await axios.get(url);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(
        "Failed to fetch permissions. Server returned status: " +
          response.status
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Server responded with non-success status:",
        error.response.status
      );
      console.error("Response data:", error.response.data);
    } else {
      console.error("Error fetching permissions:", error.message);
    }

    throw error;
  }
};

export const getRequests = async (email, activeTab, page, searchTerm) => {
  try {
    const queryString = `status=${activeTab}&page=${page}&search=${searchTerm}`;
    const url = `${BASE_URL}/requests/${email}?${queryString}`;
    const response = await axios.get(url);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(
        "Failed to fetch requests. Server returned status: " + response.status
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Server responded with non-success status:",
        error.response.status
      );
      console.error("Response data:", error.response.data);
    } else {
      console.error("Error fetching requests:", error.message);
    }
    throw error;
  }
};

export const createRequest = async (email, request) => {
  try {
    const response = await axios.post(`${BASE_URL}/requests/${email}`, request);

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error(
        "Failed to create request. Server returned status: " + response.status
      );
    }
  } catch (error) {
    if (error.response) {
      console.error(
        "Server responded with non-success status:",
        error.response.status
      );
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }

    throw error;
  }
};

// Should change to update permission
export const updateRequest = async (id, requestStatus) => {
  try {
    const response = await axios.put(`${BASE_URL}/permissions/${id}`, {
      requestStatus,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(
        "Failed to update request. Server returned status: " + response.status
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Server responded with non-success status:",
        error.response.status
      );
      console.error("Response data:", error.response.data);
    } else {
      console.error("Error updating request:", error.message);
    }

    throw error;
  }
};

// Should change to update request
export const updatePermission = async (id, requestType) => {
  try {
    const response = await axios.put(`${BASE_URL}/permissions/calendar/${id}`, {
      requestType,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(
        "Failed to update permission. Server returned status: " +
          response.status
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Server responded with non-success status:",
        error.response.status
      );
      console.error("Response data:", error.response.data);
    } else {
      console.error("Error updating permission:", error.message);
    }

    throw error;
  }
};

export const createPermission = async (email, permission) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/permissions/${email}`,
      permission
    );

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error(
        "Failed to create permission. Server returned status: " +
          response.status
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Server responded with non-success status:",
        error.response.status
      );
      console.error("Response data:", error.response.data);
    } else {
      console.error("Error creating permission:", error.message);
    }

    throw error;
  }
};

export const removePermission = async ({ address, email }) => {
  try {
    const response = await axios.delete(`${BASE_URL}/permissions/delete`, {
      data: { owner: email, permissionGranted: address }, // Wrap the email in a data object
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(
        "Failed to remove permission. Server returned status: " +
          response.status
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Server responded with non-success status:",
        error.response.status
      );
      console.error("Response data:", error.response.data);
    } else {
      console.error("Error removing permission:", error.message);
    }

    throw error;
  }
};

export const searchPermissions = async (email, searchTerms) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/permissions/search/${email}?search=${searchTerms}`
    );
    console.log("response", response);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getNotifications = async (email) => {
  try {
    const response = await axios.get(`${BASE_URL}/notifications/${email}`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(
        "Failed to fetch notifications. Server returned status: " +
          response.status
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Server responded with non-success status:",
        error.response.status
      );
      console.error("Response data:", error.response.data);
    } else {
      console.error("Error fetching notifications:", error.message);
    }

    throw error;
  }
};

export const deleteAllNotifications = async (email) => {
  try {
    const response = await axios.delete(`${BASE_URL}/notifications/${email}`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(
        "Failed to delete notifications. Server returned status: " +
          response.status
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Server responded with non-success status:",
        error.response.status
      );
      console.error("Response data:", error.response.data);
    } else {
      console.error("Error deleting notifications:", error.message);
    }

    throw error;
  }
};
