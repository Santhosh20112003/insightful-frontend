import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useUserAuth } from "../../../utils/Context/UserAthenticationContext";
import toast, { Toaster } from 'react-hot-toast';
import Request from "../../../utils/Axios/config";
import * as Tooltip from "@radix-ui/react-tooltip";
import BlogCard from "./Card/BlogCard";

function ComradeProfile() {
  const { user } = useUserAuth();
  const param = useParams();
  const useridentity = atob(param.useridentity);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const ToggleComrade = async () => {
    setDisabled(true);
    try {
      const response = await Request.post("/comrade/addandremovecomrade", {
        uid: user.uid,
        comradeid: useridentity,
      });

      if (response.status === 200) {
        console.log("Comrade toggled successfully");
        setDetails((prev) => ({
          ...prev,
          iscomrade: !details?.iscomrade,
        }));
        
        toast.success(
          `You are now ${!details?.iscomrade ? "" : "not"} comrades`
        );
      } else {
        throw new Error("Failed to toggle comrade");
      }
    } catch (error) {
      console.error("Error toggling comrade:", error);
    } finally {
      setDisabled(false);
    }
  };

  const fetchComradeDetails = async () => {
    try {
      setLoading(true);
      const response = await Request.post(
        `/comrade/authenticated/getcomradedetails/${useridentity}`,
        {
          userid: user.uid,
        }
      );

      if (response.status === 200) {
        setDetails(response.data);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching comrade details:", error);
      toast.error("Unable to fetch Comrade Details", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      return <Navigate to={`/comradeprofile/${useridentity}`} />;
    }

    if (!details) {
      fetchComradeDetails();
    }
  }, [useridentity,user]);

  return (
    <div className="w-full min-h-screen">
      {details && (
        <div className="grid grid-cols-1 pt-10 mx-5 lg:mx-20 gap-10 min-h-screen h-full lg:grid-cols-3">
          <span className="lg:col-span-2 divide-y-2">
            <div className="flex flex-col gap-5">
              <span className="flex items-center gap-3 lg:pb-8  lg:pt-5">
                <img
                  src={details.photourl}
                  alt={details.name}
                  className="w-12 h-12 select-none rounded-full lg:hidden border-2 shadow"
                />
                <span className="">
                  <h1 className="lg:text-3xl capitalize font-semibold text-gray-700">
                    {details.name}
                  </h1>
                  <h1 className="lg:text-xl mt-2 capitalize  text-gray-500">
                    I'm a {details.designation}
                  </h1>
                </span>
              </span>
              <span className="flex lg:hidden items-center gap-3 pb-5">
                {details.iscomrade ? (
                  <button
                    disabled={disabled}
                    onClick={ToggleComrade}
                    className="px-12 active:scale-90 transition-all text-sm border-blue-500  disabled:bg-gray  py-2 border bg-blue-400 text-white rounded-full"
                  >
                    Comrade
                  </button>
                ) : (
                  <button
                    disabled={disabled}
                    onClick={ToggleComrade}
                    className="px-8 active:scale-90 transition-all text-sm border-gray-500  disabled:bg-gray  py-2 border bg-gray-500 text-white rounded-full"
                  >
                    Add comrade
                  </button>
                )}

                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <span className="bg-blue-200 p-2 active:scale-90 transition-all rounded-full">
                        <i className="fa-solid  text-blue-500 fa-envelope-circle-check ms-0.5"></i>
                      </span>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-gray-500 border border-gray-200 bg-gray-100 select-none rounded-[4px] px-[15px] py-[10px] text-[15px] leading-none shadow-md will-change-[transform,opacity]"
                        side={"bottom"}
                        sideOffset={5}
                      >
                        send mail to comrade
                        <Tooltip.Arrow className="fill-gray-300 " />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </span>
            </div>
            <div className="">
              <h1 className="my-5 text-2xl text-gray-500 font-bold">
                {" "}
                {details.posts?.length} posts published
              </h1>
              {details.posts.map((post, index) => (
                <BlogCard details={details} item={post} index={index} />
              ))}
            </div>
          </span>
          <span className="col-span-1  hidden lg:block">
            <span className="sticky top-5  right-0">
              <img
                src={details.photourl}
                alt={details.name}
                className="w-16 h-16 select-none rounded-full mb-3 border-2 shadow"
              />
              <h1 className="text-xl font-medium text-gray-700">
                {details.name}
              </h1>
              <h3 className="text-base mb-3 text-gray-500">
                {details.comrades?.length} Comrades
              </h3>
              <span className="flex items-center gap-3">
                {details.iscomrade ? (
                  <button
                    disabled={disabled}
                    onClick={ToggleComrade}
                    className="px-12 active:scale-90 transition-all text-sm border-blue-500  disabled:bg-gray  py-2 border bg-blue-400 text-white rounded-full"
                  >
                    Comrade
                  </button>
                ) : (
                  <button
                    disabled={disabled}
                    onClick={ToggleComrade}
                    className="px-8 active:scale-90 transition-all text-sm border-gray-500  disabled:bg-gray  py-2 border bg-gray-500 text-white rounded-full"
                  >
                    Add comrade
                  </button>
                )}

                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <Link to={`mailto:${details.email}`} className="bg-blue-200 p-2 active:scale-90 transition-all rounded-full">
                        <i className="fa-solid  text-blue-500 fa-envelope-circle-check ms-0.5"></i>
                      </Link>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-gray-500 border border-gray-200 bg-gray-100 select-none rounded-[4px] px-[15px] py-[10px] text-[15px] leading-none shadow-md will-change-[transform,opacity]"
                        side={"bottom"}
                        sideOffset={5}
                      >
                        send mail to comrade
                        <Tooltip.Arrow className="fill-gray-300 " />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </span>
            </span>
          </span>
        </div>
      )}
      <Toaster />
    </div>
  );
}

export default ComradeProfile;
