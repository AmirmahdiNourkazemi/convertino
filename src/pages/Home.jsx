import React from "react";
import { MegaMenuDefault } from "../components/Navbar";
import Convertor from "../components/convertor";
import Emoji from "../assets/images/emoji.json";
import Lottie from "lottie-react";

function Home() {
  return (
  <div className="relative">
      <>
      <MegaMenuDefault />
      <div className="text-center mt-8 md:mt-20">
        <div className="flex justify-center items-center">
          <h1 className="font-bold font-morabba-bold text-3xl md:text-7xl text-color-base ">
            تبدیل فایل
          </h1>
          <Lottie animationData={Emoji} loop={true} className="w-24" />
        </div>

        <p className="font-bold font-kalame-medium text-xl md:text-3xl mt-5 text-color-base">
          توی اینجا میتونی هر فایلی رو تبدیل کنی
        </p>
      </div>
      <div className="flex justify-center">
        <Convertor />
      </div>
    </>
  </div>
  );
}

export default Home;
