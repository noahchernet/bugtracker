import {
  Box,
  Flex,
  HStack,
  Link,
  LinkOverlay,
  IconButton,
  Button,
  useColorModeValue,
  Stack,
  Image,
  Heading,
  useDisclosure,
  Spacer,
} from "@chakra-ui/react";
import { AddIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useUser } from "@auth0/nextjs-auth0";
import NextLink from "next/link";
import NewTicket from "../components/NewTicket";

const Links = ["Dashboard", "About", "Contact Us"];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

/**
 * Returns a login button and an "Add Ticket" button if user isn't signed in,
 * a logout button if user is signed in.
 */
const AuthButton = () => {
  const { user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure(); // For the "Create new Ticket" modal

  if (!user) {
    return (
      <Button color={"white"} bg={"blue.400"} _hover={{ bg: "blue.300" }}>
        <LinkOverlay href="/api/auth/login" textDecoration={"none"}>
          Sign In
        </LinkOverlay>
      </Button>
    );
  } else
    return (
      <Stack direction={{ base: "column", lg: "row" }}>
        <Button
          rightIcon={<AddIcon />}
          color={"white"}
          bg={"green.400"}
          _hover={{ bg: "green.300" }}
          onClick={onOpen}
          mb={2}
        >
          New Ticket
        </Button>
        <Button
          _hover={{ bg: "gray.300" }}
          variant={"outline"}
          borderColor={"gray.300"}
        >
          <LinkOverlay href="/api/auth/logout" textDecoration={"none"}>
            Sign Out
          </LinkOverlay>
        </Button>
        {isOpen ? (
          <NewTicket isModalOpen={isOpen} onModalClose={onClose} />
        ) : null}
      </Stack>
    );
};

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={{ base: "none", lg: "space-between" }}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ lg: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack
            spacing={8}
            alignItems={"center"}
            textAlign={{ base: "center", lg: "right" }}
            mx={{ base: "auto", lg: "" }}
          >
            <NextLink href="/" passHref>
              <Link>
                <HStack spacing={"1rem"}>
                  <Image
                    boxSize="3rem"
                    src="https://res.cloudinary.com/dwzav7iui/image/upload/v1658078371/android-chrome-192x192_fg0f07.png"
                  />
                  <Heading as="h2" size="md">
                    Avalon Bugtracker
                  </Heading>
                </HStack>
              </Link>
            </NextLink>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", lg: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Box display={{ base: "none", lg: "contents" }}>
            <Spacer />
            <AuthButton />
          </Box>
        </Flex>

        {isOpen ? (
          <Box
            pb={4}
            display={{ lg: "none" }}
            bg="gray.200"
            mx="-1rem"
            px="1rem"
          >
            <Stack as={"nav"} spacing={4} textAlign="center">
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}

              {/* <NextLink href="/" passHref>
                <Link></Link>
              </NextLink> */}
              <AuthButton />
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
