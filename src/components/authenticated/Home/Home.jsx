import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../../utils/Context/UserAthenticationContext";
import BlogCard from "./Card/BlogCard";
import Request from "../../../utils/Axios/config";
import InfiniteScroll from "react-infinite-scroll-component";
import BlogLoading from "./Loading/BlogLoading";
import toast, { Toaster } from "react-hot-toast";
import { useDetails } from "../../../utils/Context/MetaDetails";
import HandPickedCard from "./Card/HandPickedCard";
import PopularTags from "./Card/PopularTags";
import HandPickLoading from "./Loading/HandPickLoading";
import PopularTagsLoading from "./Loading/PopularTagsLoading";
import LastReading from "./LastReading/LastReading";

const Home = () => {
  const { user } = useUserAuth();
  const { setbookmarksDetails, bookmarksDetails, handpicks, HandpickLoading } =
    useDetails();
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);

  const [hasMore, setHasMore] = useState(true);

  const fetchBlogs = async () => {
    try {
      const response = await Request.post(`/blog/fetchblogs?page=${page}`, {
        uid: user.uid,
      });
      setBlogs((prevBlogs) => [...prevBlogs, ...response.data.blogs]);
      setPage(page + 1);
      if (response.data.blogs.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error Fetching Data:", error);
      setHasMore(false);
    }
  };

  const handleBookmark = async (blogId) => {
    try {
      const response = await Request.post("/blog/addandremovebookmark", {
        uid: user.uid,
        blogid: blogId,
      });

      const updatedArray = blogs.map((item) => {
        if (item.blogid === blogId) {
          return { ...item, isBookmarked: true };
        } else {
          return item;
        }
      });
      setBlogs(updatedArray);
      setbookmarksDetails([...bookmarksDetails, response.data.BlogDetails]);

      toast.success("Bookmark added", { position: "top-center" });
    } catch (error) {
      console.log("Error in bookmarking the blog", error);
      toast.error("Unable to bookmark the blog", { position: "top-center" });
    }
  };

  const handleLike = async (blogId) => {
    try {
      const response = await Request.post("/blog/addandremovelike", {
        uid: user.uid,
        blogid: blogId,
      });
      let toggle;
      const updatedBlogs = blogs.map((item) => {
        if (item.blogid === blogId) {
          toggle = !item.isLiked;
          return { ...item, isLiked: toggle };
        }
        return item;
      });

      setBlogs(updatedBlogs);
      setbookmarksDetails([...bookmarksDetails, response.data.BlogDetails]);

      toast.success(`Like updated successfully`, { position: "top-center" });
    } catch (error) {
      console.log("Error in liking the blog", error);
      toast.error("Unable to like the blog", { position: "top-center" });
    }
  };

  const handleLoadMore = () => {
    fetchBlogs();
  };

  useEffect(()=>{
    fetchBlogs()
  },[])

  return (
    <div className="container mx-auto p-4 lg:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h1 className="lg:text-2xl hidden md:flex text-xl break-words font-medium my-3 md:items-center">
            <i className="fas fa-arrow-trend-up p-2"></i> Trendings on
            Insightful for you
          </h1>
          <InfiniteScroll
            dataLength={blogs.length}
            next={handleLoadMore}
            endMessage={
              <p className="py-12 text-center">
                <b>Yay! You have seen it all</b>
              </p>
            }
            hasMore={hasMore}
            loader={<BlogLoading count={2} />}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {blogs.map((blog, index) => (
                <BlogCard
                  handleLike={handleLike}
                  handleBookmark={handleBookmark}
                  key={blog.blogid}
                  item={blog}
                  index={index}
                />
              ))}
            </div>
          </InfiniteScroll>
        </div>
        <div className="hidden lg:block lg:col-span-1">
          <div className="w-full mt-3 min-h-96">
            <h1 className="text-xl font-medium p-2 mb-3">
              Hand Picked for you
            </h1>
            <div className="w-full">
              {HandpickLoading ? (
                <HandPickLoading count={5} />
              ) : (
                handpicks.map((item, index) => (
                  <HandPickedCard index={index} item={item} key={item.blogid} />
                ))
              )}
            </div>
          </div>
          <div className="w-full mt-10 min-h-96">
            <h1 className="text-xl font-medium p-2 mb-3">Recommended topics</h1>
            <div className="w-full flex items-center flex-wrap gap-5">
              {HandpickLoading ? (
                <PopularTagsLoading count={5} />
              ) : (
                handpicks.map((item, index) => (
                  <PopularTags index={index} item={item} key={item.blogid} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <LastReading/>
      <Toaster />
    </div>
  );
};

export default Home;
