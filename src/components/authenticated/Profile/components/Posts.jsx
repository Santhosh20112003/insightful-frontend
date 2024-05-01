import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import toast, { Toaster } from 'react-hot-toast';
import { useDetails } from "../../../../utils/Context/MetaDetails";
import PostsCard from "../cards/PostsCard";
import Request from "../../../../utils/Axios/config";
import { useUserAuth } from "../../../../utils/Context/UserAthenticationContext";

function Posts() {
  const { posts, setPosts } = useDetails();
  const { user } = useUserAuth();

  const handleDeletePost = async (blogid) => {
    try {
      const response = await Request.post("/auth/deleteblog", {
        uid: user.uid,
        blogid: blogid,
      });

      if (response.data.message) {
        const updatedPosts = posts.filter((item) => item.blogid !== blogid);
        setPosts(updatedPosts);

        toast.success(response.data.message, { position: "top-center" });
      } else {
        toast.error(response.data.message, { position: "top-center" });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "An error occurred while updating the blog.";
      toast.error(errorMessage, { position: "top-center" });
    }
  };

  return (
    <div>
      <Tabs.Content className="tab-content mx-5 lg:mx-12" value="Posts">
        <div className="bg-white lg:px-4 mt-5 mb-10">
          <h2 className="text-2xl ms-3 font-bold text-gray-800 mb-4">
            {posts.length} Blog Posts
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {posts.map((item, index) => (
              <PostsCard key={index} item={item} HandleDeletePost={handleDeletePost} />
            ))}
          </div>
        </div>
      </Tabs.Content>
      <Toaster  />
    </div>
  );
}

export default Posts;