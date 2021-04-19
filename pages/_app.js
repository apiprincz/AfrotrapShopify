import "../styles/globals.css";
import Head from "next/head";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import "swiper/components/effect-flip/effect-flip.min.css";
import "swiper/components/pagination/pagination.scss";
import Notify from "../Components/Notify";
import { useContext } from "react";
// import * as serviceWorker from "../serviceWorker";
import Client from "shopify-buy";
import { Provider } from "react-redux";
import store from "../store/store";
import dotenv from "dotenv";

import { DataProvider } from "../store/GlobalState";

import { DataContext } from "../store/GlobalState";

const client = Client.buildClient({
  storefrontAccessToken: process.env.STOREFRONT_ACCESS_TOKEN,
  domain: process.env.DOMAIN,
});

store.dispatch({ type: "CLIENT_CREATED", payload: client });

// buildClient() is synchronous, so we can call all these after!
client.product.fetchAll().then((res) => {
  store.dispatch({ type: "PRODUCTS_FOUND", payload: res });
  // console.log(res[0].images);
});
client.collection.fetchAllWithProducts().then((res) => {
  store.dispatch({ type: "COLLECTIONS_FOUND", payload: res });
  // console.log(res[1].products.length);
});
client.checkout.create().then((res) => {
  store.dispatch({ type: "CHECKOUT_FOUND", payload: res });
});
client.shop.fetchInfo().then((res) => {
  store.dispatch({ type: "SHOP_FOUND", payload: res });
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
          crossOrigin="anonymous"
        ></link>
        <script
          src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
          crossOrigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.6.0/dist/umd/popper.min.js"
          integrity="sha384-KsvD1yqQ1/1+IA7gi3P0tyJcT3vR+NdBTt13hSJ2lnve8agRGXTTyNaBYmCR/Nwi"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.min.js"
          integrity="sha384-nsg8ua9HAw1y0W1btsyWgBklPnCUAFLuTMS2G72MMONqmOymq585AcH49TLBQObG"
          crossOrigin="anonymous"
        ></script>
        <script src="https://unpkg.com/react-id-swiper@3.0.0/lib/react-id-swiper.js"></script>
        <script src="https://unpkg.com/react-id-swiper@3.0.0/lib/react-id-swiper.min.js"></script>
        <link
          rel="stylesheet"
          href="https://unpkg.com/swiper/css/swiper.css"
        ></link>
        <link
          rel="stylesheet"
          href="https://unpkg.com/swiper/css/swiper.min.css"
        ></link>
      </Head>

      <DataProvider>
        <Provider store={store}>
          <Notify />
          <Component {...pageProps} />
        </Provider>
      </DataProvider>
    </>
  );
}

export default MyApp;

// serviceWorker.unregister();
