import React from "react";
import {
  Navbar,
  Typography,

} from "@material-tailwind/react";

import logo from '../../public/fav.svg'

 
export function MegaMenuDefault() {
  const [openNav, setOpenNav] = React.useState(false);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
  return (
    <Navbar className="mx-auto w-[98%] px-4 py-2 mt-2 border border-purple-800 border-opacity-30 overflow-hidden">
      <div className="flex items-center justify-between text-blue-gray-900">
      <div className="flex items-center">
    <img src={logo} alt="convertino" width={20}/>
        <Typography
          as="a"
          href="https://convertino.ir/newblog/"
          variant="h5"
          className="mr-1 cursor-pointer py-1.5 lg:ml-2 font-morabba-bold"
        >
          بلاگ
        </Typography>
    </div>
       <div className="flex items-center">
       <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2 font-morabba-bold"
        >
       پشتیبانی
        </Typography>
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2 font-morabba-bold"
        >
       ورود
        </Typography>
       </div>
        
      </div>
     
    </Navbar>
  );
}