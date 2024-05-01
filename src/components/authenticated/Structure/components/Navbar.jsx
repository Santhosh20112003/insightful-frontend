import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppLogo,
  AppName,
  dashboard_links,
  main_links,
} from "../../../../common/links";
import { useUserAuth } from "../../../../utils/Context/UserAthenticationContext";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [Open, setOpen] = useState(false);
  const { user, logOut } = useUserAuth();
  const location = useLocation();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-full mx-auto px-4 lg:ps-10 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="mt-1.5">
            <button
              onClick={() => {
                setOpen(!Open);
              }}
              className="lg:hidden"
            >
              <i className="fas text-2xl fa-bars-staggered text-gray-500"></i>
            </button>
          </span>
          <Link to="/home" className="flex items-center  gap-2">
            <img className="h-10" src={AppLogo} alt={AppName} />
            <h1 className="hidden font-serif italic lg:block text-[1.8rem] text-sky-600 font-bold">
              {AppName}
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:gap-8 ">
          <Link
            to="search"
            className="text-gray-500 p-2 mt-1 rounded-md cursor-pointer"
          >
            <i className="fas text-xl fa-search"></i>
          </Link>

          <div className="lg:flex hidden gap-5 items-center">
            {dashboard_links.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className={`text-gray-500 hover:text-blue-500 ${
                  location.pathname.includes(item.link)
                    ? "underline underline-offset-2"
                    : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="relative">
            <div
              onClick={toggleDropdown}
              className="flex items-center cursor-pointer"
            >
              <div className="h-12 w-12 rounded-full border border-gray-300 flex items-center justify-center text-white md:text-3xl text-2xl text-center">
                <img
                  src={user.photoURL}
                  alt="user_logo"
                  className="h-10 w-10 rounded-full text-xs bg-gray-400"
                />
              </div>
            </div>
            {isDropdownOpen && (
              <div className="absolute z-50 top-full right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                 
                  <Link
                    to="/dashboard/profile/posts"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={toggleDropdown}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logOut();
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 text-start w-40 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={` lg:items-center bg-[#73737330] w-[100vw] lg:hidden lg:pb-0 pb-8 fixed lg:static lg:z-auto top-0 h-[100vh]  z-[1000000000]   lg:bg-transparent  transition-all flex items-center justify-start duration-500 ease-in ${
          Open ? "left-0 z-[-1]" : "left-[-110vw] z-[-1]"
        }`}
      >
        <div className="bg-gray-300 border-e-2 border-gray-400 shadow-2xl text-gray-800 h-full max-w-[600px] min-w-[250px] w-[80%]">
          <div className="pt-10 md:px-12 px-6 ">
            <span className="flex items-center justify-between">
              <h1 className="font-semibold text-2xl">Insightful</h1>
              <button onClick={() => setOpen(!Open)} >
                <i className="fas mt-1 text-lg fa-xmark"></i>
              </button>
            </span>
            <div className="pt-12 flex items-start justify-center flex-col">
            {dashboard_links.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                onClick={()=>{
                  setOpen(!Open)
                }}
                className={`text-gray-700 text-2xl mb-7 ${
                  location.pathname.includes(item.link)
                    ? "underline font-semibold text-gray-800 underline-offset-8"
                    : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
            </div>
          </div>
        </div>
        <div onClick={() => setOpen(!Open)} className="h-full w-full"></div>
      </div>
    </nav>
  );
}

export default Navbar;
