import { BellIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useCallback } from "react";
import { FaShoppingCart, FaUser, FaCreditCard } from "react-icons/fa";

// Mock notifications data
const notificationsData = [
  { id: 1, icon: FaUser, text: "New user registered", time: "2 min ago", isNew: true },
  { id: 2, icon: FaShoppingCart, text: "New order received", time: "1 hour ago", isNew: true },
  { id: 3, icon: FaCreditCard, text: "Payment processed", time: "3 hours ago", isNew: false },
];

const NotificationsMenu = ({ iconColor }) => {
  const toast = useToast();
  const [notifications, setNotifications] = useState(notificationsData);

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

  return (
    <Menu>
      <MenuButton
        as={Flex}
        display={{ base: "none", md: "flex" }}
        alignItems="center"
        me="16px"
        cursor="pointer"
      >
        <Box position="relative">
          <BellIcon
            color={iconColor}
            w="18px"
            h="18px"
            _hover={{ color: 'teal.300' }}
            transition="all 0.2s"
          />
          {unreadCount > 0 && (
            <Badge
              position="absolute"
              top="-6px"
              right="-8px"
              bg="red.500"
              color="white"
              borderRadius="full"
              fontSize="9px"
              minW="14px"
              h="14px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              lineHeight="1"
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
  );
};

export default NotificationsMenu;