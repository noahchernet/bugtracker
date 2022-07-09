import { Box, Icon, Image } from "@chakra-ui/react";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

// const Header = () => {
//   return (
//     <>
//       <Image boxSize="5rem" src="android-chrome-192x192.png" />
//     </>
//   );
// };

export default function DefaultLayout(props) {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}
