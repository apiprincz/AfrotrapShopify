import React from "react";
import Styles from "../styles/Banner.module.css";
import Sliders from "../Components/Sliders";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Fade from "react-reveal/Fade";

library.add(fab, faCartPlus);

const Banner = () => {
  return (
    <div>
      <div
        className={`col-md-12 d-flex align-items-center ${Styles.Container}`}
      >
        <div className={`col-md-4 text-white ${Styles.Main}`}>
          <Fade top>
            <h1>
              The <br></br> People<span style={{ color: "yellow" }}>'</span>s{" "}
              <br></br> Hoodies Store
            </h1>
          </Fade>

          <p className="py-3">
            Your one-stop store that caters for Men, Women, Kids &amp; also{" "}
            <br className="break"></br> features hoodies of different style,
            design and color.
          </p>
          <button type="submit" class={`btn btn_white fs-4`}>
            <Link href="/collections">
              <a>SHOP NOW</a>
            </Link>
          </button>
        </div>
        <div className="col-md-7" style={{ height: "100%" }}>
          <Sliders />
        </div>
        <div
          className={`col-md-1 d-flex flex-column text-white ${Styles.social}`}
        >
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
      </div>
    </div>
  );
};

export default Banner;
