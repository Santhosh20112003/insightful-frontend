import React from "react";
import { Link } from "react-router-dom";

function ComradeCard({ item, index ,ToggleComrade }) {

  return (
    <div>
      <div
        key={index}
        className="flex transition-all cursor-pointer shadow-lg bg-gray-100 rounded-lg items-center lg:px-6 px-3 py-4"
      >
        <Link to={`/dashboard/comradeprofile/${btoa(item.uid)}`} className="flex items-center justify-center">
        <img
          className="lg:h-12 lg:w-12 h-8 w-8 border-[3px] border-gray-300 bg-gray-500 rounded-full object-cover"
          src={item.photourl}
          alt="profile"
        />
        <div className="mx-3">
          <h2 className="lg:text-lg font-semibold text-zinc-800">{item.name.length > 15 ? `${item.name.slice(0,15)}..` : item.name } </h2>
          <p className="lg:text-base text-zinc-600">{item.designation}</p>
        </div>
        </Link>
        <button onClick={()=>{ToggleComrade(item.uid)}} className="ml-auto hidden lg:flex bg-red-200 border border-red-300 text-red-500 active:scale-95 transition-all active:bg-red-300 px-4 py-1 rounded-full focus:outline-none">
          remove
        </button>
        <button onClick={()=>{ToggleComrade(item.uid)}} className="ml-auto bg-red-200 border lg:hidden border-red-300 text-red-400 active:scale-95 transition-all active:bg-red-300 px-3 py-2 rounded-lg focus:outline-none">
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
}

export default ComradeCard;
