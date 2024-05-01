import React from "react";
import { Link } from "react-router-dom";

function PopularTags({ item, index }) {
  return (
    <Link to={`/tag/${btoa(item.tag[0])}`} target="_blank" key={index} className="bg-gray-100 shadow-md px-6 py-3 rounded-full active:scale-95 transition-all">
      <h1 className="text-base font-semibold text-gray-600">{item.tag[0]}</h1>
    </Link>
  );
}

export default PopularTags;
