import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { EffectFade, Navigation, Pagination } from "swiper/modules";

// slide photos

import slide1 from "../../../assets/Images/one.jpg";
import slide2 from "../../../assets/Images/two.jpg";
import slide3 from "../../../assets/Images/three.jpg";
import slide4 from "../../../assets/Images/four.jpg";

const Banner = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper  w-full max-h-screen"
      >
        <SwiperSlide className=" ">
          <div className="flex justify-center  relative w-full text-white text-center">
            <img className="w-full" src={slide4} />
            <div className="absolute flex flex-col items-center bg-gradient-to-r  from-[#151515] to-[rgba(21, 21, 21, 0)] w-full h-full  opacity-50">
              <div className="w-2/5 space-y-8  mt-60">
                <h2 className="   text-5xl  ">Soulmates Await</h2>
                <p>Join Us and Find the One Who Completes You</p>
                <button
                  type="button"
                  className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Find Person
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className=" ">
          <div className="flex justify-center  relative w-full text-white text-center">
            <img className="w-full" src={slide4} />
            <div className="absolute flex flex-col items-center bg-gradient-to-r  from-[#151515] to-[rgba(21, 21, 21, 0)] w-full h-full  opacity-50">
              <div className="w-2/5 space-y-8  mt-60">
                <h2 className="   text-5xl  ">Soulmates Await</h2>
                <p>Join Us and Find the One Who Completes You</p>
                <button
                  type="button"
                  className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Find Person
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className=" ">
          <div className="flex justify-center  relative w-full text-white text-center">
            <img className="w-full" src={slide2} />
            <div className="absolute flex flex-col items-center bg-gradient-to-r  from-[#151515] to-[rgba(21, 21, 21, 0)] w-full h-full  opacity-50">
              <div className="w-2/5 space-y-8  mt-60">
                <h2 className="   text-5xl  ">Soulmates Await</h2>
                <p>Join Us and Find the One Who Completes You</p>
                <button
                  type="button"
                  className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Find Person
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className=" ">
          <div className="flex justify-center  relative w-full text-white text-center">
            <img className="w-full" src={slide3} />
            <div className="absolute flex flex-col items-center bg-gradient-to-r  from-[#151515] to-[rgba(21, 21, 21, 0)] w-full h-full  opacity-50">
              <div className="w-2/5 space-y-8  mt-60">
                <h2 className="   text-5xl  ">Soulmates Await</h2>
                <p>Join Us and Find the One Who Completes You</p>
                <button
                  type="button"
                  className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Find Person
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className=" ">
          <div className="flex justify-center  relative w-full text-white text-center">
            <img className="w-full" src={slide1} />
            <div className="absolute flex flex-col items-center bg-gradient-to-r  from-[#151515] to-[rgba(21, 21, 21, 0)] w-full h-full  opacity-50">
              <div className="w-2/5 space-y-8  mt-60">
                <h2 className="   text-5xl  ">Soulmates Await</h2>
                <p>Join Us and Find the One Who Completes You</p>
                <button
                  type="button"
                  className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Find Person
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
