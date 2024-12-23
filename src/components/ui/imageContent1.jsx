import pic1 from "../../assets/images/pic1.svg";

const ImageContent1 = () => {
  return (
    <section className="flex justify-center items-center flex-col md:flex-row mt-16 md:gap-x-32 ">
      <div className="mb-8 md:mb-0">
        <img src={pic1} alt="convertino" className="w-80" />
      </div>
      <div>
        <h3 className="font-kalame-medium text-grey text-base md:text-xl font-bold text-right">
          تبدیل عکس به پی دی اف{" "}
        </h3>
        <p className="font-kalame-regular max-w-96 text-right mt-6 mb-5 text-xs/6 md:text-sm/6 font-light text-gray-700 font-irm">
          با تبدیل عکس به پی دی اف آنلاین میتوانید به سادگی و بدون نیاز به هیچ
          برنامه ای عکس های خود را به فرمت پی دی اف تبدیل کنید. تبدیل عکس به پی
          دی اف کانورتینو به خصوص برای کسانی که میخواهند چندین تصویر را به پی دی
          اف تبدیل کنند مناسب است. کنید.
        </p>
      </div>
    </section>
  );
};

export default ImageContent1;
