import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import Styles from "../styles/Mobile.module.css";

import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas, faCartPlus } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { DataContext } from "../store/GlobalState";
import store from "../store/store";

library.add(fab, faCartPlus);
library.add(fas);

const MobileNav = () => {
  const router = useRouter();
  // const [state, dispatch] = useContext(DataContext);
  // const { cart } = state;
  const state = store.getState();

  const isActive = (r) => {
    if (r === router.pathname) {
      return "active";
    }
    ("");
  };

  const menuHandler = () => {
    const menu = document.querySelector(`.${Styles.navMenu}`);

    menu.classList.toggle(`${Styles.navMenu_show}`);
  };

  return (
    <div>
      <nav
        className={`navbar navbar-expand-lg d-flex justify-content-between align-items-center px-4 ${Styles.navContainer}`}
      >
        <div className={Styles.hamburger} onClick={menuHandler}></div>

        <Link href="/">
          <a className="navbar-brand" href="#" style={{ width: "80px" }}>
            <img src="/Logo/whitelg.png" alt="logo" style={{ width: "100%" }} />
          </a>
        </Link>

        <div className={Styles.navMenu}>
          <ul
            className="navbar-nav d-flex flex-direction-column align-items-left"
            style={{ width: "100%", textAlign: "center" }}
          >
            {/* <li className={`nav-item ${isActive("/")}`}>
              <Link href="/">
                <a href="/">
                  <FontAwesomeIcon
                    icon={["fas", "home"]}
                    className="text-white"
                  />
                </a>
              </Link>
            </li> */}
            <li className={`nav-item ${isActive("/men")}`}>
              <Link href="/collections/men">
                <a href="/men" className="mobile-link">
                  Men
                </a>
              </Link>
            </li>
            <li className={`nav-item ${isActive("/women")}`}>
              <Link href="/collections/women">
                <a href="/women" className="mobile-link">
                  Women
                </a>
              </Link>
            </li>
            <li className={`nav-item ${isActive("/kids")}`}>
              <Link href="/collections">
                <a href="/collections" className="mobile-link">
                  Collections
                </a>
              </Link>
            </li>
            <li className={`nav-item ${isActive("/about")}`}>
              <Link href="/about">
                <a href="/" className="mobile-link">
                  About Us
                </a>
              </Link>
            </li>

            <li className={`nav-item ${isActive("/signin")}`}>
              <Link href="/signin">
                <a href="/" className="mobile-link">
                  Login
                  <FontAwesomeIcon icon={["fas", "sign-in-alt"]} />
                </a>
              </Link>
            </li>
          </ul>
        </div>

        <div
          className={`fs-2 text-white position-relative nav-item ${isActive(
            "/cart"
          )}`}
        >
          <Link href="/cart">
            <a href="#">
              Cart
              <FontAwesomeIcon
                icon={["fas", "cart-arrow-down"]}
                style={{ color: "#FFFFFF" }}
              />
              <div className=" cart_count">
                {state.checkout.lineItems.length}
              </div>
            </a>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default MobileNav;
