import React from "react";

function BlogLoading({ count }) {
  return (
    <div className=" mt-5 grid grid-cols-1 md:grid-cols-2 gap-6 ">
      {[...Array(count)].map((_, index) => (
        <div key={index} class=" bg-white rounded overflow-hidden shadow-lg flex flex-col animate-pulse">
          <div class="w-full h-48 relative bg-gray-200 rounded-t"></div>
          <div class="flex items-center px-5 pt-3 space-x-2">
            <div class="w-11 h-11 bg-gray-300 rounded-full"></div>
            <div class="flex flex-col items-start justify-center">
              <div class="h-5 w-3/4 bg-gray-200 rounded"></div>
              <div class="h-4 w-1/4 bg-gray-200 rounded mt-1"></div>
            </div>
          </div>
          <div class="px-6 py-4">
            <div class="font-bold text-lg h-5 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div class="text-gray-700 text-sm h-5 bg-gray-200 rounded w-full mb-2"></div>
            <div class="text-gray-700 text-sm h-5 bg-gray-200 rounded w-2/3"></div>
            <div class="text-gray-700 text-sm h-5 bg-gray-200 rounded w-1/2"></div>
            <div class="text-gray-700 text-sm h-5 bg-gray-200 rounded w-1/3 mt-1"></div>
            <div class="flex items-center flex-wrap justify-start mt-3 gap-3">
              <div class="flex items-center flex-wrap gap-3">
                <div class="text-xs px-3 h-6 bg-gray-200 rounded-full w-24 mt-1"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BlogLoading;
