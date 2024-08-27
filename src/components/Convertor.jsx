import {
  Card,
  CardBody,
  Typography,
  Button,
  Select,
  Option,
  Progress,
  IconButton,
} from "@material-tailwind/react";
import React, { useState } from "react";
import Lottie from "lottie-react";
import Upload from "../assets/images/upload.json";
import ImageTracer from "imagetracerjs";
import Loading from "./loading";
import jsPDF from "jspdf";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { getDocument } from "pdfjs-dist";
import { convertImageToText } from "../api/api.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Convertor() {
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState({});
  const [progressFiles, setProgressFiles] = useState({});
  const [downloadUrls, setDownloadUrls] = useState({});
  const [text, setText] = useState({});
  const notify = () => toast("متن کپی شد");
  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    processFiles(selectedFiles);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
    const droppedFiles = Array.from(event.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const processFiles = (selectedFiles) => {
    const validFiles = selectedFiles.filter(
      (file) => file.type.startsWith("image/") || file.name.endsWith(".svg")
    );
    const newFiles = validFiles.map((file) => ({
      file,
      format: file.type === "image/svg+xml" ? "svg" : file.type.split("/")[1],
      targetFormat: "",
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleTargetFormatChange = (index, format) => {
    const updatedFiles = [...files];
    updatedFiles[index].targetFormat = format;
    setFiles(updatedFiles);
  };
  const handleCopyText = (index) => {
    if (text[index]) {
      navigator.clipboard.writeText(text[index]);
    }
  };
  const handleConvert = async (index) => {
    const currentFile = files[index];
    if (!currentFile || !currentFile.targetFormat) {
      return;
    }

    // Set loading state to true
    setLoadingFiles((prevLoading) => ({
      ...prevLoading,
      [index]: true,
    }));

    // Simulate delay before processing
    setTimeout(async () => {
      setProgressFiles((prevProgress) => ({
        ...prevProgress,
        [index]: 0,
      }));

      if (currentFile.targetFormat === "svg") {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = new Image();
          img.src = e.target.result;

          img.onload = function () {
            ImageTracer.imageToSVG(img.src, (svgstr) => {
              const url =
                "data:image/svg+xml;charset=utf-8," +
                encodeURIComponent(svgstr);

              setDownloadUrls((prevUrls) => ({
                ...prevUrls,
                [index]: {
                  name: `converted-${index + 1}.svg`,
                  url,
                },
              }));

              setLoadingFiles((prevLoading) => ({
                ...prevLoading,
                [index]: false,
              }));
            });
          };
        };
        reader.readAsDataURL(currentFile.file);
      } else if (currentFile.targetFormat === "pdf") {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = new Image();
          img.src = e.target.result;
      
          img.onload = function () {
            const doc = new jsPDF();
      
            // Get image dimensions
            const imgWidth = img.width;
            const imgHeight = img.height;
      
            // Get page dimensions (A4 size)
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
      
            // Calculate aspect ratio
            const aspectRatio = imgWidth / imgHeight;
      
            // Calculate image dimensions to fit within page, maintaining aspect ratio
            let newWidth = pageWidth - 20;  // 10 units margin on each side
            let newHeight = newWidth / aspectRatio;
      
            // If the calculated height exceeds page height, adjust dimensions
            if (newHeight > pageHeight - 20) {
              newHeight = pageHeight - 20;  // 10 units margin on top and bottom
              newWidth = newHeight * aspectRatio;
            }
      
            // Center the image on the page
            const xPos = (pageWidth - newWidth) / 2;
            const yPos = (pageHeight - newHeight) / 2;
      
            // Add image to the PDF
            doc.addImage(img, "JPEG", xPos, yPos, newWidth, newHeight);
            const pdfUrl = doc.output("datauristring");
      
            setDownloadUrls((prevUrls) => ({
              ...prevUrls,
              [index]: {
                name: `converted-${index + 1}.pdf`,
                url: pdfUrl,
              },
            }));
      
            setLoadingFiles((prevLoading) => ({
              ...prevLoading,
              [index]: false,
            }));
          };
        };
        reader.readAsDataURL(currentFile.file);
      }
       else if (currentFile.targetFormat === "تبدیل عکس به متن") {
        const response = await convertImageToText(currentFile.file);
        setText((prevText) => ({
          ...prevText,
          [index]: response.text,
        }));
        setDownloadUrls((prevUrls) => ({
          ...prevUrls,
          [index]: {
            name: `extracted-text-${index + 1}.txt`,
            url: `data:text/plain;charset=utf-8,${encodeURIComponent(
              response.text
            )}`, // Adjust according to actual API response format
          },
        }));

        setLoadingFiles((prevLoading) => ({
          ...prevLoading,
          [index]: false,
        }));
      } else {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = new Image();
          img.src = e.target.result;

          img.onload = function () {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            const mimeType = `image/${currentFile.targetFormat}`;
            const convertedDataUrl = canvas.toDataURL(mimeType);

            setDownloadUrls((prevUrls) => ({
              ...prevUrls,
              [index]: {
                name: `converted-${index + 1}.${currentFile.targetFormat}`,
                url: convertedDataUrl,
              },
            }));

            setLoadingFiles((prevLoading) => ({
              ...prevLoading,
              [index]: false,
            }));
          };
        };
        reader.readAsDataURL(currentFile.file);
      }
    }, 2000); // Delay before starting processing
  };

  const handleDownload = (index) => {
    const downloadFile = downloadUrls[index];
    if (downloadFile) {
      const a = document.createElement("a");
      a.href = downloadFile.url;
      a.download = downloadFile.name;
      a.click();
    }
  };
  const handleFileRemove = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setLoadingFiles((prevLoading) => {
      const newLoading = { ...prevLoading };
      delete newLoading[index];
      return newLoading;
    });
    setProgressFiles((prevProgress) => {
      const newProgress = { ...prevProgress };
      delete newProgress[index];
      return newProgress;
    });
    setDownloadUrls((prevUrls) => {
      const newUrls = { ...prevUrls };
      delete newUrls[index];
      return newUrls;
    });
    setText((prevText) => {
      const newText = { ...prevText };
      delete newText[index];
      return newText;
    });
  };

  return (
    <>
      <div dir="ltr" className="flex flex-col justify-center items-center m-6">
        {files.map((fileItem, index) => (
          <>
            <Card
              key={index}
              className="flex flex-col  items-end  md:gap-3 gap-2 justify-center md:p-5 p-2 my-2 "
            >
              <div className="flex flex-row md:items-center items-center">
            
              <Typography className="text-center font-kalame-regular font-black text-xs md:text-sm">
              {fileItem.file.name}
                </Typography>
                <IconButton
                size="sm"
                color="deep-purple"
                className="ml-2"
                onClick={() => handleFileRemove(index)}
                variant="outlined"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </IconButton>
              </div>
             
              <div className="flex flex-row items-center md:gap-3 gap-2 justify-center md:p-2 p-0">
                <Button
                  variant="gradient"
                  color={downloadUrls[index] ? "green" : "deep-purple"}
                  className="flex justify-center md:w-20 md:h-10 h-10 w-10 font-kalame-light font-bold tracking-widest text-center"
                  loading={loadingFiles[index]}
                  onClick={
                    downloadUrls[index]
                      ? () => handleDownload(index)
                      : () => handleConvert(index)
                  }
                >
                  {downloadUrls[index] ? "دانلود" : "تبدیل"}
                </Button>

                <Select
                  color="purple"
                  label="انتخاب فرمت"
                  dir="ltr"
                  labelProps={{ className: "font-kalame-medium text-xs" }}
                  className="text-left font-kalame-medium text-xs md:text-sm"
                  value={fileItem.targetFormat}
                  onChange={(e) => handleTargetFormatChange(index, e)}
                >
                  {getSuggestedFormats(fileItem.format).map((format) => (
                    <Option
                      key={format}
                      value={format}
                      className="outline-none outline-offset-0"
                    >
                      {format.toUpperCase()}
                    </Option>
                  ))}
                </Select>
                <Typography className="text-center font-kalame-regular font-black text-xs md:text-sm">
                  به
                </Typography>
                <Typography className="text-center text-color-base font-kalame-regular font-black text-xs md:text-sm">
                  {fileItem.format.toUpperCase()}
                  {/* {fileItem.name.toUpperCase()} */}
                </Typography>
                <Typography className="text-center font-kalame-regular font-black text-xs md:text-sm">
                  تبدیل
                </Typography>
              </div>
            </Card>
            {text[index] && (
              <Card className="flex items-end md:gap-3 gap-2 md:p-5 p-2 my-2 md:w-1/3">
                 <Typography className="font-kalame-light font-black text-sm ">
                  {fileItem.file.name}   تبدیل شده فایل 
                </Typography>
                <Typography className="font-kalame-light font-black text-sm ">
                  {text[index]}
                </Typography>
                <IconButton
                  size="sm"
                  color="deep-purple"
                  onClick={() => {
                    handleCopyText(index);
                    notify();
                  }}
                  variant="outlined"
                  className="mx-auto flex justify-center items-center " // Adjust this for spacing
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                    />
                  </svg>
                </IconButton>
              </Card>
            )}

            {loadingFiles[index] ? (
              /* From Uiverse.io by jeremyssocial */
              <Loading />
            ) : null}
          </>
        ))}

        <Card
          className={`border ${
            dragging
              ? "border-purple-600 bg-deep-purple-50"
              : "border-purple-800"
          } border-opacity-30 border-dashed border-2 mt-5 p-12 m-5`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <CardBody>
            <div className="flex flex-col">
              <div className="flex flex-col justify-center items-center">
                <Lottie
                  animationData={Upload}
                  loop={true}
                  className="w-[80%] md:w-[20%]"
                />
                <Typography className="mt-3 font-kalame-medium text-color-base text-sm md:text-3xl">
                  فایل‌ها رو اینجا بارگزاری کن
                </Typography>
                <Button
                  variant="gradient"
                  color="deep-purple"
                  className="flex justify-center items-center gap-3 mt-5 w-[100%] md:w-[40%]"
                  onClick={handleButtonClick}
                >
                  <div className="flex items-center gap-3 justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                      />
                    </svg>
                    <Typography className="font-kalame-medium text-sm">
                      انتخاب فایل‌ها
                    </Typography>
                  </div>
                </Button>
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleFileSelect}
                />
              </div>
            </div>
          </CardBody>
        </Card>
        <ToastContainer
          progressStyle={{
            color: "black",
            background: "purple",
            borderRadius: "10px",
          }}
          rtl={true}
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          draggable={true}
          bodyClassName={"text-color-base font-kalame-medium "}
          position={"top-center"}
        />
      </div>
    </>
  );

  function getSuggestedFormats(currentFormat) {
    const formats = [
      "jpeg",
      "png",
      "webp",
      "bmp",
      "svg",
      "pdf",
      "تبدیل عکس به متن",
    ];
    return formats.filter((format) => format !== currentFormat);
  }
}
const handleButtonClick = () => {
  document.getElementById("fileInput").click();
};
