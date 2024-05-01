import React, { useEffect, useRef } from "react";
import Navbar from "../parts/Navbar";
import Bannar from "../parts/Bannar";
import Footer from "../parts/Footer";

function Story() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Bannar />
      <Navbar />
      <div className="w-full min-h-screen ">
        <section class="text-gray-600 body-font ">
          <div class=" mx-auto flex px-5 lg:px-24 py-6 md:flex-row flex-col items-start">
            <div class="lg:flex-grow flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
              <h1 className="text-4xl leading-10 mt-5 mb-2 text-gray-700 font-extrabold">
                Everyone has a story to tell.
              </h1>
              <h2 className="text-2xl leading-9 mb-8  text-gray-700 font-bold">
                Listen closely to the tales we share!!
              </h2>
              <p className="text-lg break-words mb-5">
                At Santhosh Technologies, we believe that everyone has a unique
                story to share. Our blogging application provides a platform for
                individuals to express their insightful perspectives, share
                valuable knowledge, and impart life wisdom without the need to
                amass a large following. In a digital world filled with noise
                and chaos, our platform offers a serene space enriched with
                profound insights.
              </p>
              <p className="text-lg break-words mb-5">
                We understand the power of words in shaping our perceptions and
                connecting us with others. While many online platforms
                prioritize sensationalism, we prioritize depth, nuance, and
                meaningful interactions. Our aim is to foster thoughtful
                conversations and promote substance over superficiality,
                ultimately contributing to a deeper collective understanding of
                the world.
              </p>
              <p className="text-lg break-words mb-5">
                With over 100 million users engaging on our platform each month,
                our community comprises a diverse range of individuals – from
                professional writers to CEOs, computer scientists, and aspiring
                novelists. They share their personal experiences, challenges,
                and knowledge, enriching the platform with a wealth of diverse
                perspectives.
              </p>
              <p className="text-lg break-words">
                At Santhosh Technologies, we do not rely on ads or sell user
                data. Instead, we are supported by a community of dedicated
                members who share our vision. Whether you are a seasoned writer
                or someone eager to share their story, our platform invites you
                to explore, learn, and contribute to the tapestry of human
                experiences. Join us in this journey of meaningful storytelling
                and knowledge-sharing. Visit our website for more information:
                Santhosh Technologies.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Story;
