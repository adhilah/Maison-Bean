// // ChatWindow.jsx
// import { useRef, useEffect } from "react";
// import { useAI } from "../context/AIContext";
// import ChatMessage from "./ChatMessage";
// import ChatInput from "./ChatInput";
// import TypingIndicator from "./TypingIndicator";

// const CHIPS = [
//   "What cold coffees do you offer?",
//   "Tell me about your croissants",
//   "Flat white vs latte?",
//   "Recommend something for a rainy afternoon",
// ];

// function CoffeeIcon() {
//   return (
//     <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
//       <path d="M6 14h24v2c0 6.627-5.373 12-12 12S6 22.627 6 16v-2z" stroke="#8a6e45" strokeWidth="1.5" strokeLinejoin="round" />
//       <path d="M30 16h2a4 4 0 0 1 0 8h-2" stroke="#8a6e45" strokeWidth="1.5" strokeLinecap="round" />
//       <path d="M13 10c0-2 1.5-2 1.5-4M18 10c0-2 1.5-2 1.5-4M23 10c0-2 1.5-2 1.5-4" stroke="#8a6e45" strokeWidth="1.5" strokeLinecap="round" />
//     </svg>
//   );
// }

// const ChatWindow = ({ onClose }) => {
//   const { messages, loading, sendMessage } = useAI();
//   const bottomRef = useRef(null);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, loading]);

//   return (
//     <div className="fixed bottom-24 right-6 z-50 w-[390px] h-[620px] bg-[#111111] border border-[#2b2b2b] rounded-3xl shadow-2xl overflow-hidden flex flex-col">

//       {/* Header */}
//       <div className="bg-[#c9a96e] px-5 py-[18px] flex items-center justify-between flex-shrink-0">
//         <div className="flex items-center gap-3">
//           <div
//             className="w-[38px] h-[38px] bg-[#7a5c2e] rounded-full flex items-center justify-center text-base text-[#f5e8c8] italic flex-shrink-0"
//             style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
//           >
//             M
//           </div>
//           <div>
//             <h2
//               className="text-[17px] font-medium text-[#1a1000] leading-tight"
//               style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
//             >
//               Maison Bean AI
//             </h2>
//             <p className="text-[11px] text-[#5c3d0e] mt-0.5 tracking-wide">
//               Your personal coffee guide ✦
//             </p>
//           </div>
//         </div>
//         <button
//           onClick={onClose}
//           className="text-[18px] text-[#3a2000] opacity-70 hover:opacity-100 hover:rotate-90 transition-all duration-300 leading-none bg-transparent border-none cursor-pointer"
//         >
//           ✕
//         </button>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-[#080808]">

//         {/* Empty state */}
//         {messages.length === 0 && !loading && (
//           <div className="m-auto text-center text-[#8a8680]">
//             <div className="flex justify-center mb-3 opacity-60">
//               <CoffeeIcon />
//             </div>
//             <p
//               className="text-[13px] leading-relaxed italic"
//               style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
//             >
//               Ask me anything about our menu,<br />
//               brewing methods, or the perfect pairing.
//             </p>
//             <div className="flex flex-wrap gap-1.5 justify-center mt-3.5">
//               {CHIPS.map((chip) => (
//                 <button
//                   key={chip}
//                   onClick={() => sendMessage(chip)}
//                   className="bg-[#1a1a1a] border border-[#2e2b26] rounded-full px-3.5 py-1.5 text-[11.5px] text-[#c9a96e] hover:bg-[#252218] hover:border-[#8a6e45] transition-all duration-200 cursor-pointer"
//                 >
//                   {chip}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Messages */}
//         {messages.map((msg, index) => (
//           <ChatMessage key={index} message={msg} />
//         ))}

//         {loading && <TypingIndicator />}

//         <div ref={bottomRef} />
//       </div>

//       {/* Input */}
//       <ChatInput onSend={sendMessage} />
//     </div>
//   );
// };

// export default ChatWindow;



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

const CoffeeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
    <path d="M6 14h24v2c0 6.627-5.373 12-12 12S6 22.627 6 16v-2z" stroke="#c9a96e" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M30 16h2a4 4 0 0 1 0 8h-2" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M13 10c0-2 1.5-2 1.5-4M18 10c0-2 1.5-2 1.5-4M23 10c0-2 1.5-2 1.5-4" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SendIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const ChatWindow = ({ onClose }) => {
  const { messages, loading, sendMessage } = useAI();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');

        /* ── Position: fixed, below navbar (top: 64px), above FAB (bottom: 90px) ── */
        .cw-window {
          position: fixed;
          /* 64px = typical navbar height — adjust if yours differs */
          top: 64px;
          bottom: 90px;
          right: 20px;
          width: 360px;
          z-index: 45;               /* below navbar z-40 but above page content */
          display: flex;
          flex-direction: column;
          background: #0d0a05;
          border: 1px solid rgba(201,169,110,0.18);
          box-shadow: 0 32px 80px rgba(0,0,0,0.75), 0 0 0 1px rgba(201,169,110,0.06);
          animation: cwSlideIn 0.35s cubic-bezier(0.16,1,0.3,1) forwards;
          overflow: hidden;
          min-height: 0;
        }

        /* Mobile: full width, no gap at sides */
        @media (max-width: 480px) {
          .cw-window {
            right: 0;
            left: 0;
            width: 100%;
            top: 56px;
            bottom: 80px;
            border-left: none;
            border-right: none;
          }
        }

        @keyframes cwSlideIn {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)     scale(1);    }
        }

        /* Messages scroll */
        .cw-msgs::-webkit-scrollbar { width: 3px; }
        .cw-msgs::-webkit-scrollbar-track { background: transparent; }
        .cw-msgs::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.18); }

        /* Chip buttons */
        .cw-chip {
          background: transparent;
          border: 1px solid rgba(201,169,110,0.18);
          color: rgba(201,169,110,0.65);
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          letter-spacing: 0.15em;
          padding: 5px 12px;
          cursor: pointer;
          transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
          white-space: nowrap;
        }
        .cw-chip:hover {
          border-color: rgba(201,169,110,0.45);
          color: #c9a96e;
          background: rgba(201,169,110,0.05);
        }
      `}</style>

      <div className="cw-window" style={{ fontFamily: "'Jost', sans-serif" }}>

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#c9a96e]/15 bg-[#110d07] flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-8 h-8 border border-[#c9a96e]/25 bg-[#c9a96e]/08 flex items-center justify-center flex-shrink-0">
              <span
                className="text-[#c9a96e] font-light italic"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}
              >
                M
              </span>
            </div>
            <div>
              <h2
                className="text-[#f5f0e8] font-light leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem" }}
              >
                Maison Bean <span className="italic text-[#c9a96e]">AI</span>
              </h2>
              <p className="text-[#c9a96e]/40 text-[9px] tracking-[0.35em] uppercase mt-0.5">
                Your coffee guide ✦
              </p>
            </div>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center border border-[#c9a96e]/15 text-[#f5f0e8]/35 hover:text-[#c9a96e] hover:border-[#c9a96e]/40 transition-all duration-200"
            aria-label="Close chat"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Gold rule */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#c9a96e]/25 to-transparent flex-shrink-0" />

        {/* ── Messages ── */}
        <div className="cw-msgs flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-[#0d0a05] min-h-0">

          {/* Empty state */}
          {messages.length === 0 && !loading && (
            <div className="m-auto text-center px-2">
              <div className="flex justify-center mb-4 opacity-60">
                <CoffeeIcon />
              </div>
              <p
                className="text-[#f5f0e8]/35 text-[13px] font-light italic leading-relaxed mb-5"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Ask me anything about our menu,<br />
                brewing methods, or the perfect pairing.
              </p>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {CHIPS.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => sendMessage(chip)}
                    className="cw-chip"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg, i) => (
            <ChatMessage key={i} message={msg} />
          ))}

          {loading && <TypingIndicator />}

          <div ref={bottomRef} />
        </div>

        {/* ── Input ── */}
        <div className="flex-shrink-0 border-t border-[#c9a96e]/12 bg-[#110d07]">
          <ChatInput onSend={sendMessage} />
        </div>
      </div>
    </>
  );
};

export default ChatWindow;