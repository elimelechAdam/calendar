import axios from "axios";
//backend url
// const BASE_URL = "http://localhost:5050/api"; // Local
const BASE_URL = "https://calendar-y87a.vercel.app/api"; // Production

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

export const updateRequest = async (id, requestStatus) => {
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
