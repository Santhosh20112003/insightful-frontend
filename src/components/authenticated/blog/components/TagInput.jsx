import React, { useEffect } from "react";

const TagInput = ({ tags, setTags }) => {
  const addTags = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "" && tags.length < 5) {
      setTags([...tags, e.target.value.trim()]);
      e.target.value = "";
    } else if (e.key === "Backspace" && e.target.value === "" && tags.length > 0) {
      const newTags = [...tags];
      newTags.pop();
      setTags(newTags);
    }
  };

  const removeTag = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  return (
    <div className="w-[90%] md:max-w-[700px] flex my-3 flex-wrap rounded px-3">
      {tags.map((item, index) => (
        <span key={index} className="flex items-center px-4 py-1 border bg-gray-200 border-gray-300 text-gray-600 font-semibold rounded-full my-2 me-3 ms-0 text-base">
          {item}
          <span onClick={() => removeTag(item)} className="ml-3 mt-0.5 text-gray-500 cursor-pointer">
            <i className="fas fa-times"></i>
          </span>
        </span>
      ))}
      {tags.length < 5 && (
        <input
          type="text"
          onKeyDown={addTags}
          placeholder="Add Up to 5 tags..."
          className="border-none placeholder:text-gray-700 font-semibold flex-1 outline-none p-4 md:p-2 md:ps-2"
        />
      )}
    </div>
  );
};

export default TagInput;