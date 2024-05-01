import React from 'react';
import { cloudPoint } from '../../../common/links';

function CloudPoint() {
  return (
    <section className="text-gray-600 body-font">
      <div className="px-5 flex lg:px-24 lg:py-12 lg:pt-16 md:flex-row flex-col items-center">
        <div className="lg:max-w-sm lg:w-full md:w-1/2 w-5/6">
          <img
            className="object-cover lg:-mr-24 bg-gray-300 object-center rounded"
            alt="hero"
            src={cloudPoint.img}
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="px-8 py-3 bg-blue-100 text-sm rounded-full mb-5 font-bold text-blue-500 uppercase">
            {cloudPoint.tag}
          </h1>
          <h1 className="title-font sm:text-3xl text-3xl capitalize mb-4 font-bold text-gray-900 ">
           {cloudPoint.title}
          </h1>
          <p className="mb-8 text-base leading-relaxed w-[80%]">
          {cloudPoint.content}
          </p>
        </div>
      </div>
    </section>
  );
}

export default CloudPoint;