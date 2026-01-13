// Chakra imports
import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import AvatarEditModal from "components/Modal/AvatarEditModal";
import React, { useState, useCallback } from "react";
import { FaPencilAlt } from "react-icons/fa";

const Header = ({
  backgroundHeader,
  backgroundProfile,
  avatarImage,
  name,
  email,
  tabs,
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentAvatar, setCurrentAvatar] = useState(avatarImage);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const textColor = "gray.700";
  const borderProfileColor = "white";
  const emailColor = "gray.400";

  // Memoized tab click handler
  const handleTabClick = useCallback((index) => {
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index, tabs[index].name);
    }
  }, [onTabChange, tabs]);

  // Memoized tab style getter
  const getTabStyle = useCallback((index) => {
    if (activeTab === index) {
      return {
        bg: 'white',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      };
    }
    return {
      bg: 'transparent',
      boxShadow: 'none',
      border: 'none',
    };
  }, [activeTab]);

  // Handle avatar change from modal
  const handleAvatarChange = useCallback((newAvatar) => {
    setCurrentAvatar(newAvatar);
  }, []);

  return (
    <Box
      mb={{ sm: "205px", md: "75px", xl: "70px" }}
      borderRadius='15px'
      px='0px'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      align='center'>
      <Box
        bgImage={backgroundHeader}
        w='100%'
        h='300px'
        borderRadius='25px'
        bgPosition='50%'
        bgRepeat='no-repeat'
        position='relative'
        display='flex'
        justifyContent='center'>
        <Flex
          direction={{ sm: "column", md: "row" }}
          mx='1.5rem'
          maxH='330px'
          w={{ sm: "90%", xl: "95%" }}
          justifyContent={{ sm: "center", md: "space-between" }}
          align='center'
          position='absolute'
          boxShadow='0px 2px 5.5px rgba(0, 0, 0, 0.02)'
          border='2px solid'
          borderColor={borderProfileColor}
          bg={backgroundProfile}
          p='24px'
          borderRadius='20px'
          transform={{
            sm: "translateY(45%)",
            md: "translateY(110%)",
            lg: "translateY(160%)",
          }}>
          <Flex
            align='center'
            mb={{ sm: "10px", md: "0px" }}
            direction={{ sm: "column", md: "row" }}
            w={{ sm: "100%" }}
            textAlign={{ sm: "center", md: "start" }}>
            <Box position='relative' me={{ md: "22px" }}>
              <Avatar
                src={currentAvatar}
                w='80px'
                h='80px'
                borderRadius='15px'
              />
              <Box
                position='absolute'
                bottom='-3px'
                right='-3px'
                bg='white'
                borderRadius='5px'
                w='24px'
                h='24px'
                display='flex'
                alignItems='center'
                justifyContent='center'
                boxShadow='0 2px 5px rgba(0,0,0,0.2)'
                cursor='pointer'
                _hover={{ transform: 'scale(1.1)', bg: 'teal.50' }}
                transition='all 0.2s'
                onClick={onOpen}
              >
                <Icon as={FaPencilAlt} color='teal.300' w='8px' h='8px' />
              </Box>
            </Box>
            <Flex direction='column' maxWidth='100%' my={{ sm: "14px" }}>
              <Text
                fontSize={{ sm: "lg", lg: "xl" }}
                color={textColor}
                fontWeight='bold'
                ms={{ sm: "8px", md: "0px" }}>
                {name}
              </Text>
              <Text
                fontSize={{ sm: "sm", md: "md" }}
                color={emailColor}
                fontWeight='semibold'>
                {email}
              </Text>
            </Flex>
          </Flex>
          <Flex
            direction={{ sm: "column", lg: "row" }}
            w={{ sm: "100%", md: "50%", lg: "auto" }}>
            {tabs.map((tab, index) => (
              <Button
                key={index}
                p='0px'
                bg='transparent'
                _hover={{ bg: "none" }}
                onClick={() => handleTabClick(index)}
              >
                <Flex
                  align='center'
                  w={{ sm: "100%", lg: "135px" }}
                  borderRadius='15px'
                  justifyContent='center'
                  py='10px'
                  mx={{ lg: index === 1 ? "1rem" : "0" }}
                  cursor='pointer'
                  transition='all 0.2s ease-in-out'
                  {...getTabStyle(index)}
                >
                  {tab.icon}
                  <Text
                    fontSize='xs'
                    color={textColor}
                    fontWeight='bold'
                    ms='6px'>
                    {tab.name}
                  </Text>
                </Flex>
              </Button>
            ))}
          </Flex>
        </Flex>
      </Box>

      {/* Avatar Edit Modal */}
      <AvatarEditModal
        isOpen={isOpen}
        onClose={onClose}
        currentAvatar={currentAvatar}
        onAvatarChange={handleAvatarChange}
      />
    </Box>
  );
};

export default Header;