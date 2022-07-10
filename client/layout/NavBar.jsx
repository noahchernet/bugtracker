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
} from "@chakra-ui/react";
import { AddIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useUser } from "@auth0/nextjs-auth0";
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
      <HStack>
        <Button
          rightIcon={<AddIcon />}
          color={"white"}
          bg={"green.400"}
          _hover={{ bg: "green.300" }}
          onClick={onOpen}
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
      </HStack>
    );
};

export default function NavBar() {
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
          <AuthButton />
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
