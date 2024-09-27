import React from "react";
import { motion } from "framer-motion";
function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 1.1 }}
      className="grid col-span-1 md:grid-cols-2 items-center  border-2"
    >
      <div className="col-span-1 flex flex-col justify-center items-center ">
        <div>
          <div className="flex items-center gap-1">
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
            <p className="text-[18px]">OUR BESTSELLERS</p>
          </div>
          <h1 className="text-[60px]">Latest Arrivals</h1>
          <div className="flex items-center gap-1">
            <p className="text-[18px]">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <img src="header_img.png" alt="" />
      </div>
    </motion.div>
  );
}

export default Hero;
