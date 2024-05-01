import React from "react";
import { Link } from "react-router-dom";
import { blog_img_link } from "../../../../common/links";
import { extractContent, ParseDate } from "../../../../common/methods";
import * as Tooltip from "@radix-ui/react-tooltip";

function BookMarkCard({ item, index, removeBookmarks }) {
  console.log(item)
  return (
    <div
      key={index}
      className="w-full focus:bg-gray-200 focus:outline-none rounded overflow-hidden flex shadow-lg flex-col-reverse lg:flex-row"
    >
      <div className="px-6 py-4">
        <Link to={`/blogs/${btoa(item.blogid)}`} className="">
        <h2 className="font-bold text-lg mb-2">{item.title}</h2>
        <p className="text-gray-700 text-base">
          {extractContent(item.content).slice(0, 100)}...
        </p>
        </Link>
        <div className="flex items-center gap-3 mt-3">
          <p className="text-sm">{ParseDate(item.creation_time)}</p>
          <Link to={`/tag/${btoa(item.tag[0])}`} className="text-xs px-3 font-semibold rounded-full bg-gray-200 text-gray-500 py-2">
            {item.tag && item.tag[0]} ✨
          </Link>
        </div>
      </div>

      <div className="lg:w-2/5 w-full block max-h-32 md:max-h-none md:h-full relative">
        <img
          src={item?.image}
          alt={item?.title}
          loading="lazy"
          className="w-full h-full object-cover brightness-90"
        />

        <Tooltip.Provider key={index}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                onClick={() => {
                  removeBookmarks(item.blogid);
                }}
                className="absolute top-3 bg-[#21212170] active:bg-gray-600 active:scale-90 transition-all py-1 px-2 rounded-lg right-3 text-gray-50 hover:text-white focus:outline-none"
              >
                <i className="fas fa-bookmark"></i>
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade  data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-red-500 border border-red-200 bg-red-100 select-none rounded-[4px]  px-[15px] py-[10px] text-[15px] leading-none  will-change-[transform,opacity]"
                side="left"
                sideOffset={5}
              >
                Remove Bookmark
                <Tooltip.Arrow className="fill-red-100" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>
    </div>
  );
}

export default BookMarkCard;
