import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../../utils/Context/UserAthenticationContext";
import "../../../common/cancel.css";

const Hero = () => {
  const { user } = useUserAuth();
  const splineViewerRef = useRef(null);

  useEffect(() => {
    if (splineViewerRef.current && splineViewerRef.current.shadowRoot) {
      const style = document.createElement('style');
      style.innerHTML = '#logo { opacity: 0 !important;} #spline{border-radius: 20px;}';

      splineViewerRef.current.shadowRoot.appendChild(style);
    }
  }, [splineViewerRef]);

  return (
    <section className="text-gray-600 body-font">
      <div className="min-h-[60vh] md:min-h-[65vh] mx-auto flex px-5 lg:px-14 pt-14 md:flex-row lg:pb-14 flex-col-reverse gap-10 lg:gap-0 items-center justify-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="sm:text-4xl text-3xl mb-2 font-bold font-sans text-gray-700 leading-8">
          Ignite Your Creativity on This Dynamic Expression Platform!
          </h1>
          <h2 className=" text-xl mb-5 font-normal text-gray-500 leading-8">Join our vibrant community where coding enthusiasts unite to share insights, stay ahead of the curve, and cultivate their careers. Experience a dynamic space where innovation thrives, connections flourish, and opportunities for growth abound.</h2>

          <Link
            to="/getaccess"
            className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded-full text-lg"
          >
            {user ? "Your Space" : "Start Writing"}
          </Link>
        </div>
        <div className="block lg:max-w-lg rounded-[20px] bg-gray-200 lg:h-[70vh] lg:w-full md:w-1/2 w-full">
          <spline-viewer
            ref={splineViewerRef}
            url="https://prod.spline.design/CvM4xX3gLoGiZEA5/scene.splinecode"
            className="w-full h-full"
          ></spline-viewer>
        </div>
      </div>
    </section>
  );
};

export default Hero;