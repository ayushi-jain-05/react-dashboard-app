import { Flex, Progress, Text, useColorModeValue } from "@chakra-ui/react";
import IconBox from "components/Icons/IconBox";
import React from "react";

const ChartStatistics = ({ title, amount, icon, percentage }) => {
  const iconTeal = useColorModeValue("teal.300", "teal.300");
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Flex direction='column'>
      <Flex alignItems='center'>
        <IconBox as='box' h={"30px"} w={"30px"} bg={iconTeal} me='6px'>
          {icon}
        </IconBox>
        <Text fontSize='sm' color='gray.400' fontWeight='semibold'>
          {title}
        </Text>
      </Flex>
      <Text fontSize='lg' color={textColor} fontWeight='bold' mb='6px' my='6px'>
        {amount}
      </Text>
      <Progress
        borderRadius='12px'
        h='5px'
        value={percentage}
        sx={{
          "& > div": {
            backgroundColor: "teal.300",
          },
        }}
      />
    </Flex>
  );
};

export default ChartStatistics;
