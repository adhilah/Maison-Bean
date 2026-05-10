import { useState } from "react";
import { aiService } from "../services/aiService";

export const useChat = () => {

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const [conversationId, setConversationId] =
    useState(null);

  const sendMessage = async (message) => {

    try {

      setLoading(true);

      let currentConversationId =
        conversationId;

      if (!currentConversationId) {

        const conversation =
          await aiService.createConversation(
            "Coffee Chat"
     );

        currentConversationId =
          conversation.conversationId;

        setConversationId(
          currentConversationId
        );
      }

      const userMessage = {
        role: "user",
        content: message,
      };

      setMessages((prev) => [
        ...prev,
        userMessage,
      ]);

      const response =
        await aiService.askAI(
          message,
          currentConversationId
        );

      const aiMessage = {
        role: "assistant",
        content: response.response,
        sources: response.sources,
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    sendMessage,
    conversationId,
  };
};