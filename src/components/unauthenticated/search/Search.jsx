import React, { useState, useEffect } from "react";
import Request from "../../../utils/Axios/config";
import Navbar from "../parts/Navbar";
import Bannar from "../parts/Bannar";
import Footer from "../parts/Footer";
import SearchBox from "./parts/SearchBox";
import RecentsLoading from "../parts/loadings/RecentsLoading";
import BlogCard from "./parts/BlogCard";
import { Blog } from "../../../common/links";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../../../utils/Context/UserAthenticationContext";

function Search() {
  const { user } = useUserAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [blogDetails, setBlogDetails] = useState(Blog);
  const [filter, setFilter] = useState("Posts");
  const [time, setTime] = useState(true);
  const [loading, setLoading] = useState(false);
  let timeout;

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleTimeChange = (newTime) => {
    setTime(newTime);
  };

  const handleChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setLoading(true);

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fetchData();
    }, 1000);
  };

  const fetchData = async () => {
    try {
      let res;
      if (filter === "Posts") {
        res = await Request.get(`/search/byPost/${searchTerm}/?filter=${time}`);
      } else if (filter === "People") {
        res = await Request.get(
          `/search/byPeople/${searchTerm}/?filter=${time}`
        );
      } 
      setBlogDetails(res.data);
    } catch (err) {
      console.error("Error fetching search results:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter, time]);

  const renderContent = () => {
    if (user) {
      return <Navigate to="/dashboard/search" />;
    } else {
      return (
        <div className="bg-slate-100 w-full min-h-screen overflow-y-auto">
          <Bannar />
          <Navbar />
          <div className="flex flex-col items-center lg:px-10 justify-center">
            <SearchBox
              placeholder={filter}
              searchTerm={searchTerm}
              handleChange={handleChange}
            />
            <div className="container flex flex-col lg:flex-row items-start lg:gap-5">
              <div className="lg:w-[20%] w-full lg:block sticky top-0 h-fit">
                <h1 className="text-xl lg:ms-0 ms-5 mt-5 md:me-3 break-all text-gray-800 font-semibold lg:text-start">
                  Search result For <br className="lg:block hidden" />{" "}
                  {searchTerm ? `"${searchTerm}"` : ``}
                </h1>
                <div className="flex lg:flex-col items-start mt-3 md:me-3 justify-start p-3">
                  {["Posts", "People"].map((option) => (
                    <button
                      key={option}
                      onClick={() => handleFilterChange(option)}
                      className={`${
                        filter === option
                          ? "bg-gray-200 border-gray-500 font-semibold"
                          : ""
                      } text-center md:text-start md:ps-2 mb-3 border-s-4 border-transparent rounded-md text-gray-600 py-2 w-full transition-all active:scale-95`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div className="lg:min-w-[80%] w-full flex flex-col">
                <div className="flex items-center gap-3 lg:ms-0 ms-3 lg:justify-end">
                  <button
                    onClick={() => handleTimeChange(false)}
                    className={`${
                      !time ? "bg-gray-300 font-semibold" : ""
                    } lg:px-3 px-5 transition-all active:scale-95 py-2 rounded-md`}
                  >
                    Newest
                  </button>
                  <button
                    onClick={() => handleTimeChange(true)}
                    className={`${
                      time ? "bg-gray-300 font-semibold" : ""
                    } px-3 transition-all active:scale-95 py-2 rounded-md`}
                  >
                    Oldest
                  </button>
                </div>

                {loading ? (
                  <RecentsLoading count={5} />
                ) : (
                  <div className="flex flex-col m-5 items-start justify-center gap-10 mt-5">
                    {blogDetails.length < 1 ? (
                      <div className="w-full h-[30vh] lg:h-[60vh] flex flex-col items-center justify-center">
                        <h1 className="text-5xl lg:text-6xl mb-5 text-gray-600">
                          ¯\_(ツ)_/¯
                        </h1>
                        <h1 className="text-5xl lg:text-6xl mb-5 hidden lg:block text-gray-600">
                          {" "}
                          **{" "}
                        </h1>
                        <h1 className="text-5xl lg:text-6xl mb-5 hidden lg:block text-gray-600">
                          {" "}
                          _/¯ ¯\_
                        </h1>
                        <h1 className="text-xl text-gray-500">
                          Can't find any {filter} named "{searchTerm}"
                        </h1>
                      </div>
                    ) : (
                      blogDetails.map((item, index) => (
                        <BlogCard key={index} details={item} />
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <Footer/>
        </div>
      );
    }
  };

  return renderContent();
}

export default Search;
