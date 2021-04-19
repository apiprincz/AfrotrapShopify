import React from "react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFlip,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";

// install Swiper modules
SwiperCore.use([Pagination, A11y, Autoplay, EffectFlip]);

const Sliders = () => {
  return (
    <Swiper
      spaceBetween={50}
      pagination={{ clickable: true }}
      loop={{ clickable: true }}
      tag="section"
      effect="flip"
      grabCursor="true"
      slidesPerView="1"
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 40,
        },
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 1,
          spaceBetween: 50,
        },
      }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      <SwiperSlide
        style={{
          backgroundImage: `url(/banner/man1.png)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
          width: "100%",
        }}
      ></SwiperSlide>
      <SwiperSlide
        style={{
          backgroundImage: `url(/banner/man2.png)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
          width: "100%",
        }}
      ></SwiperSlide>

      <SwiperSlide
        style={{
          backgroundImage: `url(/banner/man1.png)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
          width: "100%",
        }}
      ></SwiperSlide>
      <SwiperSlide
        style={{
          backgroundImage: `url(/banner/man2.png)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
          width: "100%",
        }}
      ></SwiperSlide>
    </Swiper>
  );
};

export default Sliders;
