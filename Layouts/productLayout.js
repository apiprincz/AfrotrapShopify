import React from "react";
import Head from "next/head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useWindowResize } from "../util/windowResize";
import MobileNav from "../Components/MobileNav";

export default function IndexLayout({ children }) {
  const { width } = useWindowResize();
  const breakpoint = 1000;

  return (
    <div>
      <Head>
        <title>Afrotrap Web App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container-fluid p-0">
        {width < breakpoint ? <MobileNav /> : <Header />}
        {children}
        <Footer />
      </div>
    </div>
  );
}
