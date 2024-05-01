import React from "react";
import { Link } from "react-router-dom";
import { extractContent, ParseDate } from "../../../../common/methods";

function RecomendedCard({ item, index, user }) {
  return (
    <div key={index} class=" mb-10 px-4">
      <div class="rounded-lg h-64 overflow-hidden">
        <img
          alt={item.title}
          class="object-cover object-center h-full w-full"
          src={item.image}
        />
      </div>
      <span className="inline-flex w-full items-center justify-between gap-2 my-5">
        <Link
          to={
            user
              ? `/dashboard/comradeprofile/${btoa(item.uid)}`
              : `/comradeprofile/${btoa(item.uid)}`
          }
          className="inline-flex text-base items-center gap-2"
        >
          <img
            src={item.photourl}
            alt={item.name}
            className="w-5 h-5 rounded-full shadow"
          />
          <h1 className="text-base">
            {item.name} : {item.designation}
          </h1>
        </Link>
        <h2 className="text-xs px-3 py-1 font-semibold text-gray-500 rounded-full bg-gray-200">
          {ParseDate(item.creation_time)}
        </h2>
      </span>
      <Link to={`/blogs/${btoa(item.blogid)}`} >
      <h2 class=" text-2xl font-semibold text-gray-900 ">{item.title}</h2>
      <p class="leading-relaxed text-base mt-2 w-[90%]">
        {extractContent(item.content).slice(0, 100)}..
      </p>
      </Link>
    </div>
  );
}

export default RecomendedCard;
