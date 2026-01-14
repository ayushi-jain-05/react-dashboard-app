// Chakra Icons
import { SearchIcon } from "@chakra-ui/icons";
// Chakra Imports
import {
  Button,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
} from "@chakra-ui/react";
import { FaCog } from "react-icons/fa";
// Custom Icons
import { PersonIcon } from "components/Icons/Icons";
import NotificationsMenu from "components/Modal/NotificationsMenu";
import SettingsModal from "components/Modal/SettingsModal";
import SidebarResponsive from "components/Sidebar/SidebarResponsive";
import PropTypes from "prop-types";
import React from "react";
import { useHistory } from "react-router-dom";
import routes from "routes.js";

export default function HeaderLinks(props) {
  const { secondary, ...rest } = props;
  const history = useHistory();
  const { isOpen: isSettingsOpen, onOpen: onSettingsOpen, onClose: onSettingsClose } = useDisclosure();

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
        onClick={() => history.push('/profile')}
      >
        Sign In
      </Button>

      {/* Settings Icon */}
      <Flex
        display={{ base: "none", md: "flex" }}
        alignItems="center"
        me="16px"
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
      </Flex>

      {/* Notifications Menu */}
      <NotificationsMenu iconColor={navbarIcon} />

      <SidebarResponsive
        logoText={props.logoText}
        secondary={props.secondary}
        routes={routes}
        {...rest}
      />

      {/* Settings Modal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={onSettingsClose} />
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};