import { client } from "../util/shopify";
export const ACTIONS = {
  NOTIFY: "NOTIFY",
  AUTH: "AUTH",
  ADD_CART: "ADD_CART",
  TOTAL: "TOTAL",
  CHECKOUT: "CHECKOUT",
  //    CLIENT_CREATED : 'CLIENT_CREATED',
  //  PRODUCTS_FOUND : 'PRODUCTS_FOUND',
  //  CHECKOUT_FOUND :'CHECKOUT_FOUND',
  //  SHOP_FOUND = 'SHOP_FOUND',
  //  ADD_VARIANT_TO_CART : 'ADD_VARIANT_TO_CART',
  //  UPDATE_QUANTITY_IN_CART : 'UPDATE_QUANTITY_IN_CART',
  //  REMOVE_LINE_ITEM_IN_CART : 'REMOVE_LINE_ITEM_IN_CART',
  //  OPEN_CART : 'OPEN_CART',
  //  CLOSE_CART : 'CLOSE_CART',
};
export const createCheckOut = (checkout) => {
  // console.log(checkout.id);
  localStorage.setItem("checkoutId", checkout.id);

  return {
    type: "CHECKOUT",
    payload: [{ ...checkout }],
  };
};
export const deleteItem = (item, cart) => {
  const newCart = cart.filter((cartItem) => {
    return cartItem.id !== item.id;
  });

  // cart = cart.splice(index, 1);

  return {
    type: "ADD_CART",
    payload: [...newCart],
  };
};

export const addToCart = (product, cart) => {
  const check = cart.every((item) => {
    return item.id !== product.id;
  });

  if (!check) {
    return {
      type: "ADD_CART",
      payload: [...cart],
    };
  }
  localStorage.setItem("item", product.id);

  return {
    type: "ADD_CART",
    payload: [...cart, { ...product, quantity: 1, msg: "item added to cart" }],
  };
};
// export const addToCheckOut = async (product, cart) => {
//   const checkoutId = localStorage.getItem("checkoutId");
//   const lineItemsToAdd = [
//     {
//       variantId: product.variants[0].id,
//       quantity: 1,
//     },
//   ];

//   // Add an item to the checkout
//   const res = await client.checkout.addLineItems(checkoutId, lineItemsToAdd);

//   console.log(res);
// };

export const notify = (product, cart) => {
  const check = cart.every((item) => {
    return item.id !== product.id;
  });

  if (!check) {
    return {
      type: "NOTIFY",
      payload: { fail: true, msg: "Item already added", type: "fail" },
    };
  }
  return {
    type: "NOTIFY",
    payload: { success: true, type: "success", msg: "Item added to cart" },
  };
};
export const notifyDel = (item, cart) => {
  const check = cart.every((cartItem) => {
    return cartItem.id !== item.id;
  });

  if (!check) {
    return {
      type: "NOTIFY",
      payload: {
        success: true,
        type: "success",
        msg: "Item deleted from cart",
      },
    };
  }
};
export const resetNotif = (notify) => {
  if (notify.success || notify.fail) {
    return {
      type: "NOTIFY",
      payload: {},
    };
  } else
    return {
      type: "NOTIFY",
      payload: { ...notify },
    };
};
export const decrease = (data, id) => {
  const newData = [...data];

  newData.forEach((item) => {
    if (item.id === id) item.quantity -= 1;
  });

  return { type: "ADD_CART", payload: newData };
};
export const increase = (data, id) => {
  const newData = [...data];

  newData.forEach((item) => {
    if (item.id === id) item.quantity += 1;
  });

  return { type: "ADD_CART", payload: newData };
};
