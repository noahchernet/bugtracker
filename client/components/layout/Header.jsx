import {
  Box,
  Flex,
  HStack,
  Link,
  LinkOverlay,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  Heading,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useUser } from "@auth0/nextjs-auth0";

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
 * Returns a login button if user isn't signed in,
 * a logout button if user is signed in.
 */
const UserButton = () => {
  const { user } = useUser();

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
      <Button color={"white"} bg={"blue.400"} _hover={{ bg: "blue.300" }}>
        <LinkOverlay href="/api/auth/logout" textDecoration={"none"}>
          Sign Out
        </LinkOverlay>
      </Button>
    );
};

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Image boxSize="3rem" src="android-chrome-192x192.png" />
            <Heading as="h2" size="md">
              Avalon Bugtracker
            </Heading>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <UserButton />
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
