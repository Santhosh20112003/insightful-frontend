import React, { useEffect, useState } from "react";
import {
  ref,
  listAll,
  getDownloadURL,
  getMetadata,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../../utils/firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import { useUserAuth } from "../../../utils/Context/UserAthenticationContext";
import { Link, Outlet, useLocation } from "react-router-dom";
import * as Tabs from "@radix-ui/react-tabs";
import * as Dialog from "@radix-ui/react-dialog";
import UploadModal from "../blog/components/UploadModel";
import toast, { Toaster } from "react-hot-toast";
import {
  background_url,
  background_url2,
  cloudpoint_link,
  profile_banner,
  santechapi_link,
} from "../../../common/links";
import { useDetails } from "../../../utils/Context/MetaDetails";
import { getCurrentTimeInUTCFormat } from "../../../common/methods";

const Profile = () => {
  const { designation } = useDetails();
  const [CloudOpen, setCloudOpen] = useState(true);
  const [ApiOpen, setApiOpen] = useState(true);
  const { user } = useUserAuth();
  const location = useLocation();
  const [imgUrl, setImgUrl] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleCloudUpload = async (file) => {
    try {
      setUploading(true);
      const filename = file.name;
      const imgRef = ref(storage, `${user.email}/insightful/${filename}`);
      const uploadTask = uploadBytes(imgRef, file);

      const snapshot = await uploadTask;
      const url = await getDownloadURL(snapshot.ref);

      const newImage = {
        url,
        id: uuidv4(),
        name: filename,
        size: file.size,
        timeCreated: getCurrentTimeInUTCFormat(),
        contentType: file.type,
        showDropdown: false,
      };

      toast.promise(
        Promise.resolve(snapshot),
        {
          pending: "Uploading file...",
          success: "File uploaded successfully!",
          error: "Failed to upload file",
        },
        {
          position: "top-center",
          theme: "light",
        }
      );

      setImgUrl((prevImages) =>
        [...prevImages, newImage].sort(
          (a, b) => new Date(b.timeCreated) - new Date(a.timeCreated)
        )
      );
      setUploading(false);
    } catch (error) {
      if (error.code === "storage/object-not-found") {
        console.error("Error uploading file: Object not found", error);
        toast.error("Failed to upload image: Object not found", {
          position: "top-center",
        });
      } else {
        setUploading(false);
        console.error("Error uploading file:", error);
        toast.error("Failed to upload image", { position: "top-center" });
      }
    }
  };

  const bytesToMB = (bytes) => {
    if (bytes === 0) return "0 MB";
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;

    const megabytes = bytes / (1024 * 1024);
    return `${megabytes.toFixed(2)} MB`;
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesRef = ref(storage, `${user.email}/insightful`);
        const imagesList = await listAll(imagesRef);
        const urls = await Promise.all(
          imagesList.items.map(async (item) => {
            const url = await getDownloadURL(item);
            const metadata = await getMetadata(item);
            return {
              url,
              id: uuidv4(),
              name: metadata.name,
              size: metadata.size,
              timeCreated: metadata.timeCreated,
              contentType: metadata.contentType,
              showDropdown: false,
            };
          })
        );
        urls.sort((a, b) => new Date(b.timeCreated) - new Date(a.timeCreated));
        setImgUrl(urls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [user]);

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="relative flex min-h-[200px] md:min-h-[220px] md:h-[220px] w-full justify-center bg-cover">
        <img
          src={profile_banner}
          className="absolute flex h-full w-full justify-center brightness-75 bg-gray-300"
          alt="Profile Banner"
        />

        <span className="hidden break-all md:block z-20 absolute left-[158px] -bottom-10 mt-3">
          <h4 className="text-xl font-bold text-gray-700 inline-flex items-center leading-none">
            {user.uid}{" "}
            <span className="bg-gray-200 ml-2 px-2 py-1 text-sm rounded-xl text-gray-600">
              userid
            </span>
          </h4>
        </span>
        <div className="absolute -bottom-12 md:-bottom-16 md:left-[30px] flex h-28 w-28 items-center justify-center rounded-full border-[4px] border-white">
          {user.photoURL && (
            <img
              className="h-full bg-gray-300 w-full rounded-full"
              src={user.photoURL}
              alt="User Avatar"
            />
          )}
          {user.providerData &&
            user.providerData[0] &&
            user.providerData[0].providerId && (
              <img
                src={
                  user.providerData[0].providerId === "google.com"
                    ? "https://ik.imagekit.io/vituepzjm/kisspng-google-logo-logo-logo-5ade7dc753b015.9317679115245306313428.jpg?updatedAt=1713005614549"
                    : "https://ik.imagekit.io/vituepzjm/kisspng-github-computer-icons-icon-design-github-5ab8a31e334e73.4114704215220498222102.jpg?updatedAt=1713005982507"
                }
                alt="verified"
                className="absolute bg-gray-300 -bottom-1 border-4 border-white right-0 w-7 h-7 rounded-full"
              />
            )}
        </div>
      </div>

      <span className="md:mt-20 mt-16 px-4 md:ms-10">
        <h4 className=" md:hidden break-all font-bold text-gray-700 mb-3 text-center">
          {user.uid}{" "}
        </h4>
        <h4 className="md:text-xl break-all md:text-start text-center font-bold text-gray-700">
          {user.displayName}
        </h4>
        <h4 className="md:text-md mb-3 break-all md:text-start text-center font-semibold text-gray-500">
          {user.email}
        </h4>
        <span className="flex items-center md:justify-start justify-center">
          <h4 className="md:text-base bg-sky-300 w-fit px-5 py-2 rounded-full break-all md:text-start text-center font-semibold text-sky-800">
            {designation}
          </h4>
        </span>
      </span>

      {(ApiOpen || CloudOpen) && (
        <div className="lg:ms-20 flex flex-wrap items-center justify-center flex-col gap-5  lg:flex-row lg:justify-start mt-10 ">
          <div
            className={`relative bg-gray-200 rounded-md  w-[90%] ${
              CloudOpen ? "flex" : "hidden"
            } lg:w-[40%] h-44 `}
          >
            <img
              src={background_url}
              alt="Profile Banner"
              className="h-full shadow-inner w-full rounded-md object-cover brightness-[70%]"
            />

            <button
              onClick={() => {
                setCloudOpen(!CloudOpen);
              }}
              className="absolute top-3 bg-[#21212180] active:bg-gray-600 active:scale-90 transition-all p-1 rounded-full right-3 text-gray-50 hover:text-white focus:outline-none"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <Dialog.Root>
              <Dialog.Trigger asChild>
                <span className="absolute cursor-pointer w-[95%] h-[65%] flex flex-col justify-end items-start bottom-3 left-5">
                  <h1 className="text-2xl font-bold text-white">
                    Your CloudPoint Space
                  </h1>
                  <p className="text-base  text-gray-50">
                    Where Your Image Assets are Stored
                  </p>
                </span>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="bg-[#21212120] inline-flex data-[state=open]:animate-overlayShow fixed inset-0 z-[1000]" />
                <Dialog.Content className="data-[state=open]:animate-contentShow overflow-y-auto fixed top-1/2 inline-flex left-1/2 h-[90vh] lg:h-[85vh] z-[1000] flex-col w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-5 shadow focus:outline-none">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-2">
                      <img src={cloudpoint_link} alt="" className="h-16" />
                      <h1 className="text-xl">Your Image Assets</h1>
                    </span>
                    <UploadModal
                      handleCloudUpload={handleCloudUpload}
                      bytesToMB={bytesToMB}
                    />
                  </div>
                  <div className="flex mt-3 flex-wrap items-center gap-5 ">
                    {imgUrl.length > 0 ? (
                      imgUrl.map((item, index) => (
                        <img
                          onClick={(e) => e.currentTarget.requestFullscreen()}
                          src={item.url}
                          key={index}
                          alt={item.name}
                          className="h-44 rounded-md mb-3 shadow-lg bg-white brightness-95"
                        />
                      ))
                    ) : (
                      <div className="h-[50vh] w-full text-center flex flex-col items-center justify-center">
                        <img
                          className="mx-auto w-32"
                          src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                          alt="no data"
                        />
                        <span className="text-small text-gray-500">
                          Not Yet Uploaded Images
                        </span>
                      </div>
                    )}
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>

          <div
            className={`relative bg-gray-200 rounded-md w-[90%] ${
              ApiOpen ? "flex" : "hidden"
            } lg:w-[40%] h-44 `}
          >
            <img
              src={background_url2}
              alt="Profile Banner"
              className="h-full w-full rounded-md object-cover brightness-75"
            />

            <button
              onClick={() => {
                setApiOpen(!ApiOpen);
              }}
              className="absolute top-3 bg-[#21212180] active:bg-gray-600 active:scale-90 transition-all p-1 rounded-full right-3 text-gray-50 hover:text-white focus:outline-none"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Link
              to={santechapi_link}
              target="_blank"
              className="absolute cursor-pointer w-[95%] h-[65%]  flex flex-col justify-end items-start bottom-3 left-5"
            >
              <h1 className="text-2xl font-bold text-white">API Access</h1>
              <p className="text-base  text-gray-50">
                Access Your Blog Via SanTech ApiHub
              </p>
            </Link>
          </div>
        </div>
      )}

      <Tabs.Root className="flex flex-col mt-20 w-full" defaultValue="Posts">
        <Tabs.List
          className="shrink-0 flex border-b lg:mx-12"
          aria-label="Manage your account"
        >
          <Link className="cursor-pointer" to="/dashboard/profile/posts">
            <Tabs.Trigger
              className={`tab-trigger px-5 lg:px-0 lg:w-44 bg-white py-3 text-base leading-none select-none  outline-none  ${
                location.pathname.includes("/posts")
                  ? "border-b-2 border-blue-500 text-gray-700 font-bold"
                  : "text-gray-500 "
              }`}
              value="Posts"
            >
              Posts
            </Tabs.Trigger>
          </Link>
          <Link className="cursor-pointer" to="/dashboard/profile/comrades">
            <Tabs.Trigger
              className={`tab-trigger px-5 lg:px-0 lg:w-44 bg-white py-3 text-base leading-none select-none  outline-none ${
                location.pathname.includes("/comrades")
                  ? "border-b-2 border-blue-500 text-gray-700 font-bold"
                  : "text-gray-500"
              }`}
              value="Posts"
            >
              Comrades
            </Tabs.Trigger>
          </Link>
          <Link className="cursor-pointer" to="/dashboard/profile/bookmarks">
            <Tabs.Trigger
              className={`tab-trigger px-5 lg:px-0 lg:w-44  bg-white py-3 text-base leading-none select-none  outline-none ${
                location.pathname.includes("/bookmarks")
                  ? "border-b-2 border-blue-500 text-gray-700 font-bold"
                  : "text-gray-500"
              }`}
              value="Posts"
            >
              BookMarks
            </Tabs.Trigger>
          </Link>
        </Tabs.List>

        <div className="min-h-[60vh]">
          <Outlet />
        </div>
      </Tabs.Root>

      <Toaster />
    </div>
  );
};

export default Profile;
