import React, { useEffect, useState } from "react";
import { Box, Text, HStack, Badge } from "@chakra-ui/react";
import readableDate from "../services/readableDate";

export default function TicketBrief({ ticket }) {
  const [severity, setSeverity] = useState({});
  const [solved, setSolved] = useState({});

  useEffect(() => {
    if (ticket.severity === 1) {
      setSeverity({ status: "Low Priority", badgeColor: "gray" });
    } else if (ticket.severity === 2) {
      setSeverity({ status: "Medium Priority", badgeColor: "orange" });
    } else setSeverity({ status: "High Priority", badgeColor: "red" });

    ticket.solved
      ? setSolved({ status: "Solved", badgeColor: "green" })
      : setSolved({ status: "Unsolved", badgeColor: "orange" });
  }, []);

  return (
    <Box
      borderWidth="0.1rem"
      minWidth="40rem"
      p="1rem"
      borderColor="gray.200"
      bg="gray.50"
    >
      <HStack justify="space-between">
        <Text as="h2" fontSize="2xl">
          {ticket.title}
        </Text>
        {ticket.solved ? (
          <Badge colorScheme={solved.badgeColor}>{solved.status}</Badge>
        ) : (
          <Badge colorScheme={severity.badgeColor}>{severity.status}</Badge>
        )}
      </HStack>
      <HStack justify="space-between">
        <Text fontSize="xs">{readableDate(ticket.updatedAt)}</Text>
        <Text fontSize="xs">
          By: {ticket.postedByUser.firstName || ticket.postedByUser.email}
        </Text>
      </HStack>
    </Box>
  );
}
