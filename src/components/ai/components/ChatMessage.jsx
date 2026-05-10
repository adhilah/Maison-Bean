// const ChatMessage = ({ message }) => {

//   const isUser =
//     message.role === "user";

//   return (
//     <div
//       className={`flex ${
//         isUser
//           ? "justify-end"
//           : "justify-start"
//       }`}
//     >
//       <div
//         className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-lg ${
//           isUser
//             ? "bg-[#c9a96e] text-black rounded-br-sm"
//             : "bg-[#1b1b1b] text-white rounded-bl-sm"
//         }`}
//       >
//         <p>{message.content}</p>

//         {message.sources && (
//           <div className="mt-3 flex flex-wrap gap-2">
//             {message.sources.map(
//               (source, index) => (
//                 <span
//                   key={index}
//                   className="text-[10px] px-2 py-1 bg-black/20 rounded-full"
//                 >
//                   {source}
//                 </span>
//               )
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatMessage;




// ChatMessage.jsx
const ChatMessage = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex flex-col max-w-[82%] animate-fadeUp ${isUser ? "self-end items-end" : "self-start items-start"}`}>
      <div
        className={`px-[15px] py-[11px] text-[13.5px] leading-relaxed ${
          isUser
            ? "bg-[#c9a96e] text-[#1a0e00] rounded-[18px] rounded-br-[4px]"
            : "bg-[#1e1c19] text-[#f0ece4] border border-[#222] rounded-[18px] rounded-bl-[4px]"
        }`}
      >
        {message.content}
      </div>
      {message.time && (
        <span className="text-[10px] text-[#8a8680] mt-1 px-1">{message.time}</span>
      )}
    </div>
  );
};

export default ChatMessage;
