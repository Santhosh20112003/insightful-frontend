import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import supabase from "../../common/configuration";
import { blog_img_link } from "../../common/links";
import "../../common/cancel.css";
import { extractContent } from "../../common/methods";
import Navbar from "./parts/Navbar";
import Request from "../../utils/Axios/config";
import Footer from "./parts/Footer";
import toast, { Toaster } from "react-hot-toast";
// import { InlineShareButtons } from "sharethis-reactjs";
import "../../common/cancel.css";
import RecomendationCard from "./parts/card/RecomendationCard";
import { useUserAuth } from "../../utils/Context/UserAthenticationContext";

function Blog() {
  const {user} = useUserAuth();
  const param = useParams();
  const blogid = atob(param.blogid);
  const [blogDetails, setBlogDetails] = useState({});
  const [blogRecomendationDetails, setblogRecomendationDetails] = useState([]);
  const [users, setUsers] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [count, setCount] = useState(true);
  var speech = new SpeechSynthesisUtterance();

  // const shareConfig = {
  //   alignment: "left",
  //   color: "social",
  //   enabled: true,
  //   font_size: 16,
  //   labels: "count",
  //   language: "en",
  //   networks: ["whatsapp", "linkedin", "facebook", "sharethis"],
  //   padding: 12,
  //   radius: 10,
  //   show_total: true,
  //   size: 38,
  //   image:
  //     "https://ik.imagekit.io/vituepzjm/Insightful%20(1).png?updatedAt=1710734251884",
  //   description: `Welcome to Insightful, where your thoughts
  //   meet the world! Express yourself through captivating stories, share your
  //   knowledge with a global audience, and connect with like-minded individuals
  //   in a creative online space. Whether you're a seasoned writer or just
  //   starting out, Insightful provides the platform for your
  //   voice to be heard. Start crafting your next masterpiece today!`,
  //   title: "Insightful - Where Insights Blossom into Stories",
  //   message: "Hi Insightful good to see your Work",
  //   subject: "Hello There",
  //   username: "@Santhosh202003",
  // };

  const fetchData = async () => {
    try {
      const { data: usersData } = await supabase.from("users").select("*");
      setUsers(usersData);
      console.log(usersData)
      console.log(blogid);
      const { data: blogData, error } = await supabase
        .from("blogs")
        .select("*", {
          join: {
            from: "uid",
            to: "uid",
            table: "users",
            columns: ["photourl", "name", "designation"],
          },
        })
        .eq("blogid", blogid);

      if (error) {
        console.error("Error fetching blog details:", error.message);
        toast.error("Failed to fetch blog details", {
          position: "top-center",
        });
      } else {
        setBlogDetails(blogData[0]);
        window.localStorage.setItem("lastviewed", JSON.stringify(blogData[0]));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchRecomendationData = async () => {
    try {
      const usersResponse = await Request.post(
        "/recomendation/fetchBlogRecomendation",
        {
          uid: "7wfqx0bkEgWqa9xVT0ypa5DHBxo1",
        }
      );

      if (usersResponse.status != 200) {
        throw new Error("Failed to fetch users data");
      }

      console.log(usersResponse.data);
      setblogRecomendationDetails(usersResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch blog Recomendation Details", {
        position: "top-center",
      });
    }
  };

  const toggleSpeech = (content) => {
    content = extractContent(content);

    if (isSpeaking) {
      window.speechSynthesis.pause();
    } else if (count) {
      setCount(false);
      speech.text = content;
      window.speechSynthesis.speak(speech);
    } else {
      window.speechSynthesis.cancel(speech);
      speech.text = content;
      window.speechSynthesis.speak(speech);
    }
    setIsSpeaking(!isSpeaking);
  };

  useEffect(() => {
    fetchData();
    fetchRecomendationData();
  }, [blogid]);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const author = users.find((user) => user.uid === blogDetails.uid);

  return (
    <div className="">
      <Navbar />
      <div className="max-w-3xl mx-auto p-4 mt-5">
        <img
          src={blogDetails.image || `${blog_img_link}?${blogDetails.tag}`}
          alt={blogDetails.title}
          className="w-full h-60 lg:object-cover object-fill rounded-md mb-4"
        />
        <span className="flex items-center gap-5">
          <button
            onClick={() => toggleSpeech(blogDetails.content)}
            className={`text-xl active:scale-90 transition-all px-3.5 py-2 my-3 border-none ${
              isSpeaking
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-500"
            } rounded-full`}
          >
            <i
              className={`fas mt-1 ms-0.5 fa-${isSpeaking ? "pause" : "play"}`}
            ></i>
          </button>
          {/* <InlineShareButtons config={shareConfig} /> */}
        </span>
        <h1 className="text-3xl font-bold mb-4">{blogDetails.title}</h1>
        <div
          className="no-tailwindcss"
          dangerouslySetInnerHTML={{ __html: blogDetails.content }}
        />
        <span className="mt-5 flex flex-wrap justify-center lg:justify-start items-center gap-3 mb-3">
          {blogDetails.tag &&
            blogDetails.tag.map((item, index) => (
              <Link
                to={`/tag/${btoa(item)}`}
                target="_blank"
                key={index}
                className="text-base font-semibold px-5 bg-gray-200 text-gray-500 rounded-full py-2"
              >
                {item}
              </Link>
            ))}
        </span>

        {author && (
          <Link
            to={`/comradeprofile/${btoa(author.uid)}`}
            className="flex items-center mt-10 space-x-3"
          >
            <img
              src={author.photourl}
              alt={author.name}
              className="w-12 h-12 rounded-full"
            />
            <span className="flex flex-col items-start justify-center">
              <p className="text-lg m-0 font-semibold">{author.name}</p>
              <p className="text-gray-500 m-0">I'm a {author.designation}</p>
            </span>
          </Link>
        )}
        <hr className=" mt-10" />
        <div className="py-10">
          <h1 className="text-lg">More from {author && author.name}</h1>
          <div className=" flex items-center my-5 flex-col gap-5">
            {blogRecomendationDetails &&
              blogRecomendationDetails.map((item, index) => (
                <RecomendationCard author={author} item={item} index={index} />
              ))}
          </div>
          <br />
          <Link to={user ? `/dashboard/comradeprofile/${btoa(author?.uid)}` : `/comradeprofile/${btoa(author?.uid)}`} className="px-5 py-2 border-2 rounded-full ">
            See all from {author && author.name}
          </Link>
         
        </div>
      </div>

      <Footer />

      <Toaster />
    </div>
  );
}

export default Blog;
