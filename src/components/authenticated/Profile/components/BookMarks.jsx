import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { useDetails } from "../../../../utils/Context/MetaDetails";
import BookMarkCard from "../cards/BookMarkCard";
import toast, { Toaster } from "react-hot-toast";
import Request from "../../../../utils/Axios/config";
import { useUserAuth } from "../../../../utils/Context/UserAthenticationContext";

function BookMarks() {
  const { user } = useUserAuth();
  const { bookmarksDetails, setbookmarksDetails } = useDetails();

  const removeBookmarks = async (blogId) => {
    try {
      const response = await Request.post("/blog/addandremovebookmark", {
        uid: user.uid,
        blogid: blogId,
      });
      let updatedArray = bookmarksDetails.filter((item) => item.blogid !== blogId);
      setbookmarksDetails(updatedArray);
      toast.success("Bookmark Removed", { position: "top-center" });
    } catch (err) {
      console.log("Error in removing the bookmark", err);
      toast.error("Failed to remove bookmark", { position: "top-center" });
    }
  };

  return (
    <div>
      <Tabs.Content className="tab-content mx-5 lg:mx-12" value="Posts">
        <div className="bg-white mt-5 mb-10 lg:px-4">
          <h2 className="text-2xl ms-3 font-bold text-gray-800 mb-4">
            {bookmarksDetails && bookmarksDetails.length} Bookmarks
          </h2>
          <div className="w-full">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
              {bookmarksDetails &&
                bookmarksDetails.map((item, index) => (
                  <BookMarkCard
                    removeBookmarks={removeBookmarks}
                    key={index}
                    item={item}
                    index={index}
                  />
                ))}
            </div>
          </div>
        </div>
      </Tabs.Content>
    </div>
  );
}

export default BookMarks;