// src/api/projectsAPI.js

import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/projects`;

/**
 * Fetch all projects from the backend.
 */
export const getAllProjects = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
