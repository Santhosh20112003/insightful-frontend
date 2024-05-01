import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useUserAuth } from "../../../utils/Context/UserAthenticationContext";
import Request from "../../../utils/Axios/config";
import { useDetails } from "../../../utils/Context/MetaDetails";
import { other_prods } from "../../../common/links";
import * as Tooltip from "@radix-ui/react-tooltip";
import Write from "./components/Write";

const Structure = () => {
  const { user } = useUserAuth();
  const {
    comrades,
    setcomradesDetails,
    setDesignation,
    setBookmarks,
    setPosts,
    setComrades,
    bookmarks,
    setbookmarksDetails,
    newUser,
    setNewUser,
    setShow,
    Show,
    handpicks,
    setHandpicks,
    DesignationPopup,
    setHandpickLoading
  } = useDetails();

  const GetAuthToken = async () => {
    try {
      const response = await Request.post("/token/createToken", {
        userid: user.uid
      });
      window.localStorage.setItem("insightfulToken",response.data.token)
    } catch (err) {
      console.error("Error in creating auth token:", err);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await Request.post("/auth/checkandcreate/", {
        uid: user.uid,
        name: user.displayName || user.email.split("@")[0],
        email: user.email,
        provider: user.providerData[0]?.providerId,
        photourl: user.photoURL,
      });
      setNewUser(response.data.isNew);
      setDesignation(response.data.designation);
      setBookmarks(response.data.bookmarks);
      setComrades(response.data.comrades);
    } catch (err) {
      console.error("Error in checking and creating user:", err);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await Request.get(`/auth/getpostbyuserid/${user.uid}`);
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching user posts:", err);
    }
  };

  const fetchComradeDetails = async () => {
    try {
      const response = await Request.post("/auth/getcomradebyid/", {
        comrades: comrades,
      });
      setcomradesDetails(response.data);
    } catch (error) {
      console.error("Error fetching comrade details:", error);
    }
  };

  const fetchBlogDetails = async () => {
    try {
      const response = await Request.post("/blog/getblogsbyid/", {
        blogs: bookmarks,
      });
      setbookmarksDetails(response.data);
    } catch (error) {
      console.error("Error fetching Bookmarks details:", error);
    }
  };

  const handpickedBlogs = async () => {
    try {
      setHandpickLoading(true);
      const response = await Request.post(`/blog/handpicked`, {
        uid: user.uid,
      });
      setHandpicks(response.data);
    } catch (error) {
      console.error("Error Fetching Data:", error);
    }
    finally{
      setHandpickLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchPosts();
    }
  }, [user]);

  useEffect(() => {
    fetchComradeDetails();
  }, [comrades]);

  useEffect(() => {
    GetAuthToken();
    handpickedBlogs();
  }, []);

  useEffect(() => {
    fetchBlogDetails();
  }, [bookmarks]);

  return (
    <div>
      <Navbar />
      <div className="min-h-[90vh] flex justify-between w-full">
        {newUser && <DesignationPopup/>}
        <Outlet />
        {Show && (
          <div className="min-h-[100vh] h-full px-4 py-10 hidden lg:flex sticky top-0 items-center flex-col bg-slate-50 border-s-2 border-t-2 border-gray-200 right-0">
            {other_prods.map((item, index) => (
              <Tooltip.Provider key={index}>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <Link target="_blank" to={item.link}>
                      <img
                        src={item.image}
                        alt={item.name}
                        title={item.name}
                        className="h-10 mb-8 rounded-full active:scale-90 transition-all w-10"
                      />
                    </Link>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade mb-8 data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-gray-500 border border-gray-200 bg-gray-100 select-none rounded-[4px]  px-[15px] py-[10px] text-[15px] leading-none  will-change-[transform,opacity]"
                      side="left"
                      sideOffset={5}
                    >
                     {item.name}
                      <Tooltip.Arrow className="fill-gray-300" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            ))}
            <button onClick={() => setShow(!Show)} className="toggle-button">
              <i className="fa fa-arrow-right text-slate-600 lg:hover:bg-slate-200 active:scale-90 transition-all p-3 rounded-full addicon"></i>
            </button>
          </div>
        )}
        {!Show && (
          <span
            onClick={() => setShow(!Show)}
            className="fixed hidden lg:block bottom-28 right-0 bg-slate-300 text-slate-600 px-3 py-2 rounded-s-full lg:hover:pe-5 transition-all cursor-pointer"
          >
            <i className="fas fa-arrow-left"></i>
          </span>
        )}
      </div>
      <Write/>
      <Footer />
    </div>
  );
};

export default Structure;