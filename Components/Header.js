import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useWindowResize } from "../util/windowResize";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { DataContext } from "../store/GlobalState";
import ProductMenu from "./ProductMenu";
import store from "../store/store";

library.add(fab, faCartPlus);
library.add(fas);

const Header = () => {
  const router = useRouter();
  // const [state, dispatch] = useContext(DataContext);
  // const { cart } = state;
  const state = store.getState();

  const { width } = useWindowResize();
  const breakpoint = 1000;

  const isActive = (r) => {
    if (r === router.pathname) {
      return "active";
    }
    ("");
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg d-flex justify-content-between px-4 ">
        <Link href="/">
          <a class="navbar-brand" href="#">
            {width < breakpoint ? (
              <Image
                src="/Logo/whitelg.png"
                width={110}
                height={70}
                alt="logo"
              />
            ) : (
              <Image src="/logo.png" width={110} height={70} alt="logo" />
            )}
          </a>
        </Link>
        <div>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul
              class="navbar-nav d-flex align-items-center"
              style={{ width: "50%" }}
            >
              <li className={`nav-item ${isActive("/")}`}>
                <Link href="/">
                  <a href="/">
                    <FontAwesomeIcon icon={["fas", "home"]} />
                  </a>
                </Link>
              </li>
              <li className={`nav-item ${isActive("/collections/men")}`}>
                <Link href="/collections/men">
                  <a href="/men">Men</a>
                </Link>
              </li>
              <li className={`nav-item ${isActive("/collections/women")}`}>
                <Link href="/collections/women">
                  <a href="/collections/women">Women</a>
                </Link>
              </li>
              <li className={`nav-item ${isActive("/collections")}`}>
                <Link href="/collections">
                  <a href="/collections">Collections</a>
                </Link>
              </li>
              <li className={`nav-item ${isActive("/about")}`}>
                <Link href="/about">
                  <a href="/">About Us</a>
                </Link>
              </li>
              <li className={`nav-item ${isActive("/cart")}`}>
                <Link href="/cart">
                  <a href="#" style={{ position: "relative" }}>
                    Cart
                    <FontAwesomeIcon icon={["fas", "cart-arrow-down"]} />
                    <div className=" cart_count cart__main">
                      {state.checkout.lineItems.length}
                    </div>
                  </a>
                </Link>
              </li>
              <li className={`nav-item ${isActive("/signin")}`}>
                <Link href="/signin">
                  <a href="/">
                    Login
                    <FontAwesomeIcon icon={["fas", "sign-in-alt"]} />
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <ProductMenu />
    </div>
  );
};

export default Header;
