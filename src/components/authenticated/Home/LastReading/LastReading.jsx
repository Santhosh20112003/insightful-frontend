import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDetails } from "../../../../utils/Context/MetaDetails";

function LastReading() {
  const { setLastView, LastView } = useDetails();
  const [blogDetail, setBlogDetail] = useState({});
  const FetchLastReading = () => {
    window.localStorage.getItem("lastviewed")
      ? setBlogDetail(JSON.parse(window.localStorage.getItem("lastviewed")))
      : setBlogDetail({});
  };

  useEffect(() => {
    FetchLastReading();
  }, []);

  return (
    <div className="fixed bottom-5 z-[100000] left-5">
      {LastView && Object.keys(blogDetail).length !== 0 && (
        <div className="lg:w-auto max-w-[400px] w-fit me-5 bg-white focus:outline-none rounded-md overflow-hidden flex shadow-2xl flex-col-reverse lg:flex-row ">
          <Link to={`/blogs/${btoa(blogDetail.blogid)}`} className="p-4">
            <h1 className="text-base mb-1">Continue Reading</h1>
            <h2 className="font-semibold w-fit break-words text-sm lg:text-lg mb-2">
              {blogDetail.title.length > 50
                ? `${blogDetail.title.slice(0, 50)}..`
                : blogDetail.title}
            </h2>
          </Link>

          <div className="lg:w-52 lg:h-40 relative w-full h-24">
            <img
              src={blogDetail?.image}
              alt={blogDetail?.title}
              loading="lazy"
              className="w-full h-full object-cover brightness-90"
            />
            <button
              onClick={() => {
                setLastView(!LastView);
              }}
              className="absolute top-2 bg-[#21212180] active:bg-gray-600 active:scale-90 transition-all p-1 rounded-full right-2 text-gray-50 hover:text-white focus:outline-none"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LastReading;
