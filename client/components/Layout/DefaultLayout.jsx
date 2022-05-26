import React from "react";
import { Header } from "./Header";

const DefaultLayout = (props) => {
  return (
    <div className="my-2 mx-12">
      <Header />
      {props.children}
    </div>
  );
};

export default DefaultLayout;
