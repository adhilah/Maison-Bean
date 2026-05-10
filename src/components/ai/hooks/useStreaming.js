import { useState } from "react";

export const useStreaming = () => {

  const [streaming, setStreaming] =
    useState(false);

  return {
    streaming,
    setStreaming,
  };
};