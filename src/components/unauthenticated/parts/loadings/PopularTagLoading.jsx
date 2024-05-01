import React from "react";

function PopularTagLoading({count}) {
  return (
    <div className="flex items-center justify-start gap-5 flex-wrap">
	 {[...Array(count)].map((_, index) => (
      <div key={index} class="text-md px-10 w-20 py-5 rounded-full bg-gray-200 font-semibold animate-pulse"></div>
	 ))}
    </div>
  );
}

export default PopularTagLoading;
