import React from "react";
import "../../../../common/cancel.css";

function PreviewComponent({ image, title, tags, content, user }) {
  return (
    <div className="mt-3">
      <div className="mb-4">
        {image && (
          <img
            src={image}
            alt="Preview"
            className="w-full max-h-96 object-cover rounded-lg"
          />
        )}
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div
        className="no-tailwindcss"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>

      <div className="flex flex-wrap mt-3 gap-2">
        {tags &&
          tags.map((item, index) => (
            <span key={index} className="bg-gray-200 px-5 py-2 rounded-full">
              {item}
            </span>
          ))}
      </div>

      <div className="flex items-center mt-5 space-x-3">
        <img
          src={user.photoURL}
          alt={user.displayName}
          className="w-12 h-12 rounded-full"
        />
        <span className="flex flex-col items-start justify-center">
          <p className="text-lg m-0 font-semibold">{user.displayName}</p>
          <p className="text-gray-500 m-0">{user.email}</p>
        </span>
      </div>
    </div>
  );
}

export default PreviewComponent;
