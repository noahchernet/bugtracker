import {
  Image,
  Heading,
  Box,
  Stack,
  HStack,
  Link,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Parallax, Background } from "react-parallax";

const HomePageNavBar = () => {
  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      justify="space-around"
      py="1rem"
      align="center"
      // bgGradient={"linear(to-tr, #89f7fe, #66a6ff)"}
      boxShadow="lg"
      zIndex={2}
    >
      <HStack mr="-10rem">
        <Image
          boxSize="3rem"
          src="https://res.cloudinary.com/dwzav7iui/image/upload/v1658078371/android-chrome-192x192_fg0f07.png"
        />
        <Heading as="h2" size="lg" fontWeight="light" fontFamily="Helvetica">
          Avalon Bugtracker
        </Heading>
      </HStack>
      <Link href="#">
        <Text color="#1852a5" fontSize="lg" fontFamily="Helvetica">
          Home
        </Text>
      </Link>
      <Link href="#features">
        <Text color="#1852a5" fontSize="lg" fontFamily="Helvetica">
          Features
        </Text>
      </Link>
      <Link href="#contactus">
        <Text color="#1852a5" fontSize="lg" fontFamily="Helvetica">
          Contact Us
        </Text>
      </Link>
      <Link href="/dashboard">
        <Text color="#1852a5" fontSize="lg" fontFamily="Helvetica">
          Get Started 🡲
        </Text>
      </Link>
    </Stack>
  );
};

const Hero = () => {
  return (
    <Parallax
      bgImage="https://res.cloudinary.com/dwzav7iui/image/upload/v1658354477/coding-picture-1_zpx3wj.jpg"
      strength={800}
      bgImageStyle={{ height: "80%" }}
    >
      {/* <Background>
        <Image src="https://res.cloudinary.com/dwzav7iui/image/upload/v1658354477/coding-picture-1_zpx3wj.jpg" />
      </Background> */}
      <Box
      // backgroundImage="url('https://res.cloudinary.com/dwzav7iui/image/upload/v1658354477/coding-picture-1_zpx3wj.jpg')"
      // backgroundRepeat="repeat"
      // backgroundSize="100%"
      // backgroundPosition="fixed"
      >
        <Box py="30%">
          <Heading
            mt="15rem"
            ml="5rem"
            size="xl"
            w="40%"
            fontFamily="Helvetica"
          >
            Move fast, stay aligned, and build better - together
            <br /> The best issue tracking tool used by developer teams
          </Heading>
        </Box>
      </Box>
    </Parallax>
  );
};

export default function Home() {
  return (
    <>
      <HomePageNavBar />
      <Hero />
      <Text fontSize="lg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Text>
      <Hero />
      <Hero />
      <Hero />
    </>
  );
}
