import React, { useState, useEffect } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

const UploadModal = ({ handleCloudUpload, bytesToMB }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [err, setErr] = useState(false);
  const [previewURLs, setPreviewURLs] = useState([]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    };

    const handleBeforeUnload = (event) => {
      if (selectedFiles.length > 0) {
        event.preventDefault();
        event.returnValue = "";
        const result = window.confirm("Are you sure you want to proceed?");
        if (result) {
          window.location.reload();
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedFiles]);

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const fileArray = Array.from(files);

    const validFiles = fileArray.filter((file) =>
      file.type.startsWith("image/")
    );

    if (validFiles.length > 0) {
      setSelectedFiles((selectedFiles) => [...selectedFiles, ...validFiles]);
      setErr(false);
      const urls = validFiles.map((file) => URL.createObjectURL(file));
      setPreviewURLs((previewURLs) => [...previewURLs, ...urls]);
    } else {
      setErr(true);
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    const validFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (validFiles.length > 0) {
      setSelectedFiles(validFiles);
      setErr(false);
      const urls = validFiles.map((file) => URL.createObjectURL(file));
      setPreviewURLs(urls);
    } else {
      setErr(true);
    }
  };

  const removeImage = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    const updatedURLs = previewURLs.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    setPreviewURLs(updatedURLs);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFiles.length > 0) {
      setErr(false);
      selectedFiles.forEach((file) => {
        handleCloudUpload(file);
      });
      setSelectedFiles([]);
      setShowModal(false);
    } else {
      setErr(true);
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button
          className="px-4 py-2 active:scale-90 transition-all bg-[#00aaff] text-white rounded shadow-lg focus:outline-none hover:bg-[#049ce8]"
          type="button"
        >
          New
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0 z-[10000000000000] " />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] w-[90vw] md:max-w-3xl mx-auto max-h-[85vh] translate-x-[-50%] translate-y-[-50%] z-[10000000000000000] rounded-[6px] bg-white p-[25px] shadow-md  focus:outline-none">
          <div className="flex items-center justify-between">
          <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Upload Image Files
          </AlertDialog.Title>
          <AlertDialog.Cancel asChild>
            <button className="p-2">
            <i className="fas fa-xmark text-gray-600"></i>
            </button>
          </AlertDialog.Cancel>
          </div>
          <div className="relative ">
            <div className="bg-white rounded-lg ">
              
              {selectedFiles.length > 0 ? (
                <div className="flex flex-wrap gap-2 mb-4 overflow-y-auto h-[350px]">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center flex-col ">
                      <div className="relative">
                        <img
                          src={previewURLs[index]}
                          alt="Preview"
                          className="max-h-60 rounded"
                        />
                        <button
                          className="absolute top-1 right-1 text-gray-500 hover:text-red-500 focus:outline-none"
                          onClick={() => removeImage(index)}
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
                      <p className="text-sm">{bytesToMB(file.size)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="flex items-center flex-col gap-2 mb-4 h-60 border-dashed border-2 rounded-lg border-gray-300 p-4"
                  onDrop={handleDrop}
                  onDragOver={(event) => event.preventDefault()}
                >
                  <div className="h-full w-full text-center flex flex-col items-center justify-center">
                    <img
                      className="mx-auto w-32"
                      src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                      alt="no data"
                    />
                    <span className="text-small text-gray-500">
                      Drag and Drop Image Files here, browse image files
                    </span>
                  </div>
                </div>
              )}
              <form className="flex items-center justify-center gap-2 mb-3">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-gray-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:border-0 file:bg-gray-100 file:me-4 file:py-3 file:px-4"
                />
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 focus:outline-none"
                >
                  Upload
                </button>
              </form>
              {err && (
                <span className="text-sm text-red-500">
                  *No image files selected or non-image files selected
                </span>
              )}
            </div>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default UploadModal;