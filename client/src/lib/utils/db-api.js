import axios from "axios";

const BASE_URL = "http://localhost:5050/api";

export const getPermissions = async (email, page) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/permissions/${email}?page=${page}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getRequests = async (email, page) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/requests/${email}?page=${page}`
    );
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
