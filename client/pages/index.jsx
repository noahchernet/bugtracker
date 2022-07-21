import {
  Image,
  Heading,
  Box,
  Stack,
  HStack,
  Link,
  Text,
  Center,
} from "@chakra-ui/react";
import React from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import { FcCollaboration } from "react-icons/fc";
import { FaCheckCircle } from "react-icons/fa";

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
    <Box
      bgImage="url('https://res.cloudinary.com/dwzav7iui/image/upload/v1658354477/coding-picture-1_zpx3wj.jpg')"
      bgAttachment="fixed"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      minH="24rem"
    >
      <Box py="12%">
        <Heading
          mt="12rem"
          ml="5rem"
          p="2.5rem"
          size="xl"
          w="40%"
          fontFamily="Helvetica"
          color="#192d51"
          bgColor="rgba(244,244,244,0.8)"
          // bgGradien="linear(to-r, rgba(244,244,244,0.8), rgba(244,244,244,0.8)"
          borderRadius="3rem"
        >
          {/* <Heading> */}
          Move fast, stay aligned, and build better together
          <br />
          <br /> The best issue tracking tool used by developer teams
        </Heading>
      </Box>
      {/* <Heading textAlign="center" fontSize="xl">
        Parallax
      </Heading> */}
    </Box>
  );
};

const Features = () => {
  return (
    <Box py="2rem">
      <Heading id="features" textAlign="center" py="2rem">
        Features
      </Heading>
      <Stack
        direction={{ base: "column", md: "row" }}
        justify="center"
        spacing={14}
      >
        <Box
          boxShadow="xl"
          w={{ md: "20rem" }}
          py="2rem"
          borderRadius="0.75rem"
          px="1rem"
        >
          <Center>
            <MdOutlineAddCircle size={80} color="#68d391" />
          </Center>
          <Heading align="center" pt="0.75rem">
            Create Tickets
          </Heading>
          <Center>
            <Text pt="2.5rem" w="12rem">
              Write tickets seamlessly, describe your issues and add pictures
              and screenshots.
            </Text>
          </Center>
        </Box>
        <Box
          boxShadow="xl"
          w={{ md: "20rem" }}
          py="2rem"
          borderRadius="0.75rem"
          px="1rem"
        >
          <Center>
            <FcCollaboration size={80} color="#68d391" />
          </Center>
          <Heading align="center" pt="0.75rem">
            Discuss
          </Heading>
          <Center>
            <Text pt="2.5rem" w="12rem">
              Discuss with your colleagues and teammates about the issue by
              commenting on the ticket
            </Text>
          </Center>
        </Box>
        <Box
          boxShadow="xl"
          w={{ md: "20rem" }}
          py="2rem"
          borderRadius="0.75rem"
          px="1rem"
        >
          <Center>
            <FaCheckCircle size={80} color="#68d391" />
          </Center>
          <Heading align="center" pt="0.75rem">
            Solve
          </Heading>
          <Center>
            <Text pt="2.5rem" w="12rem">
              Once the solution is found, you can mark the comment that solved
              it.
            </Text>
          </Center>
        </Box>
      </Stack>
    </Box>
  );
};

export default function Home() {
  return (
    <>
      <HomePageNavBar />
      {/* <Hero /> */}
      <Hero />
      <Features />
      <Text fontSize="lg">
        sunt in culpa qui officia deserunt mollit anim id est laborum. tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit
        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
        id est laborum. tempor incididunt ut labore et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum. tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum. tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
        sint occaecat cupidatat non proident, sunt in culpa qui officia
        deserunt mollit anim id est laborum.
      </Text>
    </>
  );
}
