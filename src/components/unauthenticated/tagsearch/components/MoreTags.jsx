import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useUserAuth } from "../../../../utils/Context/UserAthenticationContext";
import TagsCarousel from "./TagsCarousel";
import AuthFooter from "../../../authenticated/Structure/components/Footer";
import AuthNavbar from "../../../authenticated/Structure/components/Navbar";
import UnAuthFooter from "../../parts/Footer";
import UnAuthNavbar from "../../parts/Navbar";
import { Link } from "react-router-dom";
import Request from "../../../../utils/Axios/config";

function MoreTags() {
  const { user } = useUserAuth();
  const [loading, setLoading] = useState(false);
  const [moreTags, setMoreTags] = useState([]);
  const [tags, setTags] = useState([]);

  const fetchMoreTags = async () => {
    try {
      setLoading(true);
      const response = await Request.get(`/tag/fetchUniqueMoreTags`);

      if (response.status === 200) {
        setMoreTags(response.data);
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
      let response = await Request.get(`/tag/fetchUniqueTags`);

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
    fetchMoreTags();
	fetchTags();
  }, []);
  return (
    <div>
      {user ? <AuthNavbar /> : <UnAuthNavbar />}
      <div className="min-h-[90vh] px-5 md:px-20">
        <div className="py-10">
          <TagsCarousel tags={tags} />
        </div>
        <div className="">
          <div className="py-6 flex text-center flex-col items-center justify-center">
            <h2 className="text-4xl font-semibold text-gray-700">
              {" "}
              <i className="fas fa-compass"></i> Explore topics
            </h2>
            <p className="text-base text-gray-500 mt-3">
              Discover Exceptional Blogs Curated by Prominent Bloggers Across
              Diverse Topics!
            </p>
          </div>
          <div className="flex my-8 items-center justify-center flex-wrap gap-5">
            {moreTags.map((item, index) => (
              <Link
                to={`/tag/${btoa(item)}`}
                key={index}
                className="px-5 py-2 bg-gray-500 text-white rounded-full"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
      {user ? <AuthFooter /> : <UnAuthFooter />}
      <Toaster />
    </div>
  );
}

export default MoreTags;
