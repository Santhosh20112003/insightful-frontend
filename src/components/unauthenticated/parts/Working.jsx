import React from "react";

function Working() {
  return (
    <div className="flex my-14 items-center flex-col justify-center w-full lg:h-screen">
      <div className="flex p-4">
        <h2 className="lg:text-5xl text-3xl text-center  text-gray-700 font-bold mb-4">How we Works ??</h2>
      </div>
      <video
        className="w-full h-auto lg:h-[80vh] mb-5 rounded-lg"
        controls={false}
        autoPlay
        loop
        muted
      >
        <source
          src="https://ik.imagekit.io/vituepzjm/Untitled%20design.mp4?updatedAt=1712578428827"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default Working;