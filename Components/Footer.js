import React from "react";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Styles from "../styles/Footer.module.css";
import Fade from "react-reveal/Fade";

library.add(fab, faCartPlus);

const Footer = () => {
  return (
    <>
      <div className={`col-12 px-4 ${Styles.Container}`}>
        <div
          className={`col-md-12 d-flex justify-content-around flex-wrap align-items-center py-5 ${Styles.Subscribe}`}
          style={{ background: "#32629B" }}
        >
          <Fade left>
            <p className="text-white fStyle">
              Subscribe to our newsletter <br className="break" /> to not miss
              out cool deals
            </p>
          </Fade>
          <form className="d-flex justify-content-between align-items-start flex-wrap">
            <div className="mb-3 col-12">
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter your Email"
              ></input>
              <div id="emailHelp" class="form-text text-white ">
                We'll never share your email with anyone else.
              </div>
            </div>
            <button type="submit" class={`btn mx-5 btn_colored`}>
              Subscribe
            </button>
          </form>
        </div>
        <div className="col-md-12 col-lg-12 py-3 d-flex justify-content-between flex-wrap">
          <div className={`col-md-6 col-lg-6 ${Styles.FooterCopy}`}>
            <Link href="/">
              <a href="/">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={150}
                  height={100}
                ></Image>
              </a>
            </Link>
            <p className="ftext">
              The logo, colors &amp; design belongs to Afrotrap. All rights
              reserved. <br className="break"></br> Any unauthorized use or
              alteration without permission is an offence{" "}
              <br className="break"></br> and will be sanctioned by the law
              governing the state.
            </p>
            <>
              <Link href="#">
                <a target="_blank" href="#">
                  <FontAwesomeIcon icon={["fab", "facebook"]} />
                </a>
              </Link>
              <Link href="#">
                <a target="_blank" href="#">
                  <FontAwesomeIcon icon={["fab", "instagram"]} />
                </a>
              </Link>
              <Link href="#">
                <a target="_blank" href="#">
                  <FontAwesomeIcon icon={["fab", "twitter"]} />
                </a>
              </Link>
              <Link href="#">
                <a target="_blank" href="#">
                  <FontAwesomeIcon icon={["fab", "linkedin"]} />
                </a>
              </Link>
            </>
          </div>
          <div className="col-md-6 col-lg-6 d-flex justify-content-between pt-5 flist flex-wrap">
            <div className="col-6 col-lg-4">
              <p className={Styles.footerTitle}>Shopping Online</p>
              <br></br>

              <ul>
                <li>
                  <Link href="/">
                    <a href="/">Order Status</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a href="/">Shipping and Delivery</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a href="/">Returns</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a href="/">Payments Options</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a href="/">Contact Us</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-lg-4">
              <p className={Styles.footerTitle}>Afrotrap</p>
              <br></br>

              <ul>
                <li>
                  <Link href="/">
                    <a href="/collections">Collections</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a href="/customised">Customised Design</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a href="/mono">Mono Patterns</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a href="/classic">Classic Patterns</a>
                  </Link>
                </li>
                <li>
                  <Link href="/oldies">
                    <a href="/oldies">Oldies</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-lg-4">
              <p className={Styles.footerTitle}>Contact</p>
              <br></br>
              <ul>
                <li>
                  <Link href="/">
                    <a href="/contact">stores@afrotrap.com</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a href="/">Hotline : +1 343 8873 900</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a href="/">
                      <FontAwesomeIcon
                        icon={["fas", "map-marker-alt"]}
                        style={{
                          width: "16px",
                          marginLeft: "0px",
                          marginRight: "10px",
                        }}
                      />
                      Atlanta G.A
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr></hr>

        <p className="text-center">
          DESIGN BY AFROTRAP - © 2021. ALL RIGHTS RESERVED.
        </p>
      </div>
    </>
  );
};

export default Footer;
