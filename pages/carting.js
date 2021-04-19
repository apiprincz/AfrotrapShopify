import React, { useState, useContext, useEffect } from "react";
import IndexLayout from "../Layouts/index";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { client } from "../../util/shopify";

import Styles from "../styles/Product.module.css";

import useSWR from "swr";

/** external */

import { connect } from "react-redux";
import Cart from "../Components/shopify/cartmain.js";
import store from "../store/store";

/** */

// custom components
// import Nav from "./components/Nav";

const carting = ({ products, checkout }) => {
  // const [state, dispatch] = useContext(DataContext);
  // const { cart } = state;

  const state = store.getState();

  //   const { cart, setCart } = useState(cart);
  // const numberFormat = (value) =>
  //   new Intl.NumberFormat("en-IN", {
  //     style: "currency",
  //     currency: "USD",
  //   }).format(value);

  // useEffect(() => {
  //   dispatch(createCheckOut(checkout));
  //   // console.log(checkout);
  // }, []);
  // console.log({ products });
  // const handleSubmit = async (product, cart) => {
  //   console.log("selcted" + product);
  //   dispatch(addToCart(product, cart));
  //   // dispatch(addToCheckOut(product, cart));
  //   dispatch(notify(product, cart));
  //   // dispatch(createCheckout(product, cart));
  //   setTimeout(function () {
  //     dispatch(resetNotif(notify));
  //   }, 3000);

  //   const checkoutId = checkout.id; // ID of an existing checkout
  //   const lineItemsToAdd = [
  //     {
  //       variantId: product.variants[0].id,
  //       quantity: 5,
  //     },
  //   ];

  //   // Add an item to the checkout
  //   client.checkout
  //     .addLineItems(checkoutId, lineItemsToAdd)
  //     .then((checkout) => {
  //       // Do something with the updated checkout
  //       console.log(checkout.lineItems); // Array with one additional line item
  //     });
  // };

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
        className={` col-md-12 ${Styles.productContainer}`}
        style={{ background: "#800080eb" }}
      >
        <h1 style={{ color: "greenyellow" }}>
          <span className="text-white">Hoodies</span> / All Collections
        </h1>
        {/* <Notify /> */}
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

        <Cart
          checkout={state.checkout}
          isCartOpen={!state.isCartOpen}
          handleCartClose={handleCartClose}
          updateQuantityInCart={updateQuantityInCart}
          removeLineItemInCart={removeLineItemInCart}
        />
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

export default connect((state) => state)(carting);
