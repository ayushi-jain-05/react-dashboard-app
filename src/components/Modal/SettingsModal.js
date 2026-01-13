import {
  Box,
  Button,
  Flex,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Switch,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useCallback } from "react";
import { FaCog } from "react-icons/fa";

const SettingsModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
  });

  const handleSettingToggle = useCallback((setting, label) => {
    setSettings(prev => {
      const newValue = !prev[setting];
      toast({
        position: 'top-right',
        duration: 2000,
        render: () => (
          <Box bg={newValue ? 'teal.300' : 'gray.500'} color='white' px='24px' py='14px' borderRadius='12px' boxShadow='0 4px 12px rgba(0,0,0,0.15)'>
            <Flex align='center'>
              <Icon as={FaCog} w='16px' h='16px' me='12px' />
              <Text fontWeight='bold' fontSize='sm'>{label} {newValue ? 'enabled' : 'disabled'}</Text>
            </Flex>
          </Box>
        ),
      });
      return { ...prev, [setting]: newValue };
    });
  }, [toast]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(8px)" />
      <ModalContent borderRadius="20px" p="10px">
        <ModalHeader>
          <Flex align="center">
            <Box bg="teal.300" borderRadius="12px" p="10px" me="12px">
              <Icon as={FaCog} color="white" w="20px" h="20px" />
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="bold" color="gray.700">Settings</Text>
              <Text fontSize="xs" color="gray.400">Manage your preferences</Text>
            </Box>
          </Flex>
        </ModalHeader>
        <ModalCloseButton top="20px" right="20px" />
        <ModalBody>
          <Flex direction="column" gap="16px">
            <Flex justify="space-between" align="center" p="12px" bg="gray.50" borderRadius="12px">
              <Box>
                <Text fontSize="sm" fontWeight="600" color="gray.700">Email Notifications</Text>
                <Text fontSize="xs" color="gray.400">Receive updates via email</Text>
              </Box>
              <Switch
                isChecked={settings.emailNotifications}
                onChange={() => handleSettingToggle('emailNotifications', 'Email notifications')}
                sx={{ "span.chakra-switch__track[data-checked]": { backgroundColor: "teal.300" } }}
              />
            </Flex>
            <Flex justify="space-between" align="center" p="12px" bg="gray.50" borderRadius="12px">
              <Box>
                <Text fontSize="sm" fontWeight="600" color="gray.700">Push Notifications</Text>
                <Text fontSize="xs" color="gray.400">Receive push alerts</Text>
              </Box>
              <Switch
                isChecked={settings.pushNotifications}
                onChange={() => handleSettingToggle('pushNotifications', 'Push notifications')}
                sx={{ "span.chakra-switch__track[data-checked]": { backgroundColor: "teal.300" } }}
              />
            </Flex>
            <Flex justify="space-between" align="center" p="12px" bg="gray.50" borderRadius="12px">
              <Box>
                <Text fontSize="sm" fontWeight="600" color="gray.700">Weekly Digest</Text>
                <Text fontSize="xs" color="gray.400">Get weekly summary emails</Text>
              </Box>
              <Switch
                isChecked={settings.weeklyDigest}
                onChange={() => handleSettingToggle('weeklyDigest', 'Weekly digest')}
                sx={{ "span.chakra-switch__track[data-checked]": { backgroundColor: "teal.300" } }}
              />
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            bg="teal.300"
            color="white"
            borderRadius="12px"
            onClick={onClose}
            _hover={{ bg: 'teal.400' }}
          >
            Done
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SettingsModal;