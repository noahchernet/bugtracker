import React, { useRef, useState } from "react";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  HStack,
  VStack,
  RadioGroup,
  Radio,
  useDisclosure,
} from "@chakra-ui/react";
import Alert from "./Alert";
import { useDispatch } from "react-redux";
import { setLoading } from "../features/ticketListLoading/ticketListLoadingSlice";

export default function NewTicket({ isModalOpen, onModalClose }) {
  const initialRef = useRef(null);
  const [ticket, setTicket] = useState({
    severity: 1,
    title: "",
    description: "",
  });
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();
  const [alertInfo, setAlertInfo] = useState({ title: "", message: "" });
  // To show the ticket's info is sent to the server and being processed
  const [addingTicket, setAddingTicket] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = ({ name, value }) => {
    if (name === "severity") setTicket({ ...ticket, [name]: Number(value) });
    else setTicket({ ...ticket, [name]: value });
    // console.log("Ticket is:", ticket);
  };

  const addTicketToDB = async () => {
    setAddingTicket(true);
    const token = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT}/api/getToken`
    );

    const form = new FormData();
    // console.log("Final ticket: ", ticket);
    if (ticket.title !== undefined) form.append("title", ticket.title);
    if (ticket.description !== undefined)
      form.append("description", ticket.description);
    if (ticket.severity !== undefined)
      form.append("severity", ticket.severity);
    if (ticket.attachments !== undefined)
      form.append("attachments", ticket.attachments);
    if (ticket.due !== undefined) form.append("due", ticket.due);

    axios
      .post(`${process.env.NEXT_PUBLIC_WEB_SERVER}/tickets`, form, {
        headers: { Authorization: "Bearer " + token.data.token },
      })
      .then(() => {
        setAlertInfo({
          title: "Ticket created successfully!",
          message: "You and your collaborators can now comment on it.",
        });
        setAddingTicket(false);
        dispatch(setLoading());
        onModalClose();
        onAlertOpen();
      })
      .catch((err) => {
        console.log(err);

        setAlertInfo({
          title: "Couldn't create the ticket",
          message: err.response.data.message,
        });
        setAddingTicket(false);
        onAlertOpen();
      });
  };

  const titleIsInvalid = ticket.title === null || ticket.title === "";
  const descriptionIsInvalid =
    ticket.description === null || ticket.description === "";

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={onModalClose} motionPreset="scale">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a Ticket</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="1rem">
              <FormControl isRequired isInvalid={titleIsInvalid}>
                <FormLabel>Title</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Ticket's title"
                  name="title"
                  value={ticket.title}
                  onChange={(e) =>
                    handleInputChange({ name: "title", value: e.target.value })
                  }
                />
              </FormControl>
              <FormControl isRequired isInvalid={descriptionIsInvalid}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Describe the issue here"
                  name="description"
                  value={ticket.description}
                  onChange={(e) =>
                    handleInputChange({
                      name: "description",
                      value: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Priority</FormLabel>
                <RadioGroup
                  defaultValue={1}
                  name="severity"
                  onChange={(value) =>
                    handleInputChange({
                      name: "severity",
                      value,
                    })
                  }
                  value={ticket.severity}
                >
                  <HStack>
                    <Radio value={1}>Low</Radio>
                    <Radio value={2}>Medium</Radio>
                    <Radio value={3}>High</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Due Date</FormLabel>
                <Input
                  placeholder="Select Date and Time"
                  type="datetime-local"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Add a Picture</FormLabel>
                <input
                  type="file"
                  name="attachments"
                  onChange={(e) =>
                    handleInputChange({
                      name: e.target.name,
                      value: e.target.files[0],
                    })
                  }
                  className="mt-4 w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
                file:transition-all"
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              type="submit"
              isLoading={addingTicket}
              onClick={() => {
                addTicketToDB();
              }}
            >
              Save Ticket
            </Button>
            <Button onClick={onModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Alert isOpen={isAlertOpen} onClose={onAlertClose} info={alertInfo} />;
    </>
  );
}
