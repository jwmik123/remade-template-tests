import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/navigation";

export const Cases = () => {
  return (
    <section className="py-14">
      <div className="container mx-auto text-white font-extended flex flex-col">
        <div className="flex justify-between mb-10">
          <h1 className="text-[90px] font-medium">Cases</h1>
          <span className="self-end underline">View all cases</span>
        </div>
        <Swiper
          navigation
          modules={[Navigation]}
          slidesPerView={2}
          spaceBetween={30}
          className="w-full"
        >
          <SwiperSlide>
            <div className="w-full">
              <h3 className="text-3xl pb-5">Power Peaks</h3>
              <img src="" alt="" />
              <div className="w-full bg-pink-500 aspect-video flex items-center justify-center">
                Image Container
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full">
              <h3 className="text-3xl pb-5">Power Peaks</h3>
              <img src="" alt="" />
              <div className="w-full bg-pink-500 aspect-video flex items-center justify-center">
                Image Container
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full">
              <h3 className="text-3xl pb-5">Mik Development</h3>
              <img src="" alt="" />
              <div className="w-full bg-pink-500 aspect-video flex items-center justify-center">
                Image Container
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        {/* 
          </div>
          <div className="w-3/5">
            <h3 className="text-3xl pb-5">Mik Development</h3>
            {/* <img src="" alt="" /> 
            <div className="w-full bg-pink-500 aspect-video flex items-center justify-center">
              Image Container
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Cases;
