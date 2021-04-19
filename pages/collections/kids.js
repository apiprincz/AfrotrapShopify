import React, { useState, useContext, useEffect } from "react";
import IndexLayout from "../../Layouts/index";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { client } from "../../util/shopify";

import { useWindowResize } from "../../util/windowResize";
import { addToCart } from "../../store/Actions";
import { notify } from "../../store/Actions";
import { getData } from "../../util/fetchData.js";
// import Notify from "../../Components/Notify";
import Styles from "../../styles/Product.module.css";
import { DataContext } from "../../store/GlobalState";
import { resetNotif } from "../../store/Actions";
import { connect } from "react-redux";
import store from "../../store/store";

const kids = ({ products }) => {
  const [state, dispatch] = useContext(DataContext);
  const { cart } = state;
  let variantQuantity = 1;

  //   const { cart, setCart } = useState(cart);
  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "USD",
    }).format(value);

  const handleSubmit = (product, cart) => {
    dispatch(addToCart(product, cart));
    dispatch(notify(product, cart));
    setTimeout(function () {
      dispatch(resetNotif(notify));
    }, 3000);
  };
  const addVariantToCart = (product, quantity) => {
    const state = store.getState(); // state from redux store
    // console.log({ s: selectedVariant.id });
    // console.log({ s: selectedVariant.selectedVariant });
    console.log({ p: product.variants[0].id });
    console.log({ p: product });

    const lineItemsToAdd = [
      {
        variantId:
          product.variants[0].id ||
          variant.id ||
          selectedVariant.selectedVariant.id,
        quantity: parseInt(quantity, 10),
      },
    ];
    let checkoutId;

    console.log({ s: selectedVariant });
    console.log({ p: product.variants[0] });

    if (!checkoutId) {
      checkoutId = localStorage.setItem("checkoutId", state.checkout.id);
    }
    checkoutId = localStorage.getItem("checkoutId");

    // const check = state.checkout.lineItems.indexOf((item) => {
    //   return variantId;
    // });

    state.client.checkout
      .addLineItems(checkoutId, lineItemsToAdd)
      .then((res) => {
        store.dispatch({
          type: "ADD_VARIANT_TO_CART",
          payload: { isCartOpen: true, checkout: res },
        });
      });

    return {
      type: "NOTIFY",
      payload: { success: true, type: "success", msg: "Item added to cart" },
    };
  };
  return (
    <IndexLayout>
      <div
        className={`px-5 ${Styles.ProductMainContainer}`}
        style={{ paddingTop: "180px", background: "#800080eb" }}
      >
        <h1
          style={{ color: "greenyellow" }}
          className={`${Styles.ProductHeroText}`}
        >
          <span className="text-white">Hoodies</span> /Kid's Collections
        </h1>
        {/* <Notify /> */}
        <div className={` col-md-12 ${Styles.productContainer}`}>
          {products
            .filter(
              (product) =>
                product.variants[0].selectedOptions[1].value === "kids"
            )
            .map((product, index) => {
              return (
                <div
                  key={index}
                  style={{
                    border: "2px solid #FFFFFF",
                    //   minHeight: "400px",
                  }}
                  className={` col-md-4 ${Styles.product} pb-2`}
                >
                  <div className="d-flex flex-column align-content-start ">
                    <img
                      src={product.images[0].src}
                      alt="brownhoodie"
                      key={index}
                      style={{ height: "240px" }}
                    />

                    <div className="px-4 pt-2 text-start text-white">
                      <Link href={`/collections/${product.id}`}>
                        <a
                          className="mb-0 link-product link-title"
                          style={{ whiteSpace: "break-spaces" }}
                        >
                          {product.title}
                        </a>
                      </Link>
                      <p>
                        <Link href={`/collections/${product.id}`}>
                          <a className="link-product">
                            {numberFormat(product.variants[0].price)}
                          </a>
                        </Link>
                      </p>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                          <p>
                            <FontAwesomeIcon
                              icon={["fas", "compress-arrows-alt"]}
                              style={{
                                width: "14px",
                                marginLeft: "0px",
                                marginRight: "3px",
                              }}
                            />{" "}
                            {product.variants[0].selectedOptions[1].value}
                          </p>
                        </div>
                        <div className="d-flex align-items-center">
                          <p>
                            <FontAwesomeIcon
                              icon={["fas", "map-marker-alt"]}
                              style={{
                                width: "14px",
                                marginLeft: "0px",
                                marginRight: "3px",
                              }}
                            />{" "}
                            Dallas, Texas
                          </p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between pt-4">
                        <Link href={`/collections/${product.id}`}>
                          <a className="link-product">Details</a>
                        </Link>
                        <button
                          style={{
                            padding: "10px",
                            background:
                              "radial-gradient(#ffffffb5, transparent)",
                            color: "lemonchiffon",
                            border: "1px solid",
                          }}
                          onClick={() =>
                            addVariantToCart(product, variantQuantity)
                          }
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </IndexLayout>
  );
};

export async function getServerSideProps(context) {
  const products = await client.product.fetchAll();
  //   const data = await res.json();
  console.log({ products });
  // res = JSON.stringify(res.winners)

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      // result: res.result,
    }, // will be passed to the page component as props
  };
}

export default connect((state) => state)(kids);
