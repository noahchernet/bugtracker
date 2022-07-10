import React, { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

const Alert = ({ isOpen, onClose, errorMessage }) => {
  const closeBtnRef = useRef(null);
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Couldn't Create the Ticket
          </AlertDialogHeader>

          <AlertDialogBody>{errorMessage}</AlertDialogBody>

          <AlertDialogFooter>
            <Button leastDestructiveRef={closeBtnRef} onClick={onClose}>
              Ok
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default Alert;
