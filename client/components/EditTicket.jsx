import React, { useRef, useState } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  HStack,
  VStack,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { updateOneTicket } from "../features/ticketListSlice/ticketListSlice";
import { useDispatch } from "react-redux";

export default function EditTicket({ ticketToEdit, setEditingTicket }) {
  const initialRef = useRef(null);
  const [alertInfo, setAlertInfo] = useState({ title: "", message: "" });
  const [addingTicket, setAddingTicket] = useState(false);
  const [ticket, setTicket] = useState({ ...ticketToEdit });
  const dispatch = useDispatch();

  const titleIsInvalid = ticket.title === null || ticket.title === "";
  const descriptionIsInvalid =
    ticket.description === null || ticket.description === "";

  const handleInputChange = ({ name, value }) => {
    if (name === "severity") setTicket({ ...ticket, [name]: Number(value) });
    else setTicket({ ...ticket, [name]: value });
  };

  const saveTicket = async () => {
    setAddingTicket(true);
    const token = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT}/api/getToken`
    );

    const form = new FormData();
    if (ticket.title !== undefined) form.append("title", ticket.title);
    if (ticket.description !== undefined)
      form.append("description", ticket.description);
    if (ticket.severity !== undefined)
      form.append("severity", ticket.severity);
    if (ticket.attachments !== undefined)
      form.append("attachments", ticket.attachments);
    if (ticket.due !== undefined) form.append("due", ticket.due);

    axios
      .put(
        `${process.env.NEXT_PUBLIC_WEB_SERVER}/tickets/` + ticket._id,
        form,
        {
          headers: { Authorization: "Bearer " + token.data.token },
        }
      )
      .then((res) => {
        setAddingTicket(false);
        dispatch(updateOneTicket(res.data));
        setEditingTicket(false);
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <VStack spacing="1rem" mb="2rem">
        <FormControl isRequired isInvalid={titleIsInvalid}>
          <FormLabel>Title</FormLabel>
          <Input
            bg="white"
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
            bg="white"
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
            bg="white"
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

      <HStack float="right">
        <Button
          colorScheme="green"
          mr={3}
          type="submit"
          isLoading={addingTicket}
          onClick={saveTicket}
        >
          Save Ticket
        </Button>
        <Button variant="outline" onClick={() => setEditingTicket(false)}>
          Cancel
        </Button>
      </HStack>
    </>
  );
}
