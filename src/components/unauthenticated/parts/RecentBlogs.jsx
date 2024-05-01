import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Request from "../../../utils/Axios/config";
import PopularTags from "./Components/PopularTags";
import Recents from "./Components/Recents";
import PopularTagLoading from "./loadings/PopularTagLoading";
import RecentsLoading from "./loadings/RecentsLoading";

function RecentBlogs() {
  const [recents, setRecents] = useState([]);
  const [tags, setTags] = useState([]);
  const [loadingRecents, setLoadingRecents] = useState(false);
  const [loadingTags, setLoadingTags] = useState(false);

  const fetchRecents = async () => {
    setLoadingRecents(true);
    try {
      const res = await Request.get("/blog/recentblog");
      setRecents(res.data);
    } catch (err) {
      console.error("Error fetching recent blogs:", err);
    } finally {
      setLoadingRecents(false);
    }
  };

  const fetchTags = async () => {
    setLoadingTags(true);
    try {
      const res = await Request.get("/blog/PopularTags/5");
      setTags(res.data);
    } catch (err) {
      console.error("Error fetching popular tags:", err);
    } finally {
      setLoadingTags(false);
    }
  };

  useEffect(() => {
    fetchRecents();
    fetchTags();
  }, []);

  return (
    <div className="w-full min-h-screen">
      <div className="flex flex-col lg:px-16 md:px-12 py-14 md:flex-row items-start justify-evenly gap-3">
        <div className="lg:flex-grow md:w-1/2 md:pr-16 flex flex-col md:items-start md:text-left text-start mb-16 md:mb-0 items-center">
          <h3 className="md:text-start text-center my-12 ml-3 text-3xl font-bold text-gray-700">
            Recent Blog Posts
          </h3>
          {!loadingRecents ? (
            <div className="px-3">
              <div className="grid grid-cols-1 gap-5">
                {recents.map((item, index) => (
                  <Recents key={index} details={item} />
                ))}
              </div>
            </div>
          ) : (
            <RecentsLoading count={3} />
          )}
        </div>
        <div className="hidden items-start sticky pb-20 top-0 left-0 h-[300px] justify-start  flex-col md:flex lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <h1 className="text-xl font-semibold py-10">
            Discover more of what matters to you
          </h1>
          {!loadingTags ? (
            <div className="flex items-center justify-start gap-5 flex-wrap">
              {tags.map((tag, index) => (
                <PopularTags key={index} tag={tag} />
              ))}
              <Link
                className="active:scale-95 transition-all"
                to={`/tags/more`}
              >
                <h1 className="text-md px-5 py-3 rounded-full bg-gray-200 font-semibold text-gray-500">
                + Much More 😎
                </h1>
              </Link>
            </div>
          ) : (
            <PopularTagLoading count={5} />
          )}
        </div>
      </div>
    </div>
  );
}

export default RecentBlogs;
