import React from "react";
import { MegaMenuDefault } from "../components/Navbar";
import Convertor from "../components/convertor";
import Emoji from "../assets/images/emoji.json";
import Lottie from "lottie-react";
import Footer from "../components/Footer";
import VideoContent from "../components/ui/viderContent";
import ImageContent1 from "../components/ui/imageContent1";
import ImageContent2 from "../components/ui/imageContent2";
import ImageContent3 from "../components/ui/imageContent3";
import Starter from "../assets/images/pic4.svg";
function Home() {
  return (
  <div className="relative">
      <>
      <MegaMenuDefault />
      <div className="text-center  md:mt-20">
        

        
      </div>
      <div className="flex justify-center items-center md:flex-row flex-col ">
        <Convertor />
        <p className="font-bold font-kalame-medium text-xl md:text-2xl mt-5 text-color-base ">
        <div className="flex justify-start items-center">
        <Lottie animationData={Emoji} loop={true} className="w-24" />
          <h1 className="font-bold font-morabba-bold text-xl md:text-2xl text-color-base ">
          تبدیل فایل
          </h1>
          
        </div>
        توی اینجا میتونی هر فایلی رو تبدیل کنی
        <img src={Starter} alt="zipic" srcset="" className="w-80 mx-auto"/>
        </p>
       
      </div>
      
      <VideoContent />
      <ImageContent1/>
      <ImageContent2/>
      <ImageContent3/>
      <Footer/>
      <div className="flex justify-center">
     
      </div>
      
    </>
  </div>

  );
}

export default Home;
