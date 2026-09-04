import { apiClient } from './apiClient';

export const chatApi = {
  // POST /api/chat
  // Live Gemini AI Controller: chat in chatController.js
  // Body: { message }
  // Returns: { success: true, answer }
  sendMessage: async (message) => {
    return await apiClient.post('/chat', { message });
  },

  // Live Gemini AI Assistant
  askAi: async (prompt) => {
    return await apiClient.post('/chat', { message: prompt });
  },
};

export default chatApi;
