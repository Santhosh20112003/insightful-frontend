import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "../swiper-cancel.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link, useLocation } from "react-router-dom";

function TagsCarousel({ tags, topic }) {
	const location = useLocation();
  return (
    <div className="w-fit text-sm max-w-[90vw]">
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        freeMode={true}
        className="mySwiper"
        module={[FreeMode]}
      >
        <SwiperSlide
          className={`${
            location.pathname.includes("more") ? "bg-gray-500 text-white" : "bg-gray-100"
          } px-4 py-2 text-center rounded-full`}
        >
          <Link to={`/tags/more`} className="inline-flex gap-2 items-center justify-center" > <i className="fas fa-compass"></i>  Explore topics</Link>
        </SwiperSlide>
        {tags.map((item, index) => (
          <SwiperSlide
            key={item}
            virtualIndex={index}
            className={`${
              topic === item ? "bg-gray-500 text-white" : "bg-gray-100"
            } px-5 py-2 text-center rounded-full`}
          >
            <Link to={`/tag/${btoa(item)}`}>{item}</Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default TagsCarousel;
