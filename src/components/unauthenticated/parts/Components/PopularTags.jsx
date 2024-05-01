import React from "react";
import { Link } from "react-router-dom";

function PopularTags({ tag, index }) {
  return (
    <Link
      key={index}
      className="active:scale-95 transition-all"
      to={`/tag/${btoa(tag)}`}
    >
      <h1 className="text-md px-5 py-3 rounded-full bg-gray-200 font-semibold text-gray-500">
        {tag}
      </h1>
    </Link>
  );
}

export default PopularTags;
