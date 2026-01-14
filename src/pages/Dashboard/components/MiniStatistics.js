// Chakra imports
import {
  Flex,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import IconBox from "components/Icons/IconBox";
import React, { useState, useEffect, useRef } from "react";

// Custom hook for animated counting
const useCountUp = (endValue, duration = 1500) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    // Parse the numeric value from string (e.g., "$53,000" -> 53000)
    const numericValue = parseFloat(endValue.replace(/[^0-9.-]+/g, "")) || 0;
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(easeOutQuart * numericValue);

      setCount(currentValue);

      if (progress < 1) {
        countRef.current = requestAnimationFrame(animate);
      }
    };

    countRef.current = requestAnimationFrame(animate);

    return () => {
      if (countRef.current) {
        cancelAnimationFrame(countRef.current);
      }
    };
  }, [endValue, duration]);

  return count;
};

// Format number with prefix/suffix from original amount
const formatAmount = (count, originalAmount) => {
  const prefix = originalAmount.match(/^[^0-9]*/)?.[0] || "";
  const suffix = originalAmount.match(/[^0-9]*$/)?.[0] || "";
  const hasCommas = originalAmount.includes(",");

  const formattedNumber = hasCommas
    ? count.toLocaleString()
    : count.toString();

  return `${prefix}${formattedNumber}${suffix}`;
};

const MiniStatistics = ({ title, amount, percentage, icon }) => {
  const iconTeal = "teal.300";
  const textColor = "gray.700";

  const animatedCount = useCountUp(amount, 1500);
  const displayAmount = formatAmount(animatedCount, amount);

  return (
    <Card minH='83px'>
      <CardBody>
        <Flex flexDirection='row' align='center' justify='center' w='100%'>
          <Stat me='auto'>
            <StatLabel
              fontSize='sm'
              color='gray.400'
              fontWeight='bold'
              pb='.1rem'>
              {title}
            </StatLabel>
            <Flex>
              <StatNumber fontSize='lg' color={textColor}>
                {displayAmount}
              </StatNumber>
              <StatHelpText
                alignSelf='flex-end'
                justifySelf='flex-end'
                m='0px'
                color={percentage > 0 ? "green.400" : "red.400"}
                fontWeight='bold'
                ps='3px'
                fontSize='md'>
                {percentage > 0 ? `+${percentage}%` : `${percentage}%`}
              </StatHelpText>
            </Flex>
          </Stat>
          <IconBox as='box' h={"45px"} w={"45px"} bg={iconTeal}>
            {icon}
          </IconBox>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default MiniStatistics;
