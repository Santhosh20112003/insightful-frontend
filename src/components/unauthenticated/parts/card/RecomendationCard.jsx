import React from "react";
import { Link } from "react-router-dom";
import { extractContent, ParseDate } from "../../../../common/methods";

const RecomendationCard = ({ item, index, author }) => {
  return (
    <div className="relative flex flex-col md:flex-row w-full max-w-[48rem] rounded-xl bg-white text-gray-700 shadow-md">
      <div className="md:w-2/5 w-full h-40 md:h-auto overflow-hidden rounded-t-xl md:rounded-xl md:rounded-r-none">
        <img
          src={item.image}
          alt="image"
          className="h-full w-full brightness-90 object-cover"
        />
      </div>

      <Link to={`/blogs/${btoa(item.blogid)}`} className="w-fit md:w-[60%] px-6 py-4">
        <div className="flex items-center mb-3 space-x-2">
          <img
            src={author?.photourl}
            alt={author?.name}
            className="w-8 h-8 bg-gray-300 rounded-full"
          />
          <div className="flex flex-col items-start justify-center">
            <p className="text-base font-semibold leading-none">
              {author?.name}
            </p>
            <span className="text-sm text-gray-500">
              {ParseDate(item.creation_time)}
            </span>
          </div>
        </div>
        <h2 className="font-bold text-lg mb-2">{item.title}</h2>
        <span className="flex items-center flex-wrap gap-3 mt-3">
          {item?.tag?.map((item, index) => (
            <Link
              key={index}
              className="active:scale-95 transition-all"
              to={`/tag/${btoa(item)}`}
            >
              <h2 className="text-xs px-3 font-semibold rounded-full bg-gray-200 text-gray-500 py-2">
                {item}
              </h2>
            </Link>
          ))}
        </span>
      </Link>
    </div>
  );
};

export default RecomendationCard;
