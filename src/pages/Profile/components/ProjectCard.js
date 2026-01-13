// Chakra imports
import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  Flex,
  Image,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
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
      <Flex direction='column' h='100%'>
        <Box mb='20px' position='relative' borderRadius='15px' flexShrink='0'>
          <Image src={image} borderRadius='15px' />
          <Box
            w='100%'
            h='100%'
            position='absolute'
            top='0'
            borderRadius='15px'
            bg='linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)'></Box>
        </Box>
        <Flex direction='column' flex='1'>
          <Text fontSize='md' color='gray.500' fontWeight='600' mb='10px'>
            {name}
          </Text>
          <Text fontSize='xl' color={textColor} fontWeight='bold' mb='10px'>
            {category}
          </Text>
          <Text fontSize='md' color='gray.500' fontWeight='400' mb='20px' flex='1'>
            {description}
          </Text>
          <Flex justifyContent='space-between' mt='auto'>
            <Button
              variant='outline'
              minW='110px'
              h='36px'
              fontSize='xs'
              px='1.5rem'
              onClick={onOpen}
              color='teal.300'
              borderColor='teal.300'
              _hover={{ bg: 'teal.300', color: 'white' }}
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
      <Modal isOpen={isOpen} onClose={onClose} size='xl' isCentered>
        <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(8px)' />
        <ModalContent borderRadius='24px' overflow='hidden' p='0'>
          <ModalCloseButton
            top='15px'
            right='15px'
            bg='white'
            borderRadius='full'
            zIndex='10'
            boxShadow='0 2px 8px rgba(0,0,0,0.15)'
          />
          <ModalBody p='0'>
            {/* Hero Image Section */}
            <Box position='relative' h='200px' overflow='hidden'>
              <Image
                src={image}
                w='100%'
                h='100%'
                objectFit='cover'
              />
              <Box
                position='absolute'
                bottom='0'
                left='0'
                right='0'
                h='100%'
                bg='linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)'
              />
              <Box position='absolute' bottom='20px' left='24px'>
                <Badge
                  bg='teal.300'
                  color='white'
                  px='12px'
                  py='4px'
                  borderRadius='full'
                  fontSize='xs'
                  fontWeight='bold'
                  mb='8px'
                >
                  {name}
                </Badge>
                <Text fontSize='2xl' color='white' fontWeight='bold'>
                  {category}
                </Text>
              </Box>
            </Box>

            {/* Content Section */}
            <Box p='24px'>
              {/* Description */}
              <Text fontSize='md' color='gray.600' mb='24px' lineHeight='1.7'>
                {description}
              </Text>

              {/* Team Section */}
              <Box>
                <Text fontSize='sm' fontWeight='600' color={textColor} mb='12px'>
                  Team Members
                </Text>
                <Flex justify='space-between' align='center'>
                  <AvatarGroup size='md' max={5}>
                    {avatars.map((el, idx) => (
                      <Avatar
                        key={idx}
                        src={el}
                        border='3px solid white'
                        boxShadow='0 2px 8px rgba(0,0,0,0.1)'
                      />
                    ))}
                  </AvatarGroup>
                  <Button
                    bg='teal.300'
                    color='white'
                    borderRadius='12px'
                    px='24px'
                    _hover={{ bg: 'teal.400' }}
                    _active={{ bg: 'teal.500' }}
                    onClick={onClose}
                  >
                    Got it
                  </Button>
                </Flex>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProjectCard;
