import React, { useState } from 'react';
import { Heading, Box, VStack, Image, Text } from '@chakra-ui/react';
import GetCurrentDate from '../common/GetCurrentDate';
import useStateStore from '../zustand/store';

const LandingPage = () => {
  const [user, setUser] = useState('Naveed');
  const { selectedComponent, setSelectedComponent } = useStateStore();

  return (
    <>
      <VStack
        overflow="hidden"
        h="80vh"
        w="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          w="75%"
          textAlign="center"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Text fontSize="1.5rem" color="#4682b4" mb="4">
            Discover a wide range of car, UPS, and large batteries at our
            battery shop. Whether you need reliable power for your vehicle,
            backup for your home, or high-capacity solutions for industrial use,
            we have the perfect battery for you.
          </Text>
          <Box>
            <Image h="56" w="68" src="/batery.png" />
          </Box>
        </Box>
      </VStack>
    </>
  );
};

export default LandingPage;
