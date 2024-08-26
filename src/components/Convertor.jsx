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
export default function Convertor() {
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState({});
  const [progressFiles, setProgressFiles] = useState({});
  const [downloadUrls, setDownloadUrls] = useState({});

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

  const handleConvert = (index) => {
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
    setTimeout(() => {
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
            doc.addImage(img, "JPEG", 10, 10);
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
    }, 3000); // Delay before starting processing
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
  };
  
  return (
    <>
      <div dir="ltr" className="flex flex-col justify-center items-center m-6">
        {files.map((fileItem, index) => (
          <>
            <Card
              key={index}
              className="flex flex-col md:flex-row items-center md:gap-3 gap-2 justify-center md:p-5 p-2 my-2 "
            >
              <IconButton size="sm" color="deep-purple"  onClick={() => handleFileRemove(index)} variant="outlined">
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
          } border-opacity-30 border-dashed mt-5 p-12 m-5 w-full`}
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
      </div>
    </>
  );

  function getSuggestedFormats(currentFormat) {
    const formats = ["jpeg", "png", "webp", "bmp", "svg", "pdf"];
    return formats.filter((format) => format !== currentFormat);
  }
}
const handleButtonClick = () => {
  document.getElementById("fileInput").click();
};
