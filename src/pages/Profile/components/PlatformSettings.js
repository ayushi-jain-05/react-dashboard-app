// Chakra imports
import { Flex, Switch, Text, useColorModeValue, useToast } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React, { useState, useCallback, useMemo } from "react";

// Settings configuration data
const accountSettings = [
  { id: "followNotify", label: "Email me when someone follows me", defaultValue: true },
  { id: "answerNotify", label: "Email me when someone answers on my post", defaultValue: false },
  { id: "mentionNotify", label: "Email me when someone mentions me", defaultValue: true },
];

const applicationSettings = [
  { id: "launchNotify", label: "New launches and projects", defaultValue: false },
  { id: "productNotify", label: "Monthly product changes", defaultValue: false },
  { id: "newsletter", label: "Subscribe to newsletter", defaultValue: true },
];

const PlatformSettings = ({ title, subtitle1, subtitle2 }) => {
  const toast = useToast();

  // Initialize state from settings data using useMemo for initial value
  const initialSettings = useMemo(() => {
    const initial = {};
    [...accountSettings, ...applicationSettings].forEach(setting => {
      initial[setting.id] = setting.defaultValue;
    });
    return initial;
  }, []);

  const [settings, setSettings] = useState(initialSettings);

  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  // Memoized toggle handler
  const handleToggle = useCallback((settingId, label) => {
    setSettings(prev => {
      const newValue = !prev[settingId];
      toast({
        title: `Setting ${newValue ? 'enabled' : 'disabled'}`,
        description: label,
        status: newValue ? 'success' : 'info',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
      return { ...prev, [settingId]: newValue };
    });
  }, [toast]);

  const renderSettingItem = useCallback((setting) => (
    <Flex align='center' mb='20px' key={setting.id}>
      <Switch
        colorScheme='teal'
        me='10px'
        isChecked={settings[setting.id]}
        onChange={() => handleToggle(setting.id, setting.label)}
      />
      <Text noOfLines={1} fontSize='md' color='gray.500' fontWeight='400'>
        {setting.label}
      </Text>
    </Flex>
  ), [settings, handleToggle]);

  return (
    <Card p='16px'>
      <CardHeader p='12px 5px' mb='12px'>
        <Text fontSize='lg' color={textColor} fontWeight='bold'>
          {title}
        </Text>
      </CardHeader>
      <CardBody px='5px'>
        <Flex direction='column'>
          <Text fontSize='sm' color='gray.500' fontWeight='600' mb='20px'>
            {subtitle1}
          </Text>
          {accountSettings.map(renderSettingItem)}
          <Text
            fontSize='sm'
            color='gray.500'
            fontWeight='600'
            m='6px 0px 20px 0px'>
            {subtitle2}
          </Text>
          {applicationSettings.map(renderSettingItem)}
        </Flex>
      </CardBody>
    </Card>
  );
};

export default PlatformSettings;
