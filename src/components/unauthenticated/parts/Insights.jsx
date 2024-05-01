import React, { useEffect, useState } from "react";
import Request from "../../../utils/Axios/config";
import Slider from "./Components/Slider";
import SliderLoading from "./loadings/SliderLoading";

const TestimonialSlider = () => {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(false);

  const FetchBlog = async () => {
    setLoading(true);
    try {
      const { data } = await Request.get("/insights/fetch/3");
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
    <div className="w-full py-24	 bg-gradient-to-r from-blue-300 to-blue-400">
      <h1 className="text-4xl font-semibold text-center text-white pb-12">User Insights</h1>
      {!loading ? <Slider slides={blog} />: <SliderLoading count={3} />}
    </div>
  );
};

export default TestimonialSlider;
