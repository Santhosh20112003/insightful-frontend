import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Request from "../../../utils/Axios/config";
import TrendingBlogers from "./Components/TrendingBlogers";
import TrendingBlogersLoading from "./loadings/TrendingBlogersLoading";

function HotTopics() {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(false);

  const FetchBlog = async () => {
    setLoading(true);
    try {
      const { data } = await Request.get("/blog/highComradesUsers/3");
      setBlog(data);
    } catch (err) {
      console.error("Error fetching popular tags:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchBlog();
  }, []);

  return (
    <div className="w-full h-fit py-12">
      <h1 className="md:text-start text-center md:pl-12 text-3xl font-bold text-gray-700">
        Trending Blogers
      </h1>
      {!loading ? (
        <div className="grid  px-5 lg:px-12 pt-10 pb-12 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
          {blog.map((item, index) => (
            <TrendingBlogers details={item} index={index} />
          ))}
        </div>
      ) : (
        <TrendingBlogersLoading count={3} />
      )}
    </div>
  );
}

export default HotTopics;
