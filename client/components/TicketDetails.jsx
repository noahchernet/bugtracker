import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Divider,
  Stack,
  Avatar,
  Spacer,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Image,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { EditIcon, DeleteIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import TicketStatusBadge from "./TicketStatusBadge";
import TicketSeverityBadge from "./TicketSeverityBadge";
import ImageInModal from "./ImageInModal";
import readableDate from "../services/readableDate";
import EditTicket from "./EditTicket";
import { useDispatch } from "react-redux";
import { deleteOneTicket } from "../features/ticketListSlice/ticketListSlice";
import nameFromEmail from "../services/nameFromEmail";

export default function TicketDetails({ ticket }) {
  const [editingTicket, setEditingTicket] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const {
    isOpen: isImageOpen,
    onClose: onImageClosed,
    onOpen: onImageOpen,
  } = useDisclosure();
  const dispatch = useDispatch();

  const deleteTicket = async () => {
    const token = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT}/api/getToken`
    );
    const confirmDelete = confirm(
      "Are you sure you want to delete this ticket?"
    );

    if (confirmDelete) {
      axios
        .delete(
          `${process.env.NEXT_PUBLIC_WEB_SERVER}/tickets/` + ticket._id,
          {
            headers: { Authorization: "Bearer " + token.data.token },
          }
        )
        .then(() => {
          router.push("/");
          dispatch(deleteOneTicket(ticket._id));
          // console.log(res.data);
        })
        .catch((err) => {
          alert(err.message);
          router.push("/");
        });
    }
  };

  return (
    <Box bg="gray.100" p="2rem" w={{base: '90%', md:'75%'}}>
      {!editingTicket ? (
        <>
          <Heading
            as={"h1"}
            textDecoration={{base:'none', md:"underline"}}
            textUnderlineOffset={{base:'0.25rem', lg:"1rem"}}
            pb={"2rem"}
            size={{base: 'md', lg:"lg"}}
          >
            {ticket.title}
          </Heading>

          <Text>{ticket.description}</Text>

          {/* Display the ticket's image if there's one */}
          {ticket.attachments !== "" ? (
            <>
              <Image
                boxSize="5rem"
                src={ticket.attachments}
                cursor="pointer"
                onClick={() => onImageOpen()}
                borderRadius="1rem"
              />
              <ImageInModal
                isOpen={isImageOpen}
                onClose={onImageClosed}
                imageSrc={ticket.attachments}
              />
            </>
          ) : null}

          <Divider bg={"gray.700"} my={"2rem"} />

          {/* Render after the ticket is fetched from the server */}

          {ticket.postedByUser && (
            <Stack direction={{base: 'column', md: 'row'}} pb="1rem" align={'center'}>
              <Avatar
                size={"lg"}
                name={
                  ticket.postedByUser.firstName
                    ? ticket.postedByUser.firstName +
                      " " +
                      ticket.postedByUser.lastName
                    : nameFromEmail(ticket.postedByUser.email)
                }
                src={ticket.postedByUser.picture}
              />
              <Text>
                {`By: ${
                  ticket.postedByUser.firstName
                    ? ticket.postedByUser.firstName +
                      " " +
                      ticket.postedByUser.lastName
                    : nameFromEmail(ticket.postedByUser.email)
                }`}
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
                      onClick={() => setEditingTicket(true)}
                    >
                      Edit Ticket
                    </MenuItem>
                    <MenuItem
                      icon={<DeleteIcon />}
                      _hover={{ bg: "red.500", color: "white" }}
                      onClick={deleteTicket}
                    >
                      Delete Ticket
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : null}
            </Stack>
          )}

          <Text as="i" fontSize="sm">
            {`On ${readableDate(ticket.createdAt)}${
              ticket.updatedAt !== ticket.createdAt
                ? ", edited " + readableDate(ticket.updatedAt)
                : ""
            }`}
          </Text>
        </>
      ) : (
        <EditTicket
          ticketToEdit={ticket}
          setEditingTicket={setEditingTicket}
        />
      )}
    </Box>
  );
}
