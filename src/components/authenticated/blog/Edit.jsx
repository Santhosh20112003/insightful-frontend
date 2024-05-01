import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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
import { Link, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import {
  cloudpoint_link,
  jarvis_link,
  jarvis_logo,
} from "../../../common/links";
import "../../../common/cancel.css";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Dialog from "@radix-ui/react-dialog";
import { modules } from "../../../common/methods";
import UploadModal from "./components/UploadModel";
import Request from "../../../utils/Axios/config";
import { useDetails } from "../../../utils/Context/MetaDetails";

function Edit() {
  const { user } = useUserAuth();
  const param = useParams();
  const blogid = atob(param.blogid);
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
        const response = await Request.post("/blog/updateblog", {
          uid: user.uid,
          email: user.email,
          image: filePreview,
          title: title,
          tag: tags,
          content: value,
          blogid: blogid,
        });

        if (response.data.message) {
          console.log(response.data.data);
          var updatedArray = posts.map((item) => {
            if (item.blogid == blogid) {
              return {
                blogid: response.data.data.blogid,
                content: response.data.data.content,
                creation_time: response.data.data.creation_time,
                email: response.data.data.email,
                image: response.data.data.image,
                tag: response.data.data.tag,
                title: response.data.data.title,
              };
            }
            return item;
          });
          setPosts(updatedArray);
          toast.success(response.data.message, { position: "top-center" });

          setValue(response.data.data.content);
          setTags(response.data.data.tag);
          setTitle(response.data.data.title);
          setFilePreview(response.data.data.image);
        } else {
          toast.error(response.data.message, { position: "top-center" });
        }
      } else {
        toast("Please fill all the fields.", { position: "top-center" });
      }
    } catch (error) {
      let errorMessage = "An error occurred while updating the blog.";
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }
      toast.error(errorMessage, { position: "top-center" });
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
        contentType: file.type,
        showDropdown: false,
      };

      toast.promise(
        Promise.resolve(snapshot),
        {
          loading: "Uploading file...",
          success: "File uploaded successfully!",
          error: "Failed to upload file",
        },
        {
          position: "top-center",
        }
      );

      setImgUrl((prevImages) => [...prevImages, newImage]);
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

  const fetchBlogDetails = async () => {
    try {
      const response = await Request.post("/blog/checkandreturn", {
        uid: user.uid,
        blogid: blogid,
      });
      setTitle(response.data.title);
      setTags(response.data.tag);
      setFilePreview(response.data.image);
      setValue(response.data.content);
    } catch (err) {
      if (err.response.status == 401) {
        window.history.back();
      }
      console.log("Error while fetching he blog details", err);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, [user]);

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
              contentType: metadata.contentType,
              showDropdown: false,
            };
          })
        );
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
          <span className="inline-flex items-center justify-center gap-3">
            <Link to={'/dashboard/profile/posts'} className="px-2.5 py-1.5 text-gray-500 active:scale-90 transition-all rounded-full bg-gray-200" >
              <i className="fas fa-arrow-left"></i>
            </Link>
            <h1 className="text-2xl hidden md:block font-semibold break-words">
              Edit Blog Post
            </h1>
          </span>
          <span className="inline-flex items-center">
            <Link
              to={jarvis_link}
              target="_blank"
              className="inline-flex px-2 py-1 text-white bg-[#0b234c] active:scale-90 transition-all h-[35px] items-center justify-center rounded-xl font-medium leading-none focus:shadow-black focus:outline-none"
            >
              <img src={jarvis_logo} alt="Jarvis" className="h-8 w-8" />
            </Link>
            <AlertDialog.Root>
              <AlertDialog.Trigger asChild>
                <button className="px-4 py-2 active:scale-90 transition-all rounded-full bg-gray-700 text-white ml-4">
                  Preview
                </button>
              </AlertDialog.Trigger>
              <AlertDialog.Portal>
                <AlertDialog.Overlay className="bg-[#21212120] inline-flex data-[state=open]:animate-overlayShow fixed inset-0 z-[1000]" />
                <AlertDialog.Content className="data-[state=open]:animate-contentShow overflow-y-auto fixed top-1/2 inline-flex left-1/2 h-[90vh] lg:h-[85vh] z-[1000] flex-col w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-5 shadow focus:outline-none">
                  <AlertDialog.Cancel asChild>
                    <button
                      className="text-gray-500 hover:bg-gray-200 focus:shadow-gray-500 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                      aria-label="Cancel"
                    >
                      <i className="fas fa-xmark"></i>
                    </button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Title className="text-xl">
                    Blog Preview
                  </AlertDialog.Title>

                  <div className="">
                    <PreviewComponent
                      content={value}
                      title={title}
                      tags={tags}
                      image={filePreview}
                      user={user}
                    />
                  </div>
                </AlertDialog.Content>
              </AlertDialog.Portal>
            </AlertDialog.Root>
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
                      <h1 className="text-xl">Cloud Point</h1>
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

export default Edit;
