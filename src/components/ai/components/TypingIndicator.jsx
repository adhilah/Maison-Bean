// const TypingIndicator = () => {

//   return (
//     <div className="flex items-center gap-2 px-4 py-3 bg-[#1b1b1b] rounded-2xl w-fit">

//       <div className="w-2 h-2 bg-[#c9a96e] rounded-full animate-bounce" />

//       <div className="w-2 h-2 bg-[#c9a96e] rounded-full animate-bounce delay-100" />

//       <div className="w-2 h-2 bg-[#c9a96e] rounded-full animate-bounce delay-200" />
//     </div>
//   );
// };

// export default TypingIndicator;



// TypingIndicator.jsx
const TypingIndicator = () => {
  return (
    <div className="self-start flex gap-1.5 items-center px-4 py-3 rounded-[18px] rounded-bl-[4px] border border-[#222] bg-[#1e1c19] animate-fadeUp">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[#8a6e45] animate-bounce"
          style={{ animationDelay: `${i * 0.2}s`, animationDuration: "1.2s" }}
        />
      ))}
    </div>
  );
};

export default TypingIndicator;