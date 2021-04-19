import Head from "next/head";
import IndexLayout from "../Layouts";
import Banner from "../Components/Banner";
import Content from "../Components/Content";
import { getData } from "../util/fetchData";
import { useState, useContext, useEffect } from "react";
import { client } from "../util/shopify";
import moment from "moment";
import Client from "shopify-buy";

import { DataContext } from "../store/GlobalState";

import dotenv from "dotenv";

const Home = ({ collections }) => {
  const [state, dispatch] = useContext(DataContext);
  const { cart } = state;

  const [pick, setPick] = useState(collections[1].products);
  const [exclusive, setExclusive] = useState(collections[2].products);
  const [flash, setFlash] = useState(collections[3].products);
  const [latest, setLatest] = useState(collections[4].products);
  console.log(pick);
  // collections.map((product) => {
  //   return console.log(
  //     moment(product.createdAt).format("DD-MM-YY") +
  //       moment(product.createdAt).format("hh:mm A")
  //   );
  // });

  // function setTimeHandler(params) {
  //   console.log(params);
  //   return moment(params.date).format("hh:mm A");
  // }
  // function setDateHandler(params) {
  //   console.log(params);
  //   return moment(params.date).format("DD-MM-YY");
  // }

  // client();
  // dispatch({ type: "CLIENT_CREATED", payload: client });

  // useEffect(() => {
  //   client.checkout.create().then((res) => {
  //     setCheckout({
  //       checkout: res,
  //     });
  //   });

  //   client.product.fetchAll().then((res) => {
  //     setClientproducts({
  //       clientproducts: res,
  //     });
  //   });
  //   client.shop.fetchInfo().then((res) => {
  //     setShop({
  //       shop: res,
  //     });
  //   });
  // }, []);

  // client.product.fetchAll().then((res) => {
  //   dispatch({ type: "PRODUCTS_FOUND", payload: res });
  // });
  // client.checkout.create().then((res) => {
  //   dispatch({ type: "CHECKOUT_FOUND", payload: res });
  // });
  // client.shop.fetchInfo().then((res) => {
  //   dispatch({ type: "SHOP_FOUND", payload: res });
  // });
  // console.log(
  //   "collections" +
  //     collections[1].products.map((col) => {
  //       console.log(col.id);
  //     })
  // );
  return (
    <div>
      <Head>
        <title>Afrotrap Wears</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <IndexLayout>
          <Banner />
          <Content
            pick={pick}
            exclusive={exclusive}
            flash={flash}
            latest={latest}
          />
        </IndexLayout>
      </main>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  if (typeof window === "undefined") {
    dotenv.config({ path: "ENV_FILENAME" });
  }
  dotenv.config({ path: "ENV_FILENAME" });
  // const products = await client.product.fetchAll();
  const collections = await client.collection.fetchAllWithProducts();

  //   const data = await res.json();

  // console.log(collections[1].products.length);
  // if (!products) {
  //   return {
  //     notFound: true,
  //
  // }

  return {
    props: { collections: JSON.parse(JSON.stringify(collections)) }, // will be passed to the page component as props
  };
}
