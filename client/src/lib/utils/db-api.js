import axios from "axios";
//backend url
const BASE_URL = "http://localhost:5050/api"; // Local
// const BASE_URL = "https://calendar-y87a.vercel.app/api"; // Production

export const getPermissions = async (email, activeTab, page, searchTerm) => {
  try {
    const queryString = `status=${activeTab}&page=${page}&search=${searchTerm}`;
    const url = `${BASE_URL}/permissions/${email}?${queryString}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching permissions:", error);
    throw error;
  }
};

export const getRequests = async (email, activeTab, page, searchTerm) => {
  try {
    const queryString = `status=${activeTab}&page=${page}&search=${searchTerm}`;
    const url = `${BASE_URL}/requests/${email}?${queryString}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createRequest = async (email, request) => {
  try {
    const response = await axios.post(`${BASE_URL}/requests/${email}`, request);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Should change to update permission
export const updateRequest = async (id, requestStatus) => {
  console.log(`requestStatus`, requestStatus);
  try {
    const response = await axios.put(`${BASE_URL}/permissions/${id}`, {
      requestStatus,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Should change to update request
export const updatePermission = async (id, requestType) => {
  console.log("updatePermission", id, requestType);
  try {
    const response = await axios.put(`${BASE_URL}/permissions/calendar/${id}`, {
      requestType,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createPermission = async (email, permission) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/permissions/${email}`,
      permission
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const removePermission = async ({ address, email }) => {
  console.log("removePermission", address, email);
  try {
    const response = await axios.delete(`${BASE_URL}/permissions/delete`, {
      data: { owner: email, permissionGranted: address }, // Wrap the email in a data object
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
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
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
