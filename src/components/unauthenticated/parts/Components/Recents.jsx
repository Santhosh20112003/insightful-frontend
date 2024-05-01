import React from "react";
import { Link } from "react-router-dom";
import { blog_img_link } from "../../../../common/links";
import { extractContent, ParseDate } from "../../../../common/methods";
import { useUserAuth } from "../../../../utils/Context/UserAthenticationContext";

function Recents({ details, index }) {
  const { user } = useUserAuth();
  return (
    <div
      key={index}
      className="w-full focus:bg-gray-100 focus:outline-none rounded overflow-hidden flex shadow-lg justify-between flex-col-reverse lg:flex-row"
    >
      <div className="px-6 py-4">
        <Link
          to={user ? `/dashboard/comradeprofile/${btoa(details.uid)}` : `/comradeprofile/${btoa(details.uid)}`}
          className="flex items-center justify-start gap-3 mb-3"
        >
          <img
            src={details.photourl}
            alt={details.title}
            className="w-10 h-10 border-2 border-gray-300 rounded-full"
          />
          <h1 className="">{details.name}</h1>
        </Link>
        <Link to={`/blogs/${btoa(details.blogid)}`}>
          <h2 className="font-bold text-md mb-2">{details.title}</h2>
          <p className="text-gray-700 text-sm">
            {extractContent(details.content).slice(0, 100)}...
          </p>
          <span className="flex items-center flex-wrap gap-3 mt-3">
            <p className="text-sm">{ParseDate(details.creation_time)}</p>
            {details.tag.map((item,index) => (
              <Link key={index} className="active:scale-95 transition-all" to={`/tag/${btoa(item)}`}>
                <h2 className="text-xs px-3 font-semibold rounded-full bg-gray-200 text-gray-500 py-2">
                  {item} {details.tag.length < 2 && '✨'}
                </h2>
              </Link>
            ))}
          </span>
        </Link>
      </div>
      <img
        src={details.image || `${blog_img_link}?${details.tag[0]}`}
        alt={details.title}
        loading="lazy"
        className="lg:w-2/5 w-full brightness-90 block max-h-none object-cover md:h-full"
      />
    </div>
  );
}

export default Recents;
