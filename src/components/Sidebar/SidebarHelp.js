import { QuestionIcon } from "@chakra-ui/icons";
import { Button, Flex, Text } from "@chakra-ui/react";
import SidebarHelpImage from "assets/img/SidebarHelpImage.png";
import IconBox from "components/Icons/IconBox";
import React, { useCallback } from "react";

export function SidebarHelp() {
  const handleDocumentationClick = useCallback(() => {
    window.open(
      "https://github.com/ayushi-jain-05/react-dashboard-app#readme",
      "_blank",
      "noopener,noreferrer"
    );
  }, []);

  return (
    <Flex
      borderRadius="15px"
      flexDirection="column"
      bgImage={SidebarHelpImage}
      justifyContent="flex-start"
      alignItems="start"
      boxSize="border-box"
      p="16px"
      h="170px"
      w="100%"
    >
      <IconBox width="35px" h="35px" bg="white" mb="auto">
        <QuestionIcon color="teal.300" h="18px" w="18px" />
      </IconBox>
      <Text fontSize="sm" color="white" fontWeight="bold">
        Need help?
      </Text>
      <Text fontSize="xs" color="white" mb="10px">
        Please check our docs
      </Text>
      <Button
        fontSize="10px"
        fontWeight="bold"
        w="100%"
        bg="white"
        _hover={{ bg: "gray.100" }}
        _active={{
          bg: "white",
          transform: "none",
          borderColor: "transparent",
        }}
        _focus={{
          boxShadow: "none",
        }}
        color="black"
        onClick={handleDocumentationClick}
      >
        DOCUMENTATION
      </Button>
    </Flex>
  );
}
