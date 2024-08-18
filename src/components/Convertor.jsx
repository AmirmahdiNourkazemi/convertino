import { Card, CardBody, Typography, Button, Select, Option } from "@material-tailwind/react";
import React, { useState } from "react";
import Lottie from "lottie-react";
import Upload from "../assets/images/upload.json";

export default function Convertor() {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [imageFormat, setImageFormat] = useState("");
  const [targetFormat, setTargetFormat] = useState("");

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    processFile(selectedFile);
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
    const droppedFile = event.dataTransfer.files[0];
    processFile(droppedFile);
  };

  const processFile = (file) => {
    setFile(file);
    if (file && (file.type.startsWith("image/") || file.name.endsWith(".svg"))) {
      setIsImage(true);
      const format = file.type === "image/svg+xml" ? "svg" : file.type.split("/")[1];
      setImageFormat(format);
    } else {
      setIsImage(false);
    }
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const getSuggestedFormats = () => {
    const formats = ["jpeg", "png", "webp", "bmp", "svg"];
    return formats.filter((format) => format !== imageFormat);
  };

  const handleConvert = () => {
    if (!file || !targetFormat) {
      return;
    }

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

        const mimeType = `image/${targetFormat}`;
        const convertedDataUrl = canvas.toDataURL(mimeType);

        // Trigger download
        const a = document.createElement("a");
        a.href = convertedDataUrl;
        a.download = `converted.${targetFormat}`;
        a.click();
      };
    };

    reader.readAsDataURL(file);
  };

  return (
    <Card
      className={`border ${
        dragging ? "border-purple-600 bg-deep-purple-50" : "border-purple-800"
      } border-opacity-30 border-dashed mt-5 p-12 m-5 w-[80%] md:w-[50%]`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CardBody>
        <div className="flex justify-center flex-col items-center">
          {!isImage && (
            <>
              <Lottie
                animationData={Upload}
                loop={true}
                className="w-[80%] md:w-[20%]"
              />
              <Typography className="mt-3 font-kalame-medium text-text-base text-sm md:text-3xl">
                فایل رو اینجا بارگزاری کن
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
                    انتخاب فایل
                  </Typography>
                </div>
              </Button>
              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={handleFileSelect}
              />
            </>
          )}
          {file && isImage && (
            <div className="flex flex-col items-center">
              <Typography className="mt-3 text-center text-sm md:text-lg text-gray-600">
                فایل انتخاب شده: {file.name} ({imageFormat.toUpperCase()})
              </Typography>
              <Select label="تبدیل به فرمت" className="font-kalame-medium border border-deep-purple-500" value={targetFormat} onChange={(e) => setTargetFormat(e)}>
                {getSuggestedFormats().map((format) => (
                  <Option key={format} value={format}>
                    {format.toUpperCase()}
                  </Option>
                ))}
              </Select>
              <Button
                variant="gradient"
                color="deep-purple"
                className="flex justify-center items-center gap-3 mt-5 w-[100%] md:w-[100%]"
                onClick={handleConvert}
              >
                <div className="flex items-center gap-3 justify-center">
                  <Typography className="font-kalame-medium text-sm">
                   تبدیل
                  </Typography>
                </div>
              </Button>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
