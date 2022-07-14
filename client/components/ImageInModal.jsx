import React from "react";
import {
  Center,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

const ImageInModal = ({ imageSrc, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <Center width="100%" height="100%">
        <ModalContent
          bg="transparent"
          boxShadow="none"
          onClick={() => onClose()}
        >
          <Image
            src={imageSrc}
            fallback="https://gifimage.net/wp-content/uploads/2017/09/animated-loading-gif-2.gif"
          />
        </ModalContent>
      </Center>
    </Modal>
  );
};

export default ImageInModal;
