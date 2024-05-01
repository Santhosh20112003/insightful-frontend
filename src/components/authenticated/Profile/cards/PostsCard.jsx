import React, { useState } from "react";
import { blog_img_link } from "../../../../common/links";
import { useUserAuth } from "../../../../utils/Context/UserAthenticationContext";
import { extractContent, ParseDate } from "../../../../common/methods";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Link } from "react-router-dom";

function PostsCard({ item, index, HandleDeletePost }) {
  const { user } = useUserAuth();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = async (blogid) => {
    if (!isDeleting) {
      setIsDeleting(true);
      try {
        await HandleDeletePost(blogid);
      } catch (error) {
        console.error("Error deleting post:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <span
      key={index}
      className="w-full bg-white focus:outline-none rounded overflow-hidden flex shadow-lg flex-col transition-all"
    >
      <div className="w-full h-48 relative">
        <img
          src={item.image || `${blog_img_link}?${item.tag[0]}`}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <Link
          to={`/dashboard/blog/edit/${btoa(item.blogid)}`}
          className="absolute top-3 bg-[#21212170] active:bg-gray-600 active:scale-90 transition-all py-1 px-2 rounded-lg right-14 text-gray-50 hover:text-white focus:outline-none"
        >
          <i className="fas fa-pen-nib"></i>
        </Link>

        <AlertDialog.Root>
          <AlertDialog.Trigger asChild>
            <span className="absolute top-3 bg-[#fd3b3b9e] active:bg-red-600 active:scale-90 transition-all py-1 px-2 rounded-lg right-3 text-white hover:text-white focus:outline-none">
              <i className="fas fa-trash-can"></i>
            </span>
          </AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
            <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
              <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                {user.displayName || user.email} are you absolutely sure?
              </AlertDialog.Title>
              <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
                This action cannot be undone. This will permanently delete your
                Blog Post and remove your data from our servers.
              </AlertDialog.Description>
              <div className="flex justify-end gap-[25px]">
                <AlertDialog.Cancel asChild>
                  <button className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                    Cancel
                  </button>
                </AlertDialog.Cancel>
                <AlertDialog.Action asChild>
                  <button
                    onClick={() => handleDeleteClick(item.blogid)}
                    className="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
                  >
                    Yes, delete Blog
                  </button>
                </AlertDialog.Action>
              </div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      </div>
      <div className="flex items-center px-5 pt-3 space-x-2">
        <img
          src={user.photoURL}
          alt={user.displayName}
          className="w-11 h-11 bg-gray-300 rounded-full"
        />
        <div className="flex flex-col items-start justify-center">
          <p className="text-lg m-0 font-semibold leading-none">
            {user.displayName}
          </p>
          <span className="text-sm text-gray-500">
            {ParseDate(item.creation_time)}
          </span>
        </div>
      </div>
      <div className="px-6 py-4">
        <h2 className="font-bold text-lg mb-2">{item.title}</h2>
        <p className="text-gray-700 text-sm">
          {extractContent(item.content).slice(0, 300)}...
        </p>
        <div className="flex items-center flex-wrap justify-start mt-3 gap-3">
          {item.tag.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="text-xs px-3 font-semibold rounded-full bg-gray-200 text-gray-500 py-2"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </span>
  );
}

export default PostsCard;
