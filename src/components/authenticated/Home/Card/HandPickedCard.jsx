import React from "react";
import { Link } from "react-router-dom";

function HandPickedCard({ item, index }) {
  return (
    <div className="mb-5 bg-gray-100 rounded-md p-3">
      <Link
        to={`/dashboard/comradeprofile/${btoa(item.uid)}`}
        className="flex items-center gap-2"
      >
        <img
          src={item.photourl}
          alt={item.name}
          className="w-6 h-6 rounded-full"
        />
        <h1 className="text-base text-gray-600 leading-none">{item.name}</h1>
      </Link>
      <Link to={`/blogs/${btoa(item.blogid)}`} >
        <h1 className="mt-2 font-medium text-gray-700">{item.title}</h1>
      </Link>
    </div>
  );
}

export default HandPickedCard;
