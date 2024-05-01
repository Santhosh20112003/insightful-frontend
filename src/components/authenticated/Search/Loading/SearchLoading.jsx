import React from "react";

function SearchLoading({ count }) {
  return (
    <div className="flex flex-col lg:mr-12 mt-3 items-center justify-center gap-12">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="w-[90vw] md:w-[50vw] rounded overflow-hidden flex shadow-lg flex-col-reverse lg:flex-row animate-pulse"
        >
          <div className="px-6 py-4 w-full">
            <div className="flex items-center justify-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gray-200"></div>
              <div className="w-24 h-4 bg-gray-200"></div>
            </div>
            <div className="h-4 bg-gray-200 w-[80%] mb-2"></div>
            <div className="h-4 bg-gray-200 w-[80%]"></div>
            <div className="flex items-center gap-3 mt-3">
              <div className="w-12 h-4 bg-gray-200"></div>
              <div className="h-4 bg-gray-200 w-1/4"></div>
            </div>
          </div>
          <div class="lg:w-2/5 w-full h-24 lg:h-40 bg-gray-200"></div>
        </div>
      ))}
    </div>
  );
}

export default SearchLoading;
