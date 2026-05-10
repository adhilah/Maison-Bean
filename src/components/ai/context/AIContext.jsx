import {
  createContext,
  useContext,
} from "react";

import { useChat } from "../hooks/useChat";

const AIContext = createContext(null);

export const AIProvider = ({ children }) => {

  const chat = useChat();

  return (
    <AIContext.Provider value={chat}>
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {

  const context = useContext(AIContext);

  if (!context) {
    throw new Error(
      "useAI must be used within AIProvider"
    );
  }

  return context;
};