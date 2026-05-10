const SuggestedPrompts = ({ prompts, onClick }) => {

  return (
    <div className="flex flex-wrap gap-2 mt-3">

      {prompts.map((prompt, index) => (
        <button
          key={index}
          onClick={() => onClick(prompt)}
          className="px-3 py-2 rounded-full bg-[#1b1b1b] text-white text-xs hover:bg-[#c9a96e] hover:text-black transition-all"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
};

export default SuggestedPrompts;