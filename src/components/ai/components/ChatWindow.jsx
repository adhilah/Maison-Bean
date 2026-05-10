// ChatWindow.jsx
import { useRef, useEffect } from "react";
import { useAI } from "../context/AIContext";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";

const CHIPS = [
  "What cold coffees do you offer?",
  "Tell me about your croissants",
  "Flat white vs latte?",
  "Recommend something for a rainy afternoon",
];

function CoffeeIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M6 14h24v2c0 6.627-5.373 12-12 12S6 22.627 6 16v-2z" stroke="#8a6e45" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M30 16h2a4 4 0 0 1 0 8h-2" stroke="#8a6e45" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 10c0-2 1.5-2 1.5-4M18 10c0-2 1.5-2 1.5-4M23 10c0-2 1.5-2 1.5-4" stroke="#8a6e45" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const ChatWindow = ({ onClose }) => {
  const { messages, loading, sendMessage } = useAI();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="fixed bottom-24 right-6 z-50 w-[390px] h-[620px] bg-[#111111] border border-[#2b2b2b] rounded-3xl shadow-2xl overflow-hidden flex flex-col">

      {/* Header */}
      <div className="bg-[#c9a96e] px-5 py-[18px] flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div
            className="w-[38px] h-[38px] bg-[#7a5c2e] rounded-full flex items-center justify-center text-base text-[#f5e8c8] italic flex-shrink-0"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            M
          </div>
          <div>
            <h2
              className="text-[17px] font-medium text-[#1a1000] leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Maison Bean AI
            </h2>
            <p className="text-[11px] text-[#5c3d0e] mt-0.5 tracking-wide">
              Your personal coffee guide ✦
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-[18px] text-[#3a2000] opacity-70 hover:opacity-100 hover:rotate-90 transition-all duration-300 leading-none bg-transparent border-none cursor-pointer"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-[#080808]">

        {/* Empty state */}
        {messages.length === 0 && !loading && (
          <div className="m-auto text-center text-[#8a8680]">
            <div className="flex justify-center mb-3 opacity-60">
              <CoffeeIcon />
            </div>
            <p
              className="text-[13px] leading-relaxed italic"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Ask me anything about our menu,<br />
              brewing methods, or the perfect pairing.
            </p>
            <div className="flex flex-wrap gap-1.5 justify-center mt-3.5">
              {CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => sendMessage(chip)}
                  className="bg-[#1a1a1a] border border-[#2e2b26] rounded-full px-3.5 py-1.5 text-[11.5px] text-[#c9a96e] hover:bg-[#252218] hover:border-[#8a6e45] transition-all duration-200 cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}

        {loading && <TypingIndicator />}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={sendMessage} />
    </div>
  );
};

export default ChatWindow;