import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

export const Cases = () => {
  return (
    <section className="py-14">
      <div className="container mx-auto text-white font-extended flex flex-col">
        <div className="flex justify-between mb-10">
          <h1 className="self-end text-[100px] font-bold">Cases</h1>
          <span className="self-center underline">View all cases</span>
        </div>
        <Swiper
          pagination={{
            el: ".custom-pagination",
            clickable: true,
            renderBullet: (index, className) => {
              return (
                "<span class='" + className + "'>" + (index + 1) + "</span>"
              );
            },
          }}
          modules={[Pagination]}
          slidesPerView={2}
          spaceBetween={30}
          className="w-full cursor-grab"
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
        <div className="custom-pagination m-1"></div>
      </div>
    </section>
  );
};

export default Cases;
