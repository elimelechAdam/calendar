import axios from "axios";

const BASE_URL = "http://localhost:5050/api";

export const getPermissions = async (email) => {
  try {
    const response = await axios.get(`${BASE_URL}/permissions/${email}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getRequests = async (email) => {
  try {
    const response = await axios.get(`${BASE_URL}/requests/${email}`);
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
