import React from "react";
import { listen } from "../../../common/links";

function Listen() {
  return (
    <section className="text-gray-600 body-font">
      <div className="px-5 flex lg:px-24 py-12 lg:pt-16 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="px-8 py-3 bg-blue-100 text-sm rounded-full mb-5 font-bold text-blue-500 uppercase">
            {listen.tag}
          </h1>
          <h1 className="title-font sm:text-3xl text-3xl capitalize mb-4 font-bold text-gray-900 ">
            {listen.title}
          </h1>
          <p className="mb-8 text-base leading-relaxed w-[80%]">
          {listen.content}
          </p>
        </div>
        <div className="lg:max-w-sm lg:w-full md:w-1/2 w-5/6">
          <img
            className="object-cover lg:-ml-24 bg-gray-300 object-center rounded"
            alt="hero"
            src={listen.img}
          />
        </div>
      </div>
    </section>
  );
}

export default Listen;
