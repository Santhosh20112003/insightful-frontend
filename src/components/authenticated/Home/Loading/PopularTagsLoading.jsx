import React from "react";

function PopularTagsLoading({ count }) {
  return (
    <div className="mt-3 flex items-center flex-wrap gap-4 ">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          class="mb-5 w-24 bg-gray-100  rounded-full py-3 px-5 animate-pulse"
        >
          <div class=" h-5 bg-gray-200 rounded-full w-full"></div>
        </div>
      ))}
    </div>
  );
}

export default PopularTagsLoading;
