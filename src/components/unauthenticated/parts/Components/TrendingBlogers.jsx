import React from "react";
import { Link } from "react-router-dom";
import { blog_img_link } from "../../../../common/links";

function TrendingBlogers({ details, index }) {
  return (
    <Link to={`/comradeprofile/${btoa(details.uid)}`} className="flex items-center justify-center md:block" key={index}>
      <div className="md:h-60 h-auto min-h-md w-full max-w-[500px] bg-gray-100 relative rounded-lg overflow-hidden shadow-lg">
	  
        <img
          src={`${blog_img_link}?${details.designation}`}
          alt="banner"
          className="w-full h-60 md:h-full object-cover relative brightness-90"
        />
        <span className="absolute inset-0 flex flex-col items-center justify-center px-4 py-3 bg-black bg-opacity-50 text-gray-50">
		
          <img
            src={details.photourl}
            alt={details.name}
            className="w-14 h-14 rounded-full shadow-lg mb-2 md:mb-5"
          />
		  
          <h1 className="text-lg md:text-xl break-all font-semibold mb-1 md:mb-3">{details.name}</h1>
          <p className="leading-snug break-all text-gray-200">{details.email}</p>
		  <span class="inline-block h-1 w-10 rounded bg-blue-500 mt-6"></span>
        </span>
      </div>
    </Link>
  );
}

export default TrendingBlogers;