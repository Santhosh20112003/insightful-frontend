import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppLogo,
  AppName,
  Designation_Login,
  Name_Login,
  Profile_Santhosh,
  Quotes_Login,
  random_login_img,
} from "../../common/links";
import { useUserAuth } from "../../utils/Context/UserAthenticationContext";
import HCaptcha from '@hcaptcha/react-hcaptcha';
import {hcaptcha_site_key} from "../../common/recaptcha";

function GetAccess() {
  const { googleSignIn, githubSignIn } = useUserAuth();
  const [err, setErr] = useState("");
  const [captchaVerified, setCatchaVerified] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setErr("");
    setIsLoading(true);
    try {
      if (captchaVerified) {
        await googleSignIn();
        navigate("/dashboard");
      } else {
        throw new Error("Please Verify the CAPTCHA");
      }
    } catch (error) {
      setErr(error.message.replace("Firebase:", "").replace(".", ""));
    }
    setIsLoading(false);
  };

  const handleGitHubSignIn = async () => {
    setErr("");
    setIsLoading(true);
    try {
      if (captchaVerified) {
        await githubSignIn();
        navigate("/dashboard");
      } else {
        throw new Error("Please Verify the CAPTCHA");
      }
    } catch (error) {
      setErr(error.message.replace("Firebase:", "").replace(".", ""));
    }
    setIsLoading(false);
  };

  return (
    <div className="text-gray-500">
      <div className="flex flex-col lg:flex-row h-screen">
        <div className="lg:w-1/3 w-full min-w-[300px] h-full lg:h-screen flex flex-col justify-between">
          <Link to={"/home"} className="h-[10%] flex items-center p-5 gap-2">
            <img src={AppLogo} alt={AppName} className="w-8 h-8" />
            <h1 className="text-xl font-bold italic font-serif">{AppName}</h1>
          </Link>
          <div className="flex px-3 text-center flex-col justify-center items-center h-[90%] mb-20 lg:mb-10">
            <h1 className="text-2xl font-semibold font-sans mb-3">
              Welcome back
            </h1>
            <p className="text-sm mb-3">
              Get into {AppName} with your Google or Facebook account.
            </p>

            {err && <p className="text-center text-sm text-red-500">{err}</p>}

            <div className="flex flex-col max-w-md space-y-5">
              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="flex active:scale-95 transition-all items-center mt-5 justify-center rounded-lg border border-[#5195ee] font-medium text-white"
              >
                <span className="px-3 w-[10%] py-2 inline-flex items-center justify-center rounded-s-lg bg-white">
                  <img
                    className="w-5"
                    alt="G"
                    src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                  />
                </span>
                <span className="px-10 py-2 w-[90%] bg-[#5195ee] rounded-e-lg">
                  Sign In with Google
                </span>
              </button>
              <div className="flex justify-center text-gray-800 items-center">
                <span className="w-full border border-gray-500"></span>
                <span className="px-4">Or</span>
                <span className="w-full border border-gray-500"></span>
              </div>
              <button
                onClick={handleGitHubSignIn}
                disabled={isLoading}
                className="flex active:scale-95 transition-all items-center mt-3 justify-center rounded-lg border border-[#010409] font-medium text-white"
              >
                <span className="px-3 w-[10%] py-2 inline-flex items-center justify-center rounded-s-lg bg-white">
                  <img
                    className="w-5"
                    alt="G"
                    src="https://ik.imagekit.io/vituepzjm/github-mark.svg"
                  />
                </span>
                <span className="px-10 py-2 w-[90%] bg-[#010409] rounded-e-lg">
                  Sign In with GitHub
                </span>
              </button>
              <HCaptcha
                onVerify={() => {
                  setCatchaVerified(true);
                }}
                sitekey={hcaptcha_site_key}
              />
            </div>

            <p className="px-3 mt-5 text-xs">
              *By signing in you accept the {AppName}{" "}
              <Link to="/terms-of-use" className="underline">
                Terms of Service
              </Link>
            </p>
          </div>
        </div>

        <div className="lg:w-2/3 h-full lg:h-screen relative bg-slate-300 hidden lg:block">
          <img
            src={random_login_img}
            alt=""
            className="w-full brightness-50 h-full"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-xl font-sans italic font-semibold text-gray-200 mb-5 lg:mb-0">
              "{Quotes_Login}"
            </h1>
            <div className="flex items-center mt-3 justify-center lg:justify-start">
              <img
                src={Profile_Santhosh}
                alt="Profile"
                className="w-9 h-9 bg-gray-400 rounded-full brightness-95"
              />
              <div className="ml-3">
                <h1 className="text-sm font-bold text-white">{Name_Login}</h1>
                <p className="text-xs font-semibold text-gray-300">
                  {Designation_Login}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetAccess;