import React, { Component } from "react";
import LineItem from "../Components/shopify/LineItem";
import { connect } from "react-redux";
import { client } from "../util/shopify";
import IndexLayout from "../Layouts/index";
import { useRouter } from "next/router";
import Notify from "../Components/Notify";

import store from "../store/store";

const cart = () => {
  const state = store.getState();
  const router = useRouter();
  console.log(state.checkout.lineItems);
  // console.log(state.checkout.lineItems[0].id.toString());
  const updateQuantityInCart = (lineItemId, quantity) => {
    // state; // state from redux store
    const state = store.getState(); // state from redux store
    const checkoutId = state.checkout.id;

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

  const openCheckout = () => {
    window.open(state.checkout.webUrl);
  };

  let line_items;

  if (state.checkout) {
    line_items = state.checkout.lineItems.map((line_item) => {
      return (
        <LineItem
          updateQuantityInCart={updateQuantityInCart}
          removeLineItemInCart={removeLineItemInCart}
          key={line_item.id.toString()}
          line_item={line_item}
        />
      );
    });
  } else {
    line_items = <p>Loading...</p>;
  }

  return (
    <IndexLayout>
      <div className={`Cart`}>
        <Notify />
        <header className="Cart__header">
          <h2>Your cart</h2>
          <button onClick={handleCartClose} className="Cart__close">
            ×
          </button>
        </header>
        <ul className="Cart__line-items">{line_items}</ul>
        <footer className="Cart__footer">
          <div className="Cart-info clearfix">
            <div className="Cart-info__total Cart-info__small">Subtotal</div>
            {state.checkout && (
              <div className="Cart-info__pricing">
                <span className="pricing">
                  $ {state.checkout.subtotalPrice}
                </span>
              </div>
            )}
          </div>
          <div className="Cart-info clearfix">
            <div className="Cart-info__total Cart-info__small">Taxes</div>
            {state.checkout && (
              <div className="Cart-info__pricing">
                <span className="pricing">$ {state.checkout.totalTax}</span>
              </div>
            )}
          </div>
          <div className="Cart-info clearfix">
            <div className="Cart-info__total Cart-info__small">Total</div>
            {state.checkout && (
              <div className="Cart-info__pricing">
                <span className="pricing">$ {state.checkout.totalPrice}</span>
              </div>
            )}
          </div>

          <button className="Cart__checkout button" onClick={openCheckout}>
            Checkout
          </button>
        </footer>
      </div>
    </IndexLayout>
  );
};

export default connect((state) => state)(cart);
