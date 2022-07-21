import {
  Image,
  Heading,
  Box,
  Stack,
  HStack,
  Link,
  Text,
  Center,
  Button,
  VisuallyHidden,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import { FcCollaboration } from "react-icons/fc";
import { FaCheckCircle, FaTwitter } from "react-icons/fa";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import Footer from "../layout/Footer";

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
    <Box py="2rem" bg="#f0f3f6" minH="100vh">
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
          bg="white"
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
          bg="white"
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
          bg="white"
        >
          <Center>
            <FaCheckCircle size={80} color="#2196f3" />
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

const SocialButton = ({ children, label, href }) => {
  return (
    <Button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      // rounded={"full"}
      borderRadius="50%"
      w={12}
      h={12}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Button>
  );
};

const ContactUs = () => {
  return (
    <Center>
      <Stack
        direction={{ base: "column", md: "row" }}
        py="2rem"
        bg="#f5f5f"
        mx="auto"
        justify="center"
        align="center"
        spacing="3rem"
      >
        <Image
          src="https://avatars.githubusercontent.com/u/86301024?v=4"
          boxSize={{ base: "10rem", md: "12rem" }}
          border="1.4rem"
          borderColor="#f0f3f6"
          borderRadius="50%"
        />
        <Box textAlign="left" px={{ base: "2rem", md: "" }}>
          <Heading fontSize={{ base: "2xl" }}>Hi! I'm Noah Chernet</Heading>
          <Text>
            I'm the software engineer who built this site. You may reach me out
            through:
          </Text>

          <Stack direction={"row"} spacing={6} pt="1rem" justify="center">
            <SocialButton
              label={"GitHub"}
              href={"https://github.com/noahchernet"}
            >
              <AiFillGithub />
            </SocialButton>

            <SocialButton
              label={"Twitter"}
              href={"https://twitter.com/noah_chernet"}
            >
              <FaTwitter />
            </SocialButton>
            <SocialButton
              label={"LinkedIn"}
              href={"https://www.linkedin.com/in/noah-chernet-447a24232/"}
            >
              <AiFillLinkedin />
            </SocialButton>
          </Stack>
        </Box>
      </Stack>
    </Center>
  );
};

export default function Home() {
  return (
    <>
      <HomePageNavBar />
      {/* <Hero /> */}
      <Hero />
      <Features />
      <ContactUs />
      <Box py={{ base: "8rem", md: "2rem" }}></Box>
      <Footer />
    </>
  );
}
