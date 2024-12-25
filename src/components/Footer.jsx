import React from "react";
import {
  InstagramLogo,
  LinkedinLogo,
  TelegramLogo,
  WhatsappLogo,
} from "@phosphor-icons/react";

import vada from "../assets/images/vada.png";
import logo from "../../public/fav.svg";
const Footer = () => {
  return (
    <div dir="rtl" className="mt-20">
      <footer className="font-kalame-medium mx-auto rounded-t-xl w-full bg-white/80 shadow-lg ring-1 ring-black/5 pr-8 md:pr-20">
        <div className="mx-auto w-full p-4 py-6 lg:py-8 items-center ">
          <div className="flex justify-around gap-x-20 items-start flex-col md:flex-row">
            <div className="mb-6 md:mb-0">
              <h6 className="flex items-center gap-x-2 font-irm-medium text-lg font-black mb-3 text">
                <a href="https://convertino.ir/">
                  <img src={logo} alt="convertino" width={40} height={40} />
                </a>
                کانورتینو
              </h6>
              <p className="font-irm text-xs sm:text-sm text-justify text-blue-gray-800 max-w-96 leading-5">
              تبدیل عکس به متن <br /> 
              حذف اشیا از عکس <br /> تبدیل عکس وب  <br /> تبدیل عکس به pdf
              </p>
            </div>
            <div className="grid grid-cols-2 md:flex md:gap-x-10">
              <div className="flex flex-wrap gap-x-10">
                <div>
                  <h2 className="font-irm-medium font-black text-lg mb-3 text-blue-700 xl:mt-0 md:mt-5 mt-6">
                    ما را دنبال کنید
                  </h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium flex items-center gap-x-3">
                    <li className="hover:text-blue-700 hover:scale-110 transition-all">
                      <a href="https://www.instagram.com/vada_house_of_mobile?igsh=MXFjeTEybTg0dzZ6dQ==">
                        <InstagramLogo size={32} />
                      </a>
                    </li>
                    <li className="hover:text-blue-700 hover:scale-110 transition-all">
                      <a href="https://www.linkedin.com/company/vada-house-of-mobile/">
                        <LinkedinLogo size={32} />
                      </a>
                    </li>
                    <li className="hover:text-blue-700 hover:scale-110 transition-all">
                      <a href="https://t.me/crmapps">
                        <TelegramLogo size={32} />
                      </a>
                    </li>
                    <li className="hover:text-blue-700 hover:scale-110 transition-all">
                      <a href="https://api.whatsapp.com/send/?phone=989109838553">
                        <WhatsappLogo size={32} />
                      </a>
                    </li>
                  </ul>
                  <a href="https://www.vada.ir/" className="w-40">
                    <img className="w-40" src={vada} alt="vada" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-xs md:text-sm text-gray-500 sm:text-center dark:text-gray-400 font-irm">
              Copyright © 2024 ✨ تبدیل عکس به متن | کانورتینو Powered by
            </span>

            <div className="flex mt-4 sm:justify-center sm:mt-0"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
