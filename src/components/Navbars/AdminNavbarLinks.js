// Chakra Icons
import { BellIcon, SearchIcon } from "@chakra-ui/icons";
// Chakra Imports
import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
// Custom Icons
import { PersonIcon, SettingsIcon } from "components/Icons/Icons";
import SidebarResponsive from "components/Sidebar/SidebarResponsive";
import PropTypes from "prop-types";
import React from "react";
import { useHistory } from "react-router-dom";
import routes from "routes.js";

export default function HeaderLinks(props) {
  const { secondary, ...rest } = props;
  const history = useHistory();

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
  const settingsRef = React.useRef();
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
      <SettingsIcon
        cursor="pointer"
        display={{ base: "none", md: "block" }}
        me="16px"
        ref={settingsRef}
        onClick={() => history.push('/admin/dashboard')}
        color={navbarIcon}
        w="18px"
        h="18px"
      />
      <BellIcon
        cursor="pointer"
        display={{ base: "none", md: "block" }}
        color={navbarIcon}
        me={{ base: "0px", md: "16px" }}
        w="18px"
        h="18px"
        onClick={() => history.push('/admin/dashboard')}
      />
      <SidebarResponsive
        logoText={props.logoText}
        secondary={props.secondary}
        routes={routes}
        {...rest}
      />
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
