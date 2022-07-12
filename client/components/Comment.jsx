import React from "react";
import { Avatar, HStack, Text, VStack } from "@chakra-ui/react";

export default function Comment({ commentDetails }) {
  return (
    <HStack spacing="2.5rem" align="stretch" my="2rem" mb="6rem">
      <VStack spacing="1rem">
        <Avatar
          name={
            commentDetails.postedByUser.firstName
              ? `${commentDetails.postedByUser.firstName} ${commentDetails.postedByUser.lastName}`
              : commentDetails.postedByUser.email
          }
          src={commentDetails.postedByUser.picture}
        />
        <Text w="">
          {commentDetails.postedByUser.firstName
            ? `${commentDetails.postedByUser.firstName} ${commentDetails.postedByUser.lastName}`
            : commentDetails.postedByUser.email}
        </Text>
      </VStack>
      <Text
        bg="gray.100"
        borderColor="gray.200"
        borderWidth="0.1rem"
        w="100%"
        p="1rem"
      >
        {commentDetails.description}
      </Text>
    </HStack>
  );
}
