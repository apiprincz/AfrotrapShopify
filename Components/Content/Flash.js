import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SwiperCore, { Navigation, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Styles from "../../styles/Flash.module.css";
import Fade from "react-reveal/Fade";

SwiperCore.use([A11y, Scrollbar, Navigation]);
// https://afrotrap-wears.myshopify.com/discount/FE60BR0DZVG9?redirect=%2Fcollections%2Fflash

const Flash = ({ flash }) => {
  console.log("flash" + flash);

  const discountPercent = (disc, price) => {
    console.log(disc);
    console.log(price);
    return "-" + Math.floor(((price - disc) / price) * 100) + "%";
  };
  // const images = [
  //   {
  //     large: "wait1.png",
  //     featured: "hoodiestyleredhmm.png",
  //     description: "Colo",
  //     slug: "define your true style",
  //     discountPrice: 100,
  //     price: 150,
  //     title: "Colorful Kiddies Plus",
  //     category: "kids",
  //     location: "Dallas, Texas",
  //   },
  //   {
  //     large: "wait2.png",
  //     featured: "hoodiestyleyellow.png",
  //     description:
  //       "Afrotrap yellow &amp; green with white color hoodie cap. Made with 100% cotton, high quality stitching",
  //     slug: "define your true color",
  //     discountPrice: 160,
  //     price: 180,
  //     title: "Men Exclusive",
  //     category: "men",
  //     location: "Dallas, Texas",
  //   },
  //   {
  //     large: "wait3.png",
  //     featured: "hoodiestyleredhmm.png",
  //     description:
  //       "Afrotrap red &amp; black with white color hoodie cap. Made with 100% cotton, high quality stitching",
  //     slug: "define your true style",
  //     discountPrice: 130,
  //     price: 170,
  //     title: "Patterns",
  //     category: "women",
  //     location: "Dallas, Texas",
  //   },
  //   {
  //     large: "wait4.png",
  //     featured: "hoodiestyleyellow.png",
  //     description:
  //       "Afrotrap yellow &amp; green with white color hoodie cap. Made with 100% cotton, high quality stitching",
  //     slug: "define your true color",
  //     discountPrice: 178,
  //     price: 210,
  //     title: "Styles",
  //     category: "unisex",
  //     location: "Atlanta, GA",
  //   },
  // ];
  return (
    <div className={`d-flex container-fluid ${Styles.Container}`}>
      <div
        className={`col-md-12 d-flex bg-dark position-relative text-white fs-5 ${Styles.innerContainer}`}
      >
        <div
          className={`col-lg-4 col-md-12 ${Styles.Promo}`}
          style={{ position: "relative" }}
        >
          <p> Easter Deals</p>
          <span> April. 09-10</span>
          <div className={`${Styles.PromoPitch}`}>
            <span style={{ color: "green" }}>+</span> Free delivery (Atlanta
            only)
          </div>
        </div>
        <div
          className={`col-lg-2 col-md-12 col-12 mx-auto bg-white text-dark ${Styles.SwiperContainer}`}
          style={{ height: "100%" }}
        >
          <Swiper
            spaceBetween={50}
            navigation
            loop="true"
            tag="section"
            grabCursor="true"
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
            className={`mx-auto text-center d-flex align-items-stretch col-md-12 col-12 ${Styles.Swiper}`}
          >
            {flash.map((collection, index) => {
              return (
                <SwiperSlide key={index}>
                  <div key={index}>
                    <div className="d-flex flex-column align-content-start">
                      <Link href={`/collections/flash-sales`}>
                        <a>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <img
                              src={collection.images[0].src}
                              alt="brownhoodie"
                              width="200"
                              height="200"
                              key={index}
                              style={{ margin: "0 auto" }}
                            />
                          </motion.div>
                        </a>
                      </Link>
                      <span
                        style={{
                          fontSize: "50px",
                          position: "absolute",
                          bottom: "20px",
                          right: "20px",
                          background: "white",
                          borderRadius: "50%",
                          padding: "5px",
                          color: "green",
                        }}
                      >
                        {collection.variants[0].price < 70 ? (
                          <>
                            {discountPercent(50, collection.variants[0].price)}
                          </>
                        ) : (
                          <>
                            {discountPercent(80, collection.variants[0].price)}
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="col-lg-6 col-md-12 pt-4">
          <Fade top>
            <h1> FLASH SALES</h1>
          </Fade>
          <span
            className={`text-end d-block fs-10 px-4 ${Styles.SalesPitch}`}
            style={{ color: "white" }}
          >
            Claim Juicy deals on cool designs of your choice
          </span>
        </div>
      </div>
    </div>
  );
};

export default Flash;
