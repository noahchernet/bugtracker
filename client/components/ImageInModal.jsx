import React from "react";
import { Image, Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";

const ImageInModal = ({ imageSrc, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} bg="pink">
      <ModalOverlay />
      <ModalContent
        bg="transparent"
        boxShadow="none"
        onClick={() => onClose()}
        maxW="75%"
      >
        <Image
          src={imageSrc}
          fallback="https://gifimage.net/wp-content/uploads/2017/09/animated-loading-gif-2.gif"
        />
      </ModalContent>
    </Modal>
  );
};

export default ImageInModal;
