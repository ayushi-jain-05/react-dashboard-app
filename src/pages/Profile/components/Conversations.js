// Chakra imports
import {
  Avatar,
  Button,
  Flex,
  Text,
  useColorModeValue,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
// Assets
import avatar11 from "assets/img/avatars/avatar11.png";
import avatar12 from "assets/img/avatars/avatar12.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import avatar13 from "assets/img/avatars/avatar13.png";
import avatar6 from "assets/img/avatars/avatar6.png";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React, { useState, useCallback } from "react";

// Mock conversation data
const conversationsData = [
  {
    id: 1,
    name: "Esthera Jackson",
    avatar: avatar4,
    message: "Hi! I need more information...",
  },
  {
    id: 2,
    name: "Esthera Jackson",
    avatar: avatar11,
    message: "Awesome work, can you change...",
  },
  {
    id: 3,
    name: "Esthera Jackson",
    avatar: avatar12,
    message: "Have a great afternoon...",
  },
  {
    id: 4,
    name: "Esthera Jackson",
    avatar: avatar13,
    message: "About files I can...",
  }
];

const Conversations = ({ title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [replyText, setReplyText] = useState("");
  const toast = useToast();

  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  // Memoized handlers
  const handleReplyClick = useCallback((conversation) => {
    setSelectedConversation(conversation);
    setReplyText("");
    onOpen();
  }, [onOpen]);

  const handleSendReply = useCallback(() => {
    if (replyText.trim()) {
      toast({
        title: "Reply Sent",
        description: `Your reply to ${selectedConversation.name} has been sent.`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      onClose();
      setReplyText("");
    }
  }, [replyText, selectedConversation, toast, onClose]);

  const handleTextChange = useCallback((e) => {
    setReplyText(e.target.value);
  }, []);

  return (
    <>
      <Card p='16px'>
        <CardHeader p='12px 5px' mb='12px'>
          <Text fontSize='lg' color={textColor} fontWeight='bold'>
            {title}
          </Text>
        </CardHeader>
        <CardBody px='5px'>
          <Flex direction='column' w='100%'>
            {conversationsData.map((conversation) => (
              <Flex justifyContent='space-between' mb='21px' key={conversation.id}>
                <Flex align='center'>
                  <Avatar
                    src={conversation.avatar}
                    w='50px'
                    h='50px'
                    borderRadius='15px'
                    me='10px'
                  />
                  <Flex direction='column'>
                    <Text fontSize='sm' color={textColor} fontWeight='bold'>
                      {conversation.name}
                    </Text>
                    <Text fontSize='xs' color='gray.500' fontWeight='400'>
                      {conversation.message}
                    </Text>
                  </Flex>
                </Flex>
                <Button
                  p='0px'
                  bg='transparent'
                  variant='no-hover'
                  onClick={() => handleReplyClick(conversation)}
                  _hover={{ transform: 'scale(1.05)' }}
                  transition='all 0.2s'
                >
                  <Text
                    fontSize='sm'
                    fontWeight='600'
                    color='teal.300'
                    alignSelf='center'>
                    REPLY
                  </Text>
                </Button>
              </Flex>
            ))}
          </Flex>
        </CardBody>
      </Card>

      {/* Reply Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Reply to {selectedConversation?.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize='sm' color='gray.500' mb='10px'>
              Original message: "{selectedConversation?.message}"
            </Text>
            <Textarea
              placeholder='Type your reply here...'
              value={replyText}
              onChange={handleTextChange}
              rows={4}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme='teal'
              onClick={handleSendReply}
              isDisabled={!replyText.trim()}
            >
              Send Reply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Conversations;
