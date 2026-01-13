import React from "react";
import { Flex, Link, List, ListItem, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent="space-between"
      px="30px"
      pb="20px"
    >
      <Text
        color="gray.400"
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", xl: "0px" }}
      >
        &copy; {new Date().getFullYear()} Made with ❤️ by <Text as="span" color="teal.300" fontWeight={700}>Creative Tim</Text> & <Text as="span" color="teal.300" fontWeight={700}>Simmmple</Text> for a better web
      </Text>
      <List display="flex">
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link color="gray.400" href="#about">
            Creative Tim
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link color="gray.400" href="#support">
            Simmmple
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link color="gray.400" href="#contact">
            Blog
          </Link>
        </ListItem>
        <ListItem>
          <Link color="gray.400" href="#privacy">
            License
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}
