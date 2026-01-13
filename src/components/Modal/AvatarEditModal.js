import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useCallback, useRef } from "react";
import { FaCamera } from "react-icons/fa";

const AvatarEditModal = ({ isOpen, onClose, currentAvatar, onAvatarChange }) => {
  const toast = useToast();
  const fileInputRef = useRef(null);

  const handleFileSelect = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          position: 'top-right',
          duration: 3000,
          render: () => (
            <Box bg='red.500' color='white' px='24px' py='14px' borderRadius='12px' boxShadow='0 4px 12px rgba(0,0,0,0.15)'>
              <Text fontWeight='bold' fontSize='sm'>File too large. Max size is 5MB.</Text>
            </Box>
          ),
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        onAvatarChange(reader.result);
        onClose();
        toast({
          position: 'top-right',
          duration: 2500,
          render: () => (
            <Box bg='teal.300' color='white' px='24px' py='14px' borderRadius='12px' boxShadow='0 4px 12px rgba(0,0,0,0.15)'>
              <Flex align='center'>
                <Icon as={FaCamera} w='16px' h='16px' me='12px' />
                <Text fontWeight='bold' fontSize='sm'>Profile photo updated successfully!</Text>
              </Flex>
            </Box>
          ),
        });
      };
      reader.readAsDataURL(file);
    }
  }, [onClose, onAvatarChange, toast]);

  return (
    <>
      <Input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        display="none"
        onChange={handleFileSelect}
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(8px)" />
        <ModalContent borderRadius="20px" p="10px">
          <ModalHeader>
            <Flex align="center">
              <Box bg="teal.300" borderRadius="12px" p="10px" me="12px">
                <Icon as={FaCamera} color="white" w="20px" h="20px" />
              </Box>
              <Box>
                <Text fontSize="lg" fontWeight="bold" color="gray.700">Update Profile Photo</Text>
                <Text fontSize="xs" color="gray.400">Choose a new avatar image</Text>
              </Box>
            </Flex>
          </ModalHeader>
          <ModalCloseButton top="20px" right="20px" />
          <ModalBody>
            <Flex direction="column" align="center" gap="16px">
              <Avatar src={currentAvatar} w="120px" h="120px" borderRadius="20px" />
              <Text fontSize="sm" color="gray.500" textAlign="center">
                Click below to select a new photo. Max file size: 5MB.
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent="center" gap="12px">
            <Button
              variant="outline"
              borderRadius="12px"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              bg="teal.300"
              color="white"
              borderRadius="12px"
              _hover={{ bg: 'teal.400' }}
              onClick={() => fileInputRef.current?.click()}
            >
              Choose Photo
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AvatarEditModal;