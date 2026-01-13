// Chakra Icons
import { BellIcon, SearchIcon } from "@chakra-ui/icons";
// Chakra Imports
import {
  Badge,
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Switch,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaBell, FaShoppingCart, FaUser, FaCreditCard, FaCog } from "react-icons/fa";
// Custom Icons
import { PersonIcon } from "components/Icons/Icons";
import SidebarResponsive from "components/Sidebar/SidebarResponsive";
import PropTypes from "prop-types";
import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import routes from "routes.js";

// Mock notifications data
const notificationsData = [
  { id: 1, icon: FaUser, text: "New user registered", time: "2 min ago", isNew: true },
  { id: 2, icon: FaShoppingCart, text: "New order received", time: "1 hour ago", isNew: true },
  { id: 3, icon: FaCreditCard, text: "Payment processed", time: "3 hours ago", isNew: false },
];

export default function HeaderLinks(props) {
  const { secondary, ...rest } = props;
  const history = useHistory();
  const toast = useToast();
  const { isOpen: isSettingsOpen, onOpen: onSettingsOpen, onClose: onSettingsClose } = useDisclosure();
  const [notifications, setNotifications] = useState(notificationsData);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
  });

  // Color values
  const mainTeal = "teal.300";
  const inputBg = "white";
  let mainText = "gray.700";
  let navbarIcon = "gray.500";
  const searchIcon = "gray.700";

  if (secondary) {
    navbarIcon = "white";
    mainText = "white";
  }

  const unreadCount = notifications.filter(n => n.isNew).length;

  const handleNotificationClick = useCallback((notification) => {
    setNotifications(prev =>
      prev.map(n => n.id === notification.id ? { ...n, isNew: false } : n)
    );
    toast({
      position: 'top-right',
      duration: 2500,
      render: () => (
        <Box bg='teal.300' color='white' px='24px' py='14px' borderRadius='12px' boxShadow='0 4px 12px rgba(0,0,0,0.15)'>
          <Flex align='center'>
            <Icon as={notification.icon} w='16px' h='16px' me='12px' />
            <Box>
              <Text fontWeight='bold' fontSize='sm'>{notification.text}</Text>
              <Text fontSize='xs' opacity='0.9'>{notification.time}</Text>
            </Box>
          </Flex>
        </Box>
      ),
    });
  }, [toast]);

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
    <Flex
      pe={{ base: "0px", md: "16px" }}
      w={{ base: "auto", md: "auto" }}
      alignItems="center"
      flexDirection="row"
    >
      <InputGroup
        cursor="pointer"
        bg={inputBg}
        borderRadius="15px"
        display={{ base: "none", md: "flex" }}
        w={{
          md: "200px",
        }}
        me={{ md: "20px" }}
        _focus={{
          borderColor: { mainTeal },
        }}
        _active={{
          borderColor: { mainTeal },
        }}
      >
        <InputLeftElement
          children={
            <IconButton
              bg="inherit"
              borderRadius="inherit"
              _hover="none"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}
              icon={<SearchIcon color={searchIcon} w="15px" h="15px" />}
            ></IconButton>
          }
        />
        <Input
          fontSize="xs"
          py="11px"
          color={mainText}
          placeholder="Type here..."
          borderRadius="inherit"
        />
      </InputGroup>
      <Button
        variant="ghost"
        display={{ base: "none", md: "flex" }}
        me="16px"
        leftIcon={<PersonIcon color={navbarIcon} w="18px" h="18px" />}
        color={navbarIcon}
        fontSize="sm"
        fontWeight="normal"
        _hover={{ bg: "transparent" }}
        _active={{ bg: "transparent" }}
        _focus={{ boxShadow: "none" }}
        onClick={() => history.push('/admin/profile')}
      >
        Sign In
      </Button>

      {/* Settings Icon with Modal */}
      <Box
        display={{ base: "none", md: "block" }}
        me="16px"
        position="relative"
      >
        <Icon
          as={FaCog}
          cursor="pointer"
          onClick={onSettingsOpen}
          color={navbarIcon}
          w="18px"
          h="18px"
          _hover={{ color: 'teal.300' }}
          transition="all 0.2s"
        />
      </Box>

      {/* Notifications Menu */}
      <Menu>
        <MenuButton
          display={{ base: "none", md: "block" }}
          me={{ base: "0px", md: "16px" }}
          position="relative"
        >
          <Box position="relative">
            <BellIcon
              cursor="pointer"
              color={navbarIcon}
              w="18px"
              h="18px"
              _hover={{ color: 'teal.300' }}
              transition="all 0.2s"
            />
            {unreadCount > 0 && (
              <Badge
                position="absolute"
                top="-8px"
                right="-8px"
                bg="red.500"
                color="white"
                borderRadius="full"
                fontSize="10px"
                w="16px"
                h="16px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {unreadCount}
              </Badge>
            )}
          </Box>
        </MenuButton>
        <MenuList
          borderRadius="16px"
          boxShadow="0 4px 20px rgba(0,0,0,0.15)"
          p="12px"
          minW="280px"
        >
          <Text fontSize="sm" fontWeight="bold" color="gray.700" mb="12px" px="8px">
            Notifications
          </Text>
          {notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              borderRadius="12px"
              mb="4px"
              _hover={{ bg: 'gray.50' }}
              onClick={() => handleNotificationClick(notification)}
            >
              <Flex align="center" w="100%">
                <Box
                  bg={notification.isNew ? 'teal.300' : 'gray.200'}
                  borderRadius="10px"
                  p="8px"
                  me="12px"
                >
                  <Icon as={notification.icon} color="white" w="14px" h="14px" />
                </Box>
                <Box flex="1">
                  <Text fontSize="sm" color="gray.700" fontWeight={notification.isNew ? 'bold' : 'normal'}>
                    {notification.text}
                  </Text>
                  <Text fontSize="xs" color="gray.400">{notification.time}</Text>
                </Box>
                {notification.isNew && (
                  <Box w="8px" h="8px" bg="teal.300" borderRadius="full" />
                )}
              </Flex>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <SidebarResponsive
        logoText={props.logoText}
        secondary={props.secondary}
        routes={routes}
        {...rest}
      />

      {/* Settings Modal */}
      <Modal isOpen={isSettingsOpen} onClose={onSettingsClose} isCentered size="md">
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
              onClick={onSettingsClose}
              _hover={{ bg: 'teal.400' }}
            >
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
