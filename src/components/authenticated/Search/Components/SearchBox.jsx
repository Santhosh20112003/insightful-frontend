import React from "react";

function SearchBox({ searchterm, handleChange, placeholder }) {
  return (
    <div className="lg:p-4  container">
      <div className="flex items-center p-4 m-4 lg:m-0 border border-gray-300 rounded-lg bg-gray-50 focus:ring-violet-500 focus:border-violet-500">
        <div className="flex items-center pe-3">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          autoComplete="off"
          autoCorrect="off"
          className="block w-full bg-gray-50 text-sm focus:outline-none"
          placeholder={`Search By ${placeholder}...`}
          value={searchterm}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default SearchBox;
