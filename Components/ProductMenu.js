import React from "react";
import { library, icon } from "@fortawesome/fontawesome-svg-core";

import { fas } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Styles from "../styles/ProductMenu.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
library.add(fas);

const ProductMenu = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const isActive = (r) => {
    if (r === router.pathname) {
      return "activex";
    } else {
      ("");
    }
  };

  const handleClick = () => {
    setShow(!show);
  };
  return (
    <div
      style={{
        background: "black",
        height: "140px",
        position: "fixed",
        padding: "100px 0px 0px",
        color: "white",
        width: "100%",
      }}
    >
      <ul
        className={`d-flex col-lg-6 justify-content-between ${Styles.productMenu}`}
        style={{ height: "100%" }}
      >
        <li className={`productSubMenu ${isActive("/collections")} `}>
          <Link href="/collections">
            <a href="/collections">All Collections</a>
          </Link>
        </li>
        <li className={` productSubMenu ${isActive("/collections/men")} `}>
          <Link href="/collections/men">
            <a href="/colllections/men">Mens</a>
          </Link>
        </li>
        <li className={`productSubMenu ${isActive("/collections/women")} `}>
          <Link href="/collections/women">
            <a href="/collections/women">Women</a>
          </Link>
        </li>
        <li className={`productSubMenu ${isActive("/collections/kids")} `}>
          <Link href="/collections/kids">
            <a href="/collections/kids">Kids</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProductMenu;
