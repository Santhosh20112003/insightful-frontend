import React from "react";

function HandPickLoading({count}) {
  return (
    <div className="mt-3 grid grid-cols-1 gap-4 " >
	{[...Array(count)].map((_, index) => (
      <div key={index} class="mb-5 bg-gray-100 rounded-md p-3 animate-pulse">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-full bg-gray-200"></div>
          <div class="w-1/4 h-4 bg-gray-200 rounded"></div>
        </div>
        <div class="mt-2 w-1/2 h-4 bg-gray-200 rounded"></div>
      </div>
	  ))}
    </div>
  );
}

export default HandPickLoading;
