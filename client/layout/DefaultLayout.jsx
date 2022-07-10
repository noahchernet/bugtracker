import React from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";

export default function DefaultLayout(props) {
  return (
    <>
      <NavBar />
      {props.children}
      <Footer />
    </>
  );
}
