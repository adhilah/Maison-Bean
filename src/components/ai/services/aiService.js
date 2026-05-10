import api from "../../../services/api";

export const aiService = {

  askAI: async (message, conversationId) => {

  const response = await api.post(
    "/chat",
    {
      message,

      conversationId:
        conversationId
          ? conversationId.toString()
          : null,
    }
  );

  return response.data;
},

  getSuggestions: async (prompt) => {

    const response = await api.get(
      `/chat/suggestions?prompt=${prompt}`
    );

    return response.data;
  },

  getConversationHistory: async (
    conversationId
  ) => {

    const response = await api.get(
      `/chat/conversation/${conversationId}`
    );

    return response.data;
  },

  createConversation: async (title) => {

    const response = await api.post(
      "/chat/conversation",
      {
        title,
      }
    );

    return response.data;
  },
};