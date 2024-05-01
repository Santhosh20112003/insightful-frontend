import React from "react";
import { Link } from "react-router-dom";
import { blog_img_link } from "../../../../common/links";
import { extractContent, ParseDate } from "../../../../common/methods";

function SearchCard({ details, index, HandleBookmark }) {
  return (
    <span
      key={index}
      className="w-full  transition-all lg:hover:rounded-lg bg-white focus:outline-none rounded overflow-hidden flex shadow-lg flex-col-reverse "
    >
      <div className="px-6 py-4">
        <Link
          to={`/dashboard/comradeprofile/${btoa(details.uid)}`}
          className="flex items-center justify-start gap-3 mb-3"
        >
          <img
            src={details.photourl}
            alt={details.title}
            className="w-10 h-10 rounded-full"
          />
          <span className="break-all">
            <h1 className="">{details.name}</h1>
            <p className="text-xs">{ParseDate(details.creation_time)}</p>
          </span>
        </Link>
        <div className="">
          <Link to={`/blogs/${btoa(details.blogid)}`} className="">
            <h2 className="font-bold text-md mb-2">{details.title}</h2>
            <p className="text-gray-700 text-sm">
              {extractContent(details.content).slice(0, 500)}...
            </p>
          </Link>
          <div className="flex items-center flex-wrap justify-start mt-3 gap-3">
            <p className="text-sm px-3 text-gray-500 font-mono">
              {details.likes && details.likes.length > 0
                ? `❤️ ${details.likes.length} likes`
                : "No likes Yet"}
            </p>

            <span className="flex items-center gap-3 ">
              {details.tag.map((item, index) => (
                <Link
                  to={`/tag/${btoa(item)}`}
                  key={index}
                  className="text-xs px-3 font-semibold rounded-full bg-gray-200 text-gray-500 py-2"
                >
                  {item}
                </Link>
              ))}
            </span>
          </div>
        </div>
      </div>
      <span className="relative">
        <img
          src={details.image || `${blog_img_link}?${details.tag[0]}`}
          alt={details.title}
          loading="lazy"
          className="brightness-90 w-full max-h-32 object-cover"
        />
        {!details.isBookmarked && (
          <span
            onClick={() => {
              HandleBookmark(details.blogid);
            }}
            className={`absolute top-3 bg-[#21212170] active:bg-gray-600 active:scale-90 transition-all py-1 px-2 rounded-lg right-3 text-gray-200 focus:outline-none`}
          >
            <i className="fas fa-bookmark"></i>
          </span>
        )}
        {details.isBookmarked && (
          <span className="bg-blue-500 z-10 text-white px-3 py-1 text-xs absolute right-0 top-0 rounded-bl">
            Bookmarked
          </span>
        )}
      </span>
    </span>
  );
}

export default SearchCard;
