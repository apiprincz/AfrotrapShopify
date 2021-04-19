import React from "react";
import Products from "./shopify/Products";
import { connect } from "react-redux";
import store from "../store/store";

class GenericProductsPage extends React.Component {
  constructor() {
    super();
    this.addVariantToCart = this.addVariantToCart.bind(this);
  }
  addVariantToCart(variantId, quantity) {
    const state = store.getState(); // state from redux store
    const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10) }];
    let checkoutId;

    if (!checkoutId) {
      checkoutId = localStorage.setItem("checkoutId", state.checkout.id);
    }
    checkoutId = localStorage.getItem("checkoutId");

    const check = state.checkout.lineItems.indexOf((item) => {
      return variantId;
    });
    // const index = _arr.indexOf(args.eventName)

    // let check;

    // if (state.checkout) {
    //   state.checkout.lineItems.every((line_item) => {
    //     return (check = line_item.id.toString() !== variantId);
    //   });
    // }
    console.log(check);
    console.log(variantId);
    if (!check) {
      return {
        type: "NOTIFY",
        payload: { fail: true, msg: "Item already added", type: "fail" },
      };
    }
    if (check)
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
  }
  render() {
    const state = store.getState(); // state from redux store
    let oProducts = (
      <Products
        products={state.products}
        client={state.client}
        addVariantToCart={this.addVariantToCart}
      />
    );
    return <div>{oProducts}</div>;
  }
}

export default connect((state) => state)(GenericProductsPage);
