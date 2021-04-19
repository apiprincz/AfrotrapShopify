import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Styles from "../../styles/Pick.module.css";
import Fade from "react-reveal/Fade";

const Pick = ({ pick }) => {
  // console.log(props.pick);
  // const picks = JSON.parse(JSON.stringify(products, null, 4));
  // const images = [
  //   {
  //     large: "pick1.png",
  //     featured: "hoodiestyleredhmm.png",
  //     description: "Afrotrap red &amp; black ",
  //     slug: "define your true style",
  //     discountPrice: 100,
  //     price: 150,
  //   },
  //   {
  //     large: "pick2.png",
  //     featured: "hoodiestyleyellow.png",
  //     description: "Afrotrap yellow &amp; ",
  //     slug: "define your true color",
  //     discountPrice: 100,
  //     price: 150,
  //   },
  //   {
  //     large: "pick3.png",
  //     featured: "hoodiestyleredhmm.png",
  //     description: "Afrotrap red &amp",
  //     slug: "define your true style",
  //     discountPrice: 100,
  //     price: 150,
  //   },
  //   {
  //     large: "pick4.png",
  //     featured: "hoodiestyleyellow.png",
  //     description: "Afrotrap yellow &amp; ",
  //     slug: "define your true color",
  //     discountPrice: 100,
  //     price: 150,
  //   },
  //   {
  //     large: "pick5.png",
  //     featured: "hoodiestyleredhmm.png",
  //     description: "Afrotrap red &amp; ",
  //     slug: "define your true style",
  //     discountPrice: 100,
  //     price: 150,
  //   },
  // ];

  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "USD",
    }).format(value);

  const itemShowHandler = (e) => {
    e.currentTarget.style.borderBottom = "4px solid #ffffff";
    console.log(e.currentTarget.lastChild);
    e.currentTarget.lastChild.classList.add(`${Styles.ItemOverlayShow}`);
  };
  const itemRemoveHandler = (e) => {
    e.currentTarget.style.borderBottom = "";
    e.currentTarget.lastChild.classList.remove(`${Styles.ItemOverlayShow}`);
  };
  return (
    <div className={`mx-auto col-md-11 pt-5 ${Styles.PickWrapper}`}>
      <div
        className="text-white d-flex justify-content-between p-2 col-md-12"
        style={{ background: "#32629B", borderRadius: "20px" }}
      >
        <Fade left>
          <span href="/collections">Pick Of The Week</span>
        </Fade>

        <Link href="/collections">
          <a href="/collections" className="link_white">
            View All
            <FontAwesomeIcon icon={["fas", "caret-right"]} />
          </a>
        </Link>
      </div>
      <div className="d-flex col-md-12 col-12 pt-5 justify-content-between flex-wrap">
        {pick.slice(0, 7).map((item, index) => {
          return (
            <div
              key={index}
              className={`col-md-3 col-sm-6 col-12 ${Styles.Item}`}
            >
              <div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ textAlign: "center" }}
                >
                  <img
                    src={item.images[0].src}
                    alt="brownhoodie"
                    width="250"
                    height="200"
                    key={index}
                  />
                </motion.div>

                <Link href={`/collections/${item.id}`}>
                  <a className="d-block pt-3">{item.title}</a>
                </Link>
                <p className="mb-0">{numberFormat(item.variants[0].price)}</p>
                <div className="d-flex justify-content-between col-md-10">
                  <p>
                    <s>{numberFormat(10 + parseInt(item.variants[0].price))}</s>
                  </p>
                  <Link href={`/collections/${item.id}`}>
                    <a
                      style={{
                        background: "orange",
                        color: "white",
                        padding: "10px",
                      }}
                    >
                      View Details
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pick;
