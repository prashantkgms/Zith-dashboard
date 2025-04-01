import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Get all posts
export const getPosts = async () => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data;
};

// Create a new post
export const createPost = async (postData) => {
  const response = await axios.post(`${API_URL}/posts`, postData);
  return response.data;
};

// Update a post
export const updatePost = async (id, postData) => {
  const response = await axios.put(`${API_URL}/posts/${id}`, postData);
  return response.data;
};

// Delete a post
export const deletePost = async (id) => {
  const response = await axios.delete(`${API_URL}/posts/${id}`);
  return response.data;
};

