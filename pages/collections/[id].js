import { useState, useEffect, useRef, useContext } from "react";
import Head from "next/head";
import ProductLayout from "../../Layouts/index";
import Link from "next/link";
import { client } from "../../util/shopify";

import { getData } from "../../util/fetchData";
import Styles from "../../styles/Product.module.css";
import { DataContext } from "../../store/GlobalState";
import { addToCart } from "../../store/Actions";
import { resetNotif } from "../../store/Actions";
import { notify } from "../../store/Actions";
import VariantSelector from "../../Components/shopify/VariantSelector";

/***external */

import { connect } from "react-redux";
import store from "../../store/store";
import { GridColumnsToolbarButton } from "@material-ui/data-grid";

const ONE_SIZE_FITS_MOST = "One Size Fits Most";

const DetailProduct = ({ product }) => {
  let defaultOptionValues = {};
  let defaultVariant = {};

  const [selectedOptions, setSelectedOptions] = useState(defaultOptionValues);
  const [selectedVariant, setSelectedVariant] = useState();
  const [selectedVariantImage, setSelectedVariantImage] = useState();
  const [selectedVariantQuantity, setSelectedVariantQuantity] = useState();

  const [tab, setTab] = useState(0);
  const [option, setOption] = useState(null);
  const [price, setPrice] = useState(null);

  const [size, setSize] = useState();

  const imgRef = useRef();
  const myRef = useRef();

  let aOptionNames = [];
  // let variantImage = selectedVariantImage || product.images[0];
  let variant = selectedVariant || product.variants[0];
  let variantQuantity = selectedVariantQuantity || 1;
  console.log({ variant });
  useEffect(() => {
    setSelectedVariant(variant);
  }, []);
  useEffect(() => {
    const images = imgRef.current.children;
    console.log(images);

    // return images;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace(
        "active",
        "img-thumbnail"
      );
    }
    images[tab].className = `${Styles.active} img-thumbnail`;
  }, [tab]);

  useEffect(() => {
    defaultOptionValues = product.options.forEach((selector) => {
      defaultOptionValues[selector.name] = selector.values[0].value;
    });
    return defaultOptionValues;
  }, []);
  useEffect(() => {
    variant = product.variants[0];

    return defaultVariant;
  }, []);

  const handleSelect = (e) => {
    setOption(e.target.value);
  };
  console.log({ selectedOptions });
  console.log(defaultOptionValues);

  const findImage = (images, variantId) => {
    const primary = images[0];

    const image = images.filter(function (image) {
      return image.variant_ids.includes(variantId);
    })[0];

    return (image || primary).src;
  };

  const handleOptionChange = (event) => {
    const target = event.target;
    console.log(target.value);
    // let selectedOptions = selectedOptions;
    // selectedOptions[target.name] = target.value;

    setSelectedOptions({ ...selectedOptions, [target.name]: target.value });

    const selectedVariant = client.product.helpers.variantForOptions(
      product,
      selectedOptions
    );

    setSelectedVariant({ selectedVariant });
    setSelectedVariantImage({ selectedVariantImage });
    console.log({ selectedVariant });
    // console.log({ selectedVariantImage });
  };

  console.log({ selectedVariant: selectedVariant });
  console.log({ productVariant: product.variants[0] });
  console.log({ product });

  const handleQuantityChange = (event) => {
    setSelectedVariantQuantity(event.target.value);
    console.log({ selectedVariantQuantity });
  };

  // const updateQuantityInCart = (lineItemId, quantity) => {
  //   // state; // state from redux store
  //   const state = store.getState(); // state from redux store
  //   const checkoutId = state.checkout.id;

  //   const lineItemsToUpdate = [
  //     { id: lineItemId, quantity: parseInt(quantity, 10) },
  //   ];
  //   client.checkout
  //     .updateLineItems(checkoutId, lineItemsToUpdate)
  //     .then((res) => {
  //       store.dispatch({
  //         type: "UPDATE_QUANTITY_IN_CART",
  //         payload: { checkout: res },
  //       });
  //     });
  // };

  console.log(selectedVariantQuantity);

  const addVariantToCart = (variant, quantity) => {
    const state = store.getState(); // state from redux store
    console.log({ s: selectedVariant.id });
    console.log({ s: selectedVariant.selectedVariant });
    console.log({ p: product.variants[0].id });

    const lineItemsToAdd = [
      {
        variantId:
          selectedVariant.id ||
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

  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "USD",
    }).format(value);
  console.log(product.options);

  // console.log(this.props.product);

  // let bShowOneSizeFitsMost =
  //   variantSelectors.length === 1 && aOptionNames[0] === "Title";

  return (
    <ProductLayout>
      <Head>
        <title>Product Details</title>
      </Head>
      <div
        className={`${Styles.productDetailContainer}`}
        style={{ background: "rgba(0, 0, 0, 0.05)" }}
      >
        <div
          className={` d-flex justify-content-between ${Styles.productWrapper}`}
        >
          <div
            className={`d-flex  align-items-start ${Styles.productDetail}`}
            ref={imgRef}
          >
            {product.images.map((item, index) => {
              return (
                <img
                  key={index}
                  className="img-thumbnail"
                  src={item.src}
                  alt={index}
                  onClick={() => setTab(index)}
                  className={Styles.productSmall}
                  style={{ width: "100px" }}
                ></img>
              );
            })}
          </div>
          <img
            src={product.images[tab].src}
            alt={product.images[tab].src}
            className={Styles.productLarge}
            style={{ border: "2px solid orange" }}
          ></img>
          <div className={`px-3 ${Styles.story}`}>
            <h1 className="fs-3">{product.title}</h1>
            <span>
              <Link
                href={`/collections/${product.variants[0].selectedOptions[1].value}`}
              >
                <a
                  href={`/${product.variants[0].selectedOptions[1].value}`}
                  style={{
                    color: `${product.variants[0].selectedOptions[2].value}`,
                  }}
                >
                  {" "}
                  in {product.variants[0].selectedOptions[1].value + "'s"}{" "}
                  hoodies Collection
                </a>
              </Link>
            </span>
            <hr></hr>

            <>
              {product.options.map((option, index) => {
                return (
                  <select
                    className="Product__option"
                    name={option.name}
                    key={option.name}
                    onChange={handleOptionChange}
                  >
                    {option.values.map((value) => {
                      return (
                        <option
                          value={value.value}
                          key={`${option.name}-${value.value}`}
                        >{`${value.value}`}</option>
                      );
                    })}
                  </select>
                );
              })}
            </>
            <>
              <label
                className="Product__option"
                style={{ color: "black", lineHeight: "20px" }}
              >
                Qty:{" "}
                <input
                  className="form-control"
                  min="1"
                  type="number"
                  defaultValue={variantQuantity}
                  value={selectedVariantQuantity || 1}
                  onChange={handleQuantityChange}
                ></input>
              </label>
            </>

            <ul className="py-4 ">
              <li
                style={{
                  listStyleType: "disc",
                  listStylePosition: "inside",
                }}
              >
                50% Cotton, 50% Polyester
              </li>
              <li
                style={{
                  listStyleType: "disc",
                  listStylePosition: "inside",
                }}
              >
                Made with extra thick material to keep the moisture out
              </li>
              <li
                style={{
                  listStyleType: "disc",
                  listStylePosition: "inside",
                }}
              >
                Soft inner linings to reduce impact with skin
              </li>
              <li
                style={{
                  listStyleType: "disc",
                  listStylePosition: "inside",
                }}
              >
                Machine Washed
              </li>
              <li
                style={{
                  listStyleType: "disc",
                  listStylePosition: "inside",
                }}
              >
                Drawstring hood easily adjusts for extra protection from extreme
                weather
                <br />
              </li>
            </ul>
          </div>
          <div
            className="p-3 col-md-12 col-lg-3"
            style={{ background: "#FFFFFF", borderRadius: "10px" }}
          >
            <div style={{ width: "100%" }}>
              <p
                className="fs-2"
                style={{ color: "orange", lineHeight: "14px" }}
              >
                {numberFormat(product.variants[0].price)}
              </p>

              <span className="">+free shipping within US only</span>
              <p className="">Arrival within 2 working days</p>
            </div>
            {/* <button
              style={{
                width: "100%",
                color: "white",
                background: "blueviolet",
                borderRadius: "10px",
                padding: "10px 0px",
                border: "none",
              }}
              className="my-4"
              onClick={() => handleSubmit(product, cart)}
            >
              Add to Cart
            </button> */}
            <button
              className={`Product__buy button ${Styles.productDetailBtn}`}
              onClick={() => addVariantToCart(variant, variantQuantity)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      ;
    </ProductLayout>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const product = await client.product.fetch(id);
  //   const data = await res.json();
  console.log({ product });
  // res = JSON.stringify(res.winners)

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      // result: res.result,
    }, // will be passed to the page component as props
  };
}
export default connect((state) => state)(DetailProduct);
