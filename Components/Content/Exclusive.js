import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SwiperCore, { Navigation, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useWindowResize } from "../../util/windowResize";
import Styles from "../../styles/Exclusive.module.css";
import Fade from "react-reveal/Fade";

// install Swiper modules
SwiperCore.use([A11y, Scrollbar, Navigation]);

const Exclusive = ({ exclusive }) => {
  console.log(exclusive);
  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "USD",
    }).format(value);
  const { width } = useWindowResize();
  const breakpoint = 1000;
  return (
    <div className={`mx-auto col-md-11 col-12 ${Styles.Container}`}>
      {exclusive.length > 0 ? (
        <>
          <div
            className={`text-white d-flex justify-content-between col-md-12 ${Styles.hero}`}
          >
            <div
              className="col-md-6 col-12 fs-3 px-2"
              style={{ borderRadius: "30px" }}
            >
              <p className="mb-0 pStyle ">
                <div className={`${Styles.heroText}`}>The </div>
                <span
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "30px",
                    display: "inline-block",
                    height: "100%",
                    color: "black",
                    padding: "14px",
                    fontWeight: "700",
                  }}
                >
                  {" "}
                  Exclusive Offers{" "}
                </span>{" "}
                <div className={`${Styles.heroText}`}>
                  <span>you are waiting for!</span>
                </div>
              </p>
            </div>
            <Fade left>
              <Link href="/colections">
                <a
                  href="/collections"
                  className="fs-5 p-2 btn-desk"
                  style={{ color: "blue" }}
                >
                  Visit Our Store
                  <FontAwesomeIcon icon={["fas", "caret-right"]} />
                </a>
              </Link>
            </Fade>
          </div>
          <div className={`d-flex col-md-12 col-12  ${Styles.SwiperContainer}`}>
            <Swiper
              spaceBetween={50}
              navigation
              loop="true"
              tag="section"
              grabCursor="true"
              autoplay={{
                delay: 3000,
              }}
              on={{
                slideChangeTransitionEnd: function () {
                  if (this.isEnd) {
                    this.navigation.$nextEl.css("display", "none");
                  } else {
                    this.navigation.$nextEl.css("display", "block");
                  }
                },
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
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 50,
                },
              }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
              className="mx-auto text-center d-flex align-items-stretch overflow-hidden swiper_ex"
            >
              {exclusive.map((collection, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div
                      className="col-12 col-md-12 p-2 flex-1"
                      style={{
                        border: "1px solid #707070",
                        minHeight: "400px",
                      }}
                    >
                      <div className="d-flex flex-column align-content-start">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <img
                            src={`${collection.images[0].src}`}
                            alt="exclusive deels"
                            width="200"
                            height="200"
                            key={index}
                            style={{ margin: "0 auto", width: "90%" }}
                          />
                        </motion.div>
                        <div className="px-4 pt-2 text-start">
                          <h5 className="mb-0 ">{collection.title}</h5>
                          <p style={{ color: "blueviolet" }}>
                            Worth :{" "}
                            {numberFormat(
                              collection.variants[0].price * 100 -
                                15 * collection.variants[0].price
                            )}
                          </p>
                          <p>Total Items: 100 pieces</p>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                              <Link
                                href={`/collections/${collection.variants[0].selectedOptions[1].value}`}
                              >
                                <a>
                                  <FontAwesomeIcon
                                    icon={["fas", "compress-arrows-alt"]}
                                    style={{
                                      width: "14px",
                                      marginLeft: "0px",
                                      marginRight: "3px",
                                    }}
                                  />{" "}
                                  {
                                    collection.variants[0].selectedOptions[1]
                                      .value
                                  }
                                </a>
                              </Link>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link href="/collections}">
                                <a>
                                  <FontAwesomeIcon
                                    icon={["fas", "map-marker-alt"]}
                                    style={{
                                      width: "14px",
                                      marginLeft: "0px",
                                      marginRight: "3px",
                                    }}
                                  />{" "}
                                  Dallas Texas
                                </a>
                              </Link>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between pt-4">
                            <p>Details</p>

                            <Link href={`/collections/${collection.id}`}>
                              <a
                                style={{
                                  padding: "10px",
                                  background: "black",
                                  color: "#FFF",
                                  border: "1px solid grey",
                                }}
                              >
                                Buy Now
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>

                  // <div>
                  //   <img
                  //     src={`${collection.images[0].src}`}
                  //     alt="exclusive deels"
                  //     key={index}
                  //   />
                  //   ;
                  // </div>
                );
              })}
            </Swiper>
          </div>
          <Fade left>
            <Link href="/collections">
              <a
                href="/product"
                className="fs-5 p-2 btn-mobile"
                style={{ color: "blue" }}
              >
                Visit Our Store
                <FontAwesomeIcon icon={["fas", "caret-right"]} />
              </a>
            </Link>
          </Fade>
        </>
      ) : (
        <div className="text-center">
          <h1>Watch this Space</h1>
        </div>
      )}
    </div>
  );
};

export default Exclusive;
