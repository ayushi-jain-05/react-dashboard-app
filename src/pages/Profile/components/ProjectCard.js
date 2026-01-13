// Chakra imports
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Flex,
  Image,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

const ProjectCard = ({ image, name, category, avatars, description }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <>
      <Flex direction='column'>
        <Box mb='20px' position='relative' borderRadius='15px'>
          <Image src={image} borderRadius='15px' />
          <Box
            w='100%'
            h='100%'
            position='absolute'
            top='0'
            borderRadius='15px'
            bg='linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)'></Box>
        </Box>
        <Flex direction='column'>
          <Text fontSize='md' color='gray.500' fontWeight='600' mb='10px'>
            {name}
          </Text>
          <Text fontSize='xl' color={textColor} fontWeight='bold' mb='10px'>
            {category}
          </Text>
          <Text fontSize='md' color='gray.500' fontWeight='400' mb='20px'>
            {description}
          </Text>
          <Flex justifyContent='space-between'>
            <Button
              variant='outline'
              colorScheme='teal'
              minW='110px'
              h='36px'
              fontSize='xs'
              px='1.5rem'
              onClick={onOpen}
              _hover={{ bg: 'teal.500', color: 'white' }}
              transition='all 0.2s'
            >
              VIEW ALL
            </Button>
            <AvatarGroup size='xs'>
              {avatars.map((el, idx) => {
                return <Avatar src={el} key={idx} />;
              })}
            </AvatarGroup>
          </Flex>
        </Flex>
      </Flex>

      {/* Project Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size='lg' isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name} - {category}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={image} borderRadius='15px' mb='20px' />
            <Text fontSize='md' color='gray.600' mb='15px'>
              {description}
            </Text>
            <Text fontSize='sm' color='gray.500' fontWeight='600' mb='10px'>
              Team Members: {avatars.length}
            </Text>
            <AvatarGroup size='md' max={5}>
              {avatars.map((el, idx) => (
                <Avatar src={el} key={idx} />
              ))}
            </AvatarGroup>
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='teal'>
              Edit Project
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProjectCard;
