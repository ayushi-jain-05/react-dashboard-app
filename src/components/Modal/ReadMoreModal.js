import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import React from "react";

const ReadMoreModal = ({ isOpen, onClose, title, description, additionalText }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text color='gray.500' mb={4}>
            {description}
          </Text>
          {additionalText && <Text>{additionalText}</Text>}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ReadMoreModal;