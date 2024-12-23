import pic5 from "../../assets/images/pic2.svg";

const ImageContent2 = () => {
  return (
    <section className="flex justify-center items-center flex-col-reverse md:flex-row mt-16  md:gap-x-32 ">
      <div>
        <h3 className="font-kalame-medium text-grey text-base md:text-xl font-bold text-right">
          تبدیل عکس وب{" "}
        </h3>
        <p className="font-kalame-regular max-w-96 text-right mt-6 mb-5 text-xs/6 md:text-sm/6 font-light text-gray-700 font-irm">
          با تبدیل عکس های خود به فرمت وب یا webp علاوه بر کاهش حجم و سرعت
          بارگذاری بهتر، میتوانید عکس های بهینه شده ای برای وبسایت خود داشته
          باشید. فقط کافیست در قسمت انتخاب فرمت، فرمت نهایی را روی webp بگذارید.
        </p>
      </div>
      <div className="mb-8 md:mb-0">
        <img src={pic5} alt="convertino" className="w-80" />
      </div>
    </section>
  );
};

export default ImageContent2;
