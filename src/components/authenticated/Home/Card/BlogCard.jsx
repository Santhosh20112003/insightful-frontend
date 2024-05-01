import React from "react";
import { Link } from "react-router-dom";
import { blog_img_link } from "../../../../common/links";
import { extractContent, ParseDate } from "../../../../common/methods";
import * as HoverCard from "@radix-ui/react-hover-card";
import * as Tooltip from "@radix-ui/react-tooltip";

const BlogCard = ({ item, handleBookmark, handleLike }) => {
  const handleBookmarkClick = (blogId) => {
    handleBookmark(blogId);
  };

  const handleLikeClick = (blogId) => {
    handleLike(blogId);
  };

  return (
    <div className="w-full bg-gray-100 mb-4 focus:outline-none rounded overflow-hidden flex shadow-lg flex-col transition-all">
      <div className="w-full h-48 relative">
        <img
          src={item.image || `${blog_img_link}?${item.tag[0]}`}
          alt={item.title}
          loading="lazy"
          className="w-full h-full brightness-90 object-cover"
        />
        {!item.isBookmarked && (
          <span
            onClick={() => handleBookmarkClick(item.blogid)}
            title="Add to Bookmarks"
            className="absolute top-3 bg-[#21212170] active:bg-gray-600 active:scale-90 transition-all py-1 px-2 rounded-lg right-3 text-gray-200 focus:outline-none"
          >
            <i className="fas fa-bookmark"></i>
          </span>
        )}

        {item.isBookmarked && (
          <span className="bg-blue-500 z-10 text-white px-3 py-1 text-xs absolute right-0 top-0 rounded-bl">
            Bookmarked
          </span>
        )}
      </div>
      <div>
        <span>
          <Link
            to={`/dashboard/comradeprofile/${btoa(item.uid)}`}
            className="flex items-center px-5 pt-3 space-x-2"
          >
            <HoverCard.Root>
              <HoverCard.Trigger asChild>
                <img
                  src={item.photourl}
                  alt={item.name}
                  className="w-11 h-11 data-[state=open]:shadow-md border bg-gray-300 rounded-full"
                />
              </HoverCard.Trigger>
              <HoverCard.Portal>
                <HoverCard.Content
                  className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade z-[1000000]  data-[side=top]:animate-slideDownAndFade w-fit rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]  data-[state=open]:transition-all"
                  sideOffset={5}
                  side={"right"}
                >
                  <div className="flex flex-col gap-[7px]">
                    <div className="flex mb-2 items-center justify-start gap-[15px]">
                      <img
                        className="block h-12 w-12 rounded-full"
                        src={item.photourl}
                        alt={item.name}
                      />
                      <div className="flex flex-col">
                        <div className="text-mauve12 font-semibold m-0 text-[15px] leading-[1.5]">
                          {item.name}
                        </div>
                        <div className="text-mauve10 m-0 text-[15px] leading-[1.5]">
                          I'm a {item.designation}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-[15px]">
                      <div className="flex gap-[15px] justify-start items-center">
                        <div className="flex bg-gray-100 px-5 py-2 rounded-full gap-[5px]">
                          <div className="text-gray-700 m-0 text-[15px] font-medium leading-[1.5]">
                            {(item.comrades && item.comrades.length) || 0}
                          </div>{" "}
                          <div className="text-gray-500 m-0 text-[15px] leading-[1.5]">
                            comrades
                          </div>
                        </div>
                        
                          <Link
                            to={`mailto:${item.email}`}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-blue-200 p-2 active:scale-90 transition-all rounded-full"
                            title={`Send email to ${item.name}`}
                          >
                            <i className="fa-solid  text-blue-500 fa-envelope-circle-check ms-0.5"></i>
                          </Link>
                       
                      </div>
                    </div>
                  </div>

                  <HoverCard.Arrow className="fill-white" />
                </HoverCard.Content>
              </HoverCard.Portal>
            </HoverCard.Root>
            <div className="flex flex-col items-start justify-center">
              <p className="text-lg m-0 font-semibold leading-none">
                {item.name}
              </p>
              <span className="text-sm text-gray-500">
                {ParseDate(item.creation_time)}
              </span>
            </div>
          </Link>

          <Link to={`/blogs/${btoa(item.blogid)}`}>
            <h2 className="font-bold px-6 pt-4 text-lg mb-2">{item.title}</h2>
          </Link>
        </span>

        <div className="px-6 pb-4">
          <p className="text-gray-700 text-sm">
            {extractContent(item.content).slice(0, 200)}...
          </p>
          <div className="flex items-center flex-wrap justify-start mt-3 gap-3">
            <button onClick={() => handleLikeClick(item.blogid)}>
              <i
                className={`fas fa-heart ${
                  item.isLiked ? "text-red-500" : "text-red-200"
                }`}
              ></i>
            </button>
            <div className="flex items-center flex-wrap gap-3">
              {item.tag.slice(0, 2).map((tag, tagIndex) => (
                <Link
                  to={`/tag/${btoa(tag)}`}
                  target="_blank"
                  key={tagIndex}
                  className="text-xs px-3 font-semibold rounded-full bg-gray-200 text-gray-500 py-2"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
