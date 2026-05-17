import { useState } from "react";
import ChatWindow from "./ChatWindow";

const ChatIcon = () => (
  <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
    <path
      d="M6 14h24v2c0 6.627-5.373 12-12 12S6 22.627 6 16v-2z"
      stroke="#1a0e00"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M30 16h2a4 4 0 0 1 0 8h-2"
      stroke="#1a0e00"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M13 10c0-2 1.5-2 1.5-4M18 10c0-2 1.5-2 1.5-4M23 10c0-2 1.5-2 1.5-4"
      stroke="#1a0e00"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a0e00" strokeWidth="2.2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChatWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[#c9a96e] shadow-2xl hover:scale-105 hover:bg-[#e2c99a] transition-all duration-300 flex items-center justify-center"
      >
        {open ? <CloseIcon /> : <ChatIcon />}
      </button>

      {open && <ChatWindow onClose={() => setOpen(false)} />}
    </>
  );
};

export default ChatWidget;