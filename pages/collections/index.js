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
import { addToCart, addToCheckOut, createCheckOut } from "../../store/Actions";
import { notify } from "../../store/Actions";
import { getData } from "../../util/fetchData.js";
import Notify from "../../Components/Notify";
import Styles from "../../styles/Product.module.css";
import { DataContext } from "../../store/GlobalState";
import { resetNotif } from "../../store/Actions";
import useSWR from "swr";
import { connect } from "react-redux";
import store from "../../store/store";

/** external */

// import { connect } from "react-redux";
// import Cart from "../cart";
// import store from "../../store/store";

/** */

// custom components
// import Nav from "./components/Nav";
import GenericProductsPage from "../../Components/GenericProductsPage";

const index = ({ products, checkout }) => {
  const state = store.getState();

  /**external */

  const updateQuantityInCart = (lineItemId, quantity) => {
    // state; // state from redux store
    const state = store.getState(); // state from redux store
    const checkoutId = state.checkout.id;
    // const checkoutId = checkout.id;
    const lineItemsToUpdate = [
      { id: lineItemId, quantity: parseInt(quantity, 10) },
    ];
    client.checkout
      .updateLineItems(checkoutId, lineItemsToUpdate)
      .then((res) => {
        store.dispatch({
          type: "UPDATE_QUANTITY_IN_CART",
          payload: { checkout: res },
        });
      });
  };
  const removeLineItemInCart = (lineItemId) => {
    const state = store.getState(); // state from redux store
    const checkoutId = state.checkout.id;
    client.checkout.removeLineItems(checkoutId, [lineItemId]).then((res) => {
      store.dispatch({
        type: "REMOVE_LINE_ITEM_IN_CART",
        payload: { checkout: res },
      });
    });
  };
  const handleCartClose = () => {
    store.dispatch({ type: "CLOSE_CART" });
  };
  const handleCartOpen = () => {
    store.dispatch({ type: "OPEN_CART" });
  };

  /** external */

  return (
    <IndexLayout>
      <div
        className={` col-md-12 ${Styles.ProductMainContainer}`}
        style={{ background: "#800080eb" }}
      >
        <h1
          style={{ color: "greenyellow" }}
          className={`${Styles.ProductHeroText}`}
        >
          <span className="text-white">Hoodies</span> / All Collections
        </h1>
        <Notify />
        {/* <div className={` col-md-12 ${Styles.productContainer}`}>
          {products.map((product, index) => {
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
                          background: "radial-gradient(#ffffffb5, transparent)",
                          color: "lemonchiffon",
                          border: "1px solid",
                        }}
                        onClick={() => handleSubmit(product, cart)}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
         </div> */}
        {/* <div id="collection-component-1618132192498"></div> */}

        {/* <Cart
          checkout={state.checkout}
          isCartOpen={state.isCartOpen}
          handleCartClose={handleCartClose}
          updateQuantityInCart={updateQuantityInCart}
          removeLineItemInCart={removeLineItemInCart}
        /> */}
        <GenericProductsPage />
      </div>
    </IndexLayout>
  );
};

// export async function getServerSideProps(context) {
//   const products = await client.product.fetchAll();

//   console.log({ products });

//   const checkout = await client.checkout.create();

//   return {
//     props: {
//       products: JSON.parse(JSON.stringify(products)),
//       checkout: JSON.parse(JSON.stringify(checkout)),
//     },
//   };
// }
// export async function getServerSideProps(context) {
//   const collections = await client.collection.fetchAllWithProducts();
//   //   const data = await res.json();
//   // console.log({ products });
//   // res = JSON.stringify(res.winners)
//   const checkout = await client.checkout.create();

//   return {
//     props: {
//       products: JSON.parse(JSON.stringify(collections[0].products)),
//       checkout: JSON.parse(JSON.stringify(checkout)),

//       // result: res.result,
//     }, // will be passed to the page component as props
//   };
// }

export default connect((state) => state)(index);
