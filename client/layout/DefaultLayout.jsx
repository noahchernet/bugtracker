import React from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { Box } from "@chakra-ui/react";

export default function DefaultLayout(props) {
  return (
    <Box position="relative" minH="100vh">
      <NavBar />
      <Box pb={{ base: "13rem", md: "7rem" }}>{props.children}</Box>
      <Footer />
    </Box>
  );
}
