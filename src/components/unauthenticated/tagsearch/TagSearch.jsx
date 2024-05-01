import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useUserAuth } from "../../../utils/Context/UserAthenticationContext";
import Request from "../../../utils/Axios/config";
import toast, { Toaster } from "react-hot-toast";
import AuthFooter from "../../authenticated/Structure/components/Footer";
import AuthNavbar from "../../authenticated/Structure/components/Navbar";
import UnAuthFooter from "../parts/Footer";
import UnAuthNavbar from "../parts/Navbar";
import RecomendedCard from "./card/RecomendedCard";
import Blogcard from "./card/Blogcard";
import TagsCarousel from "./components/TagsCarousel";

function TagSearch() {
  const param = useParams();
  const topic = atob(param.topic)
  const { user } = useUserAuth();
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);

  const [recommendedBlogs, setRecommendedBlogs] = useState([]);

  const fetchTagBlogs = async () => {
    try {
      setLoading(true);
      const response = await Request.get(`/tag/fetchPostsbyTag/${topic}`);

      if (response.status === 200) {
        const fetchedData = response.data;
        setRecommendedBlogs(fetchedData.slice(0, 2));
        setBlogs(fetchedData.slice(2));
        console.log(fetchedData);
      } else {
        toast.error("Unable to Fetch Details", { position: "top-center" });
      }
    } catch (error) {
      console.log("Error in fetching data", error);
      toast.error("Unable to Fetch Details", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      setLoading(true);
      let response;
      if (topic !== "more") {
        response = await Request.get(`/tag/fetchUniqueTags/${topic}`);
      } else {
        response = await Request.get(`/tag/fetchUniqueTags`);
      }

      if (response.status === 200) {
        setTags(response.data);
      } else {
        toast.error("Unable to Fetch Details", { position: "top-center" });
      }
    } catch (error) {
      console.log("Error in fetching data", error);
      toast.error("Unable to Fetch Details", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTagBlogs();
    fetchTags();
  }, [topic]);

  return (
    <div className="">
      {user ? <AuthNavbar /> : <UnAuthNavbar />}
      <div className="min-h-[90vh] px-5 md:px-20">
        <div className="py-10">
          <TagsCarousel tags={tags} topic={topic} />
        </div>
        <div className="">
          <div className="py-12 flex flex-col items-center justify-center">
            <h2 className="text-4xl font-semibold">{topic}</h2>
            <div className="flex items-center gap-2 mt-5">
              <h2>Topic -</h2>
              <h3>{blogs.length + recommendedBlogs.length} Blog Posts</h3>
            </div>
          </div>

          <hr />

          <div className="text-gray-600 w-full body-font">
            <div className="py-12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
              {recommendedBlogs.map((item, index) => (
                <RecomendedCard
                  key={index}
                  index={index}
                  user={user}
                  item={item}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 my-6">
            {blogs.map((item, index) => (
              <Blogcard key={index} index={index} item={item} user={user} />
            ))}
          </div>
        </div>
      </div>
      {user ? <AuthFooter /> : <UnAuthFooter />}
      <Toaster />
    </div>
  );
}

export default TagSearch;
