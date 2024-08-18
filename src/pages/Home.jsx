import React from "react";
import { MegaMenuDefault } from "../components/Navbar";
import Convertor from "../components/convertor";
import Sticker from "../assets/images/Star-Struck.png";

function Home() {
  return (
    <>
      <MegaMenuDefault />
      <div className="text-center mt-8 md:mt-20">
        <h1 className="font-bold font-morabba-bold text-3xl md:text-7xl text-text-base ">
          تبدیل فایل 😎
        </h1>

        <p className="font-bold font-kalame-medium text-xl md:text-3xl mt-5 text-text-base">
          توی اینجا میتونی هر فایلی رو تبدیل کنی
        </p>
      </div>
     <div className="flex justify-center">
     <Convertor />
     </div>
    </>
  );
}

export default Home;
