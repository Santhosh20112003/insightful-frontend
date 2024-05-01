import React from "react";
import { Link } from "react-router-dom";
import { AppLogo, AppName, main_links } from "../../../common/links";
import { useUserAuth } from "../../../utils/Context/UserAthenticationContext";

function Navbar() {
  const { user } = useUserAuth();

  return (
    <header className="bg-white shadow-md min-h-[10vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-5">
            <Link to="/home" className="flex items-center gap-2">
              <img className="h-10" src={AppLogo} alt={AppName} />
              <h1 className="hidden font-serif italic sm:block text-[1.8rem] text-sky-600 font-bold">
                {AppName}
              </h1>
            </Link>
            <Link
              to="/search"
              className="text-gray-500 px-2 py-2 rounded-md cursor-pointer hidden md:inline-flex"
            >
              <i className="fas fa-search"></i>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {main_links.map((link, index) => (
              <Link
                key={index}
                to={link.link}
                className={`font-medium text-gray-500
           px-2 py-2 rounded-md text-base`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/search"
              className="text-gray-500 md:hidden px-2 py-2 rounded-md cursor-pointer inline-flex"
            >
              <i className="fas fa-search"></i>
            </Link>

            <Link
              to={user ? "/dashboard" : "/getaccess"}
              className={`{user ? "" : "px-3 py-3 bg-blue-500"} font-bold md:hidden inline-flex rounded-md active:scale-90 transition-all text-white`}
            >
              {!user ? (
                <i className="fas fa-right-to-bracket text-blue-400 fa-2x"></i>
              ) : (
                <img
                  src={user.photoURL}
                  alt=""
                  className="w-10 h-10 border-2 rounded-full"
                />
              )}
            </Link>

            <Link
              to={user ? "/dashboard" : "/getaccess"}
              className={` ${
                !user ? "px-4 py-2" : "px-3 py-2"
              } font-bold hidden md:block active:scale-90 transition-all rounded-full border-2 bg-blue-500 text-white`}
            >
              {!user ? (
                `Start Writing`
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <p className="text-sm">Your Space</p>
                  <img
                    src={user.photoURL}
                    alt=""
                    className="w-8 h-8 border-2 border-blue-300 rounded-full"
                  />
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
