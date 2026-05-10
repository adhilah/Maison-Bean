// import { useState } from "react";

// const ChatInput = ({ onSend }) => {

//   const [message, setMessage] =
//     useState("");

//   const handleSubmit = (e) => {

//     e.preventDefault();

//     if (!message.trim()) return;

//     onSend(message);

//     setMessage("");
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="p-3 border-t border-[#2a2a2a] bg-[#111111] flex items-center gap-3"
//     >
//       <input
//         type="text"
//         value={message}
//         onChange={(e) =>
//           setMessage(e.target.value)
//         }
//         placeholder="Ask about coffee..."
//         className="flex-1 bg-[#1b1b1b] text-white px-4 py-3 rounded-xl outline-none border border-[#2f2f2f] focus:border-[#c9a96e]"
//       />

//       <button
//         type="submit"
//         className="px-5 py-3 rounded-xl bg-[#c9a96e] text-black font-medium hover:opacity-90 transition-all"
//       >
//         Send
//       </button>
//     </form>
//   );
// };

// export default ChatInput;




// ChatInput.jsx
import { useState, useRef } from "react";

const SendIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input.trim());
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleResize = (e) => {
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 100) + "px";
  };

  return (
    <div className="bg-[#0f0f0f] border-t border-[#2b2b2b] px-3.5 py-3 flex items-end gap-2.5 flex-shrink-0">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => { setInput(e.target.value); handleResize(e); }}
        onKeyDown={handleKey}
        placeholder="Ask about our menu…"
        rows={1}
        className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-[14px] px-3.5 py-2.5 text-[13.5px] text-[#f0ece4] placeholder-[#4a4742] outline-none resize-none min-h-[40px] max-h-[100px] leading-relaxed focus:border-[#3d3428] transition-colors duration-200"
      />
      <button
        onClick={handleSend}
        disabled={!input.trim()}
        className="w-10 h-10 rounded-xl bg-[#c9a96e] flex items-center justify-center text-[#1a0e00] flex-shrink-0 hover:bg-[#e2c99a] hover:scale-105 disabled:bg-[#3a3028] disabled:text-[#5a5248] disabled:cursor-not-allowed disabled:scale-100 transition-all duration-200 border-none cursor-pointer"
      >
        <SendIcon />
      </button>
    </div>
  );
};

export default ChatInput;