import { ACTIONS } from "./Actions";

const reducers = (state, action) => {
  switch (action.type) {
    case ACTIONS.NOTIFY:
      return {
        ...state,
        notify: action.payload,
      };

    case ACTIONS.ADD_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case ACTIONS.CHECKOUT:
      return {
        ...state,
        checkout: action.payload,
      };
    // case CLIENT_CREATED:
    //   return { ...state, client: action.payload };
    // case PRODUCTS_FOUND:
    //   return { ...state, clientproducts: action.payload };
    // case CHECKOUT_FOUND:
    //   return { ...state, checkout: action.payload };
    // case SHOP_FOUND:
    //   return { ...state, shop: action.payload };
    // case ADD_VARIANT_TO_CART:
    //   return {
    //     ...state,
    //     isCartOpen: action.payload.isCartOpen,
    //     checkout: action.payload.checkout,
    //   };
    // case UPDATE_QUANTITY_IN_CART:
    //   return { ...state, checkout: action.payload.checkout };
    // case REMOVE_LINE_ITEM_IN_CART:
    //   return { ...state, checkout: action.payload.checkout };
    // case OPEN_CART:
    //   return { ...state, isCartOpen: true };
    // case CLOSE_CART:
    //   return { ...state, isCartOpen: false };
    default:
      return state;
  }
};

export default reducers;
