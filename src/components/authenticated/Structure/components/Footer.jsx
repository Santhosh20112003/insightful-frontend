import React from "react";
import { Link } from "react-router-dom";
import { AppLogo, AppName, ParentLink } from "../../../../common/links";

function Footer() {
  return (
    <footer className="text-gray-600 body-font">
      <div className="px-5 py-8 bg-gray-50 mx-auto">
        <div className="flex flex-wrap md:text-left text-center">
          <div className="lg:w-1/5  w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              LINKS
            </h2>
            <nav className="list-none mb-5">
              <li>
                <Link
                  to="/dashboard/home"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/search"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Search
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/profile"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Profile
                </Link>
              </li>
            </nav>
          </div>

          <div className="lg:w-1/5  w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              LINKS
            </h2>
            <nav className="list-none mb-5">
              <li>
                <Link
                  to="/dashboard/blog/new"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Write Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/profile/bookmarks"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Bookmarks
                </Link>
              </li>
            </nav>
          </div>

          <div className="lg:w-1/5  w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              COMPANY
            </h2>
            <nav className="list-none mb-5">
              <li>
                <Link
                  to={ParentLink}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Website
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-use"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Terms Of Use
                </Link>
              </li>
            </nav>
          </div>

          <div className="lg:w-1/4  w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              SUBSCRIBE
            </h2>
            <form
              action="https://formsubmit.co/santhoshtechnologies22@gmail.com"
              method="POST"
              className="flex flex-col md:flex-row gap-3 justify-center items-center lg:items-end"
            >
              <input
                type="text"
                id="footer-field"
                name="footer-field"
                required
                autoComplete={"email"}
                placeholder="Your Email"
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-transparent focus:ring-2 focus:ring-gray-200 focus:border-gray-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              <button className="w-full sm:w-auto text-white bg-blue-500 border-0 py-2 px-4 lg:px-6 focus:outline-none hover:bg-blue-600 rounded">
                Send&nbsp;Message
              </button>
            </form>
            <p className="text-gray-500 text-sm mt-2 ">
              * All details are required for communication.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="px-5 py-6 mx-auto flex flex-col items-center sm:flex-row">
          <span
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex title-font cursor-pointer font-medium items-center justify-center text-gray-900"
          >
            <img src={AppLogo} alt="" className="w-10 h-10" />
            <span className="ml-2 font-serif font-semibold italic text-gray-600 text-xl">
              {AppName}
            </span>
          </span>
          <p className="text-sm text-gray-500 mt-4 sm:ml-6 sm:mt-0">
            © 2024 {AppName} —
            <Link
              to={ParentLink}
              rel="noopener noreferrer"
              className="text-gray-600 ml-1"
              target="_blank"
            >
              @SanthoshTechnologies
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
