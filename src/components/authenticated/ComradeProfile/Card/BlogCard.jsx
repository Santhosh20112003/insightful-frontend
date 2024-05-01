import React from "react";
import { Link } from "react-router-dom";
import { extractContent, ParseDate } from "../../../../common/methods";

function BlogCard({ item, index, details }) {
  const { name, photourl } = details;
  const { creation_time, blogid, title, content, tag, image, uid } = item;

  return (
    <div className="grid grid-cols-1 mb-10 lg:grid-cols-2 gap-4 focus:bg-gray-200 focus:outline-none rounded overflow-hidden shadow-lg">
      <div className="lg:order-1 lg:min-h-24">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover brightness-90"
        />
      </div>
      <Link
        to={`/blogs/${btoa(item.blogid)}`}
        className="grid grid-cols-1 lg:order-2 px-4 py-6 lg:col-span-1"
      >
        <div className="flex items-center justify-start mb-2 gap-3">
          <img
            src={photourl}
            alt={name}
            className="w-10 h-10 border-2 border-gray-300 rounded-full"
          />
          <div>
            <p className="text-base font-semibold leading-none">{name}</p>
            <span className="text-sm text-gray-500">
              {ParseDate(creation_time)}
            </span>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-2">{title}</h2>
          <p className="text-gray-700 text-base">
            {extractContent(content).slice(0, 80)}...
          </p>
          <div className="flex items-center flex-wrap gap-3 mt-3">
            {tag.slice(0, 3).map((tag, index) => (
              <Link
                to={`/tag/${btoa(tag)}`}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                key={index}
                className="text-xs px-3 font-semibold rounded-full bg-gray-200 text-gray-500 py-2"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default BlogCard;
