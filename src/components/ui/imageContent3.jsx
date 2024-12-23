
import pic1 from "../../assets/images/pic3.svg";


const ImageContent3 = () => {
    return (
      <section className="flex justify-center items-center flex-col-reverse md:flex-row mt-16 md:gap-x-32 ">
        <div className="mb-8 md:mb-0">
          <img src={pic1} alt="convertino" className="w-80"/>
        </div>
        <div>
          <h3 className="font-kalame-medium text-grey text-base md:text-xl font-bold text-right">
          حذف اشیا از عکس{" "}
          </h3>
          <p className="font-kalame-regular max-w-96 text-right mt-6 mb-5 text-xs/6 md:text-sm/6 font-light text-gray-700 font-irm">
          اگر اشیا ناخواسته یا وارترماکی در عکس شما وجود دارد که میخواهید آن را پاک کنید، با ابزار حذف اشیا از عکس کانورتینو تنها در چند ثانیه میتوانید به تصویر دلخواه خود برسید.    
 </p>
        </div>
      </section>
    );
  };
  
  export default ImageContent3;
  