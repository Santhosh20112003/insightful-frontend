import React, { createContext, useContext, useEffect, useState } from "react";
import { getMetadata, listAll, ref } from "firebase/storage";
import { storage } from "../firebase/firebase";
import { useUserAuth } from "./UserAthenticationContext";
import Request from "../Axios/config";
import { designationArray } from "../../common/links";
import toast, { Toaster } from "react-hot-toast";

const useMetaDetails = createContext();

export function MetaDetails({ children }) {
  const { user } = useUserAuth();
  const [close, setClose] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [Show, setShow] = useState(false);
  const [LastView, setLastView] = useState(true);
  const [HandpickLoading, setHandpickLoading] = useState(true);
  const [designation, setDesignation] = useState("");
  const [comrades, setComrades] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comradesDetails, setcomradesDetails] = useState([]);
  const [bookmarksDetails, setbookmarksDetails] = useState([]);
  const [handpicks, setHandpicks] = useState([]);
  const [UserDesignation,setUserDesignation]= useState("");

  const calculateTotalFileSize = async () => {
    try {
      const storageRef = ref(storage, user.email);
      const files = await listAll(storageRef);

      let totalSize = 0;
      let imgCount = 0;

      for (const file of files.items) {
        const metadata = await getMetadata(file);
        totalSize += metadata.size;

        if (metadata.contentType.startsWith("image/")) {
          imgCount += 1;
        }
      }
    } catch (error) {
      console.error("Error calculating total file size:", error);
    }
  };

  const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    useEffect(() => {
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    return (
      <button
        className={`fixed bottom-20 z-[100000] py-2 px-3.5 bg-[#21212180] text-white rounded-full left-5 ${
          isVisible ? "" : "hidden"
        }`}
        onClick={scrollToTop}
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    );
  };

  const DesignationPopup = () => {
  
    const handleNext = async () => {
      try{
        if (UserDesignation) {
          const response = await Request.post("/auth/setdesignation", {
            uid: user.uid,
            designation: UserDesignation,
          });
          if (response.status === 200) {
            setNewUser(false);
          }
        } else {
          toast("Please select a designation", { position: "top-center",icon:"i" });
        }
      }
      catch(err){
        console.log("Error While  Handling Next Button",err);
        toast.error("Error While Updating Designation",{position:"top-center"})
      }
    };

    const handleSkip =  async () => {
      try{
        const response = await Request.post("/auth/setdesignation",{
          uid:user.uid,
          designation:"Hobbyist"
        });
        if(response.status == 200){
          setNewUser(false);
        }
      }
      catch(err){
        console.log("Error While  Handling Next Button",err);
        toast.error("Error While Updating Designation",{position:"top-center"})
      }
    };
  
    return (
      <>
        <div className="fixed inset-0 bg-zinc-900 bg-opacity-50 overflow-y-auto h-full w-full z-[100000]">
          <div className="relative top-1/2 transform -translate-y-1/2 mx-auto p-5 border w-fit shadow-lg rounded-md bg-white" id="modal-content">
            <div className="mt-3 px-6 text-center flex items-center justify-center flex-col divide-y-2 divide-gray-300">
              <h3 className="text-xl mb-5 leading-6 font-medium text-zinc-900">
                What describes you best?
              </h3>
              <span className="">
                <div className="mt-2 grid grid-cols-3 gap-5 py-3">
                  {designationArray.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setUserDesignation(item)}
                      className={`${UserDesignation === item ? "bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"} font-bold px-5 py-2 rounded-md`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <span className="flex items-center justify-center mt-5 gap-3">
                  <button
                    onClick={handleNext}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Finish
                  </button>
                  <button
                    onClick={handleSkip}
                    className="text-gray-500 underline font-bold rounded-full"
                  >
                    Skip
                  </button>
                </span>
              </span>
            </div>
          </div>
        </div>
      </>
    );
  };

  const value = {
    close,
    setClose,
    calculateTotalFileSize,
    designation,
    setDesignation,
    comrades,
    setComrades,
    bookmarks,
    setBookmarks,
    posts,
    setPosts,
    handpicks,
    setHandpicks,
    comradesDetails,
    setcomradesDetails,
    bookmarksDetails,
    setbookmarksDetails,
    setNewUser,
    newUser,
    ScrollToTop,
    DesignationPopup,
    Show,
    setShow,
    HandpickLoading,
    setHandpickLoading,
    setLastView,
    LastView
  };

  return (
    <useMetaDetails.Provider value={value}>{children}</useMetaDetails.Provider>
  );
}

export function useDetails() {
  return useContext(useMetaDetails);
}
