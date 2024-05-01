import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import {
  ref,
  listAll,
  getDownloadURL,
  getMetadata,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../../utils/firebase/firebase";
import TagInput from "./components/TagInput";
import PreviewComponent from "./components/PreviewComponent";
import { useUserAuth } from "../../../utils/Context/UserAthenticationContext";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  cloudpoint_link,
  cloudpoint_logo,
  jarvis_link,
  jarvis_logo,
} from "../../../common/links";
import * as Dialog from "@radix-ui/react-dialog";
import { getCurrentTimeInUTCFormat, modules } from "../../../common/methods";
import UploadModal from "./components/UploadModel";
import Request from "../../../utils/Axios/config";
import { useDetails } from "../../../utils/Context/MetaDetails";

function NewBlog() {
  const { user } = useUserAuth();
  const { setPosts, posts } = useDetails();
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [filePreview, setFilePreview] = useState("");
  const [tags, setTags] = useState([]);
  const [imgUrl, setImgUrl] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async () => {
    try {
      if (title && tags.length > 0 && filePreview && value) {
        const response = await Request.post("/blog/createblog", {
          uid: user.uid,
          email: user.email,
          image: filePreview,
          title: title,
          tag: tags,
          content: value,
        });
        if (response.data.message) {
          toast.success(response.data.message, { position: "top-center" });
          console.log(response.data.data);
          setPosts([...posts, response.data.data[0]]);
          setValue("");
          setTags([]);
          setTitle("");
          setFilePreview("");
        } else {
          toast.error(response.data.message, { position: "top-center" });
        }
      } else {
        toast("Please fill all the fields.", {
          position: "top-center",
          icon: "📄",
        });
      }
    } catch (err) {
      toast.error(`Unable to Create Your Blog Post ${err}`, {
        position: "top-center",
      });
    }
  };

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
    <div className="container mx-auto">
      <div className="p-5 lg:mx-24">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl hidden md:block font-semibold break-words">
            Create New Post
          </h1>
          <span className="inline-flex items-center">
            <Link
              to={jarvis_link}
              target="_blank"
              className="inline-flex px-2 py-1 text-white bg-[#0b234c] active:scale-90 transition-all h-[35px] items-center justify-center rounded-xl font-medium leading-none focus:shadow-black focus:outline-none"
            >
              <img src={jarvis_logo} alt="Jarvis" className="h-8 w-8" />
            </Link>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button className="px-4 py-2 active:scale-90 transition-all rounded-full bg-gray-700 text-white ml-4">
                  Preview
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="bg-[#21212120] inline-flex data-[state=open]:animate-overlayShow fixed inset-0 z-[1000]" />
                <Dialog.Content className="data-[state=open]:animate-contentShow overflow-y-auto fixed top-1/2 inline-flex left-1/2 h-[90vh] lg:h-[85vh] z-[1000] flex-col w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-5 shadow focus:outline-none">
                  <Dialog.Title className="text-xl">Blog Preview</Dialog.Title>

                  <div className="">
                    <PreviewComponent
                      content={value}
                      title={title}
                      tags={tags}
                      image={filePreview}
                      user={user}
                    />
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </span>
        </div>
        <div className="mb-4">
          {!filePreview ? (
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button className="cursor-pointer active:scale-90 transition-all bg-gray-200 px-4 py-2 rounded-md">
                  Upload Image
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="bg-[#21212120] inline-flex data-[state=open]:animate-overlayShow fixed inset-0 z-[1000]" />
                <Dialog.Content className="data-[state=open]:animate-contentShow overflow-y-auto fixed top-1/2 inline-flex left-1/2 h-[80vh] md:h-[90vh] lg:h-[85vh] z-[1000] flex-col w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-5 shadow focus:outline-none">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-2">
                      <img src={cloudpoint_link} alt="" className="h-16" />
                      <h1 className="text-xl">Cloud Point </h1>
                    </span>
                    <UploadModal
                      handleCloudUpload={handleCloudUpload}
                      bytesToMB={bytesToMB}
                    />
                  </div>
                  <div className="flex mt-3 flex-wrap items-center gap-5 ">
                    {imgUrl.length > 0 ? (
                      imgUrl.map((item) => (
                        <Dialog.Close>
                          <img
                            onClick={() => setFilePreview(item.url)}
                            key={item.id}
                            src={item.url}
                            alt={item.name}
                            className="h-44 rounded-md mb-3 shadow-lg brightness-95"
                          />
                        </Dialog.Close>
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
          ) : (
            <div className="relative mb-4">
              <img
                src={filePreview}
                alt="Uploaded File"
                className="h-auto rounded-xl brightness-[85%] max-h-96 object-cover w-full"
              />
              <button
                onClick={() => setFilePreview("")}
                className="absolute top-3 bg-[#21212160] active:bg-gray-500 active:scale-90 transition-all p-2 rounded-full right-3 text-gray-50 hover:text-white focus:outline-none"
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
            </div>
          )}
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New Post Title Here.."
            className="text-3xl font-bold font-sans outline-none border-none placeholder:text-gray-700 py-3 break-words w-full text-black ml-2"
            id="title"
          />
        </div>
        <div className="mb-4">
          <TagInput tags={tags} setTags={setTags} />
        </div>
        <div className="w-full no-tailwindcss mt-5">
          <ReactQuill
            placeholder="Write something amazing..."
            modules={modules}
            required
            theme="snow"
            value={value}
            onChange={setValue}
            className="z-30 "
          />
        </div>
        <div className="mt-5 flex items-center justify-end">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-700 text-white"
          >
            Publish Now
          </button>
        </div>
      </div>
      <Toaster className="z-[10000000000]" />
    </div>
  );
}

export default NewBlog;
