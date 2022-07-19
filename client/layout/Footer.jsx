import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Image,
} from "@chakra-ui/react";
import { FaTwitter } from "react-icons/fa";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
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
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      position="absolute"
      bottom={0}
      width={"100%"}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Image boxSize="3rem" src="android-chrome-192x192.png" />
        <Text>
          © 2022 Avalon Bugtracker made by Noah Chernet. All rights reserved
        </Text>
        <Stack direction={"row"} spacing={6}>
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
          <SocialButton
            label={"GitHub"}
            href={"https://github.com/noahchernet"}
          >
            <AiFillGithub />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
