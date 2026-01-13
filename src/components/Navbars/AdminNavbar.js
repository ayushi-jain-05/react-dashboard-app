// Chakra Imports
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Link,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import React, { useState, useEffect, useMemo } from "react";
import AdminNavbarLinks from "./AdminNavbarLinks";

export default function AdminNavbar(props) {
  const [scrolled, setScrolled] = useState(false);
  const { brandText } = props;

  const mainTextLight = "gray.700";
  const secondaryTextColor = "gray.400";

  // Handle scroll event with proper cleanup
  useEffect(() => {
    const changeNavbar = () => {
      setScrolled(window.scrollY > 1);
    };
    window.addEventListener("scroll", changeNavbar);
    return () => window.removeEventListener("scroll", changeNavbar);
  }, []);

  // Memoize navbar styles based on scrolled state and props
  const navbarStyles = useMemo(() => {
    let styles = {
      position: "absolute",
      filter: "none",
      backdropFilter: "blur(21px)",
      shadow: "none",
      bg: "none",
      border: "transparent",
      secondaryMargin: "0px",
      paddingX: "15px",
      mainText: mainTextLight,
      secondaryText: secondaryTextColor,
    };

    if (props.fixed === true && scrolled === true) {
      styles.position = "fixed";
      styles.shadow = "0px 7px 23px rgba(0, 0, 0, 0.05)";
      styles.bg = "linear-gradient(112.83deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.8) 110.84%)";
      styles.border = "#FFFFFF";
      styles.filter = "none";
    }

    if (props.secondary) {
      styles.backdropFilter = "none";
      styles.position = "absolute";
      styles.secondaryMargin = "22px";
      styles.paddingX = "30px";
      styles.mainText = "white";
      styles.secondaryText = "white";
    }

    return styles;
  }, [props.fixed, props.secondary, scrolled, mainTextLight, secondaryTextColor]);

  return (
    <Flex
      position={navbarStyles.position}
      boxShadow={navbarStyles.shadow}
      bg={navbarStyles.bg}
      borderColor={navbarStyles.border}
      filter={navbarStyles.filter}
      backdropFilter={navbarStyles.backdropFilter}
      borderWidth="1.5px"
      borderStyle="solid"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      alignItems={{ xl: "center" }}
      borderRadius="16px"
      display="flex"
      minH="75px"
      justifyContent={{ xl: "center" }}
      lineHeight="25.6px"
      mx="auto"
      mt={navbarStyles.secondaryMargin}
      pb="8px"
      left={document.documentElement.dir === "rtl" ? "30px" : ""}
      right={document.documentElement.dir === "rtl" ? "" : "30px"}
      px={{
        sm: navbarStyles.paddingX,
        md: "30px",
      }}
      ps={{
        xl: "12px",
      }}
      pt="8px"
      top="18px"
      w={{ sm: "calc(100vw - 30px)", xl: "calc(100vw - 75px - 275px)" }}
    >
      <Flex
        w="100%"
        flexDirection={{
          base: "row",
          md: "row",
        }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box mb={{ base: "0px", md: "0px" }}>
          <Breadcrumb>
            <BreadcrumbItem color={navbarStyles.mainText}>
              <BreadcrumbLink href="#" color={navbarStyles.secondaryText}>
                Pages
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem color={navbarStyles.mainText}>
              <BreadcrumbLink href="#" color={navbarStyles.mainText}>
                {brandText}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          {/* Here we create navbar brand, based on route name */}
          <Link
            color={navbarStyles.mainText}
            href="#"
            bg="inherit"
            borderRadius="inherit"
            fontWeight="bold"
            _hover={{ color: navbarStyles.mainText }}
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}
          >
            {brandText}
          </Link>
        </Box>
        <Box ms="auto" w={{ base: "auto", md: "unset" }}>
          <AdminNavbarLinks
            onOpen={props.onOpen}
            logoText={props.logoText}
            secondary={props.secondary}
            fixed={props.fixed}
          />
        </Box>
      </Flex>
    </Flex>
  );
}

AdminNavbar.propTypes = {
  brandText: PropTypes.string,
  variant: PropTypes.string,
  secondary: PropTypes.bool,
  fixed: PropTypes.bool,
  onOpen: PropTypes.func,
};