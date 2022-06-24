import React from "react";
import Footer from "./Footer";
import { Header } from "./Header";

const DefaultLayout = (props) => {
  return (
    <div>
      <div className="pb-36 lg:pb-20">
        <Header />
        {props.children}
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
