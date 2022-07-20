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

const HomePageNavBar = () => {
  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      justify="space-around"
      py="1rem"
      align="center"
      // bgGradient={"linear(to-tr, #89f7fe, #66a6ff)"}
      boxShadow="lg"
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
      <Link>
        <Text color="#1852a5" fontSize="lg" fontFamily="Helvetica">
          Home
        </Text>
      </Link>
      <Link>
        <Text color="#1852a5" fontSize="lg" fontFamily="Helvetica">
          Features
        </Text>
      </Link>
      <Link>
        <Text color="#1852a5" fontSize="lg" fontFamily="Helvetica">
          Contact Us
        </Text>
      </Link>
      <Link>
        <Text color="#1852a5" fontSize="lg" fontFamily="Helvetica">
          Get Started 🡲
        </Text>
      </Link>
    </Stack>
  );
};

export default function Home() {
  return (
    <>
      <HomePageNavBar />
    </>
  );
}
