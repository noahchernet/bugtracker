import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Divider,
  HStack,
  Avatar,
  VStack,
  Spacer,
  Button,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Badge,
} from "@chakra-ui/react";
import axios from "axios";
import { EditIcon, DeleteIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import TicketStatusBadge from "./TicketStatusBadge";
import TicketSeverityBadge from "./TicketSeverityBadge";

export default function TicketDetails({ id }) {
  const [ticket, setTicket] = useState({});
  const { user } = useUser();

  const router = useRouter();

  useEffect(() => {
    console.log("Running useEffect...");
    axios
      .get(`${process.env.NEXT_PUBLIC_WEB_SERVER}/tickets/` + id)
      .then(async (res) => {
        setTicket(res.data);
        console.log("Ticket processd:", ticket);
      })
      .catch((err) => {
        console.log("Error fetching data\n", err);
      });
  }, [router.isReady]);

  return (
    <Box bg="gray.100" p="2rem" w={"50%"}>
      <Heading
        as={"h1"}
        textDecoration={"underline"}
        textUnderlineOffset={"1rem"}
        pb={"2rem"}
        size="lg"
      >
        {ticket.title}
      </Heading>
      <Text>{ticket.description}</Text>
      <Divider bg={"gray.700"} my={"2rem"} />
      {/* Render after the ticket is fetched from the server */}
      {ticket.postedByUser && (
        <HStack>
          <Avatar
            size={"lg"}
            name={
              ticket.postedByUser.firstName
                ? ticket.postedByUser.firstName +
                  " " +
                  ticket.postedByUser.lastName
                : ticket.postedByUser.email
            }
            src={ticket.postedByUser.picture}
          />
          <Text>
            {ticket.postedByUser.firstName
              ? ticket.postedByUser.firstName +
                " " +
                ticket.postedByUser.lastName
              : ticket.postedByUser.email}
          </Text>
          <Spacer />

          {/* Solved status and severity of the ticket*/}
          <TicketStatusBadge solved={ticket.solved} />
          <TicketSeverityBadge severity={ticket.severity} />

          {/* Display edit and delete comment buttons if the currently logged in user is the one who posted this ticket*/}
          {user && user.sub === ticket.postedByUser.sub ? (
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
              />
              <MenuList>
                <MenuItem
                  icon={<EditIcon />}
                  _hover={{ bg: "blue.400", color: "white" }}
                >
                  Edit Ticket
                </MenuItem>
                <MenuItem
                  icon={<DeleteIcon />}
                  _hover={{ bg: "red.500", color: "white" }}
                >
                  Delete Ticket
                </MenuItem>
              </MenuList>
            </Menu>
          ) : null}
        </HStack>
      )}
    </Box>
  );
}
