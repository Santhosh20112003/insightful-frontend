import React from "react";

function TrendingBlogersLoading({count}) {
  return (
    <div className="grid px-5 lg:px-12 pt-10 pb-12 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
      {[...Array(count)].map((_, index) => (
        <div key={index} class="flex  items-center justify-center md:block animate-pulse">
          <div class="md:h-60 h-auto min-h-md w-full max-w-[500px] bg-gray-200 relative rounded-lg overflow-hidden shadow-lg">
            <div class="w-full h-60 md:h-full bg-gray-300"></div>
            <div class="absolute inset-0 flex flex-col items-center justify-center px-4 py-3">
              <div class="w-14 h-14 rounded-full bg-gray-300 mb-2 md:mb-5"></div>
              <div class="h-4 bg-gray-300 w-1/2 rounded mb-1 md:mb-3"></div>
              <div class="h-4 bg-gray-300 w-3/4 rounded"></div>
              <div class="inline-block h-1 w-10 rounded bg-gray-300 mt-6"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TrendingBlogersLoading;
