import React, { useState } from 'react';
import {
  Heading,
  Box,
  HStack,
  Image,
  Button,
  VStack,
  Text,
} from '@chakra-ui/react';
import { CiLogin } from 'react-icons/ci';
import { CiLogout } from 'react-icons/ci';
import GetCurrentDate from '../common/GetCurrentDate';
import useStateStore from '../zustand/store';

const LandingPage = () => {
  const [user, setUser] = useState('Naveed');
  const { selectedComponent, setSelectedComponent } = useStateStore();

  return (
    <>
      <HStack
        px="4"
        py="4"
        justifyContent="space-between"
        bg="#4682b4"
        pos="fixed"
        top="0"
        w="100dvw"
      >
        <VStack>
          <Heading color="white" textAlign="left" w="full" fontSize="40">
            Exide Battery House
          </Heading>
          <Heading
            color="white"
            textAlign="center"
            w="full"
            fontSize="16"
            fontWeight="400"
          >
            123 Steet X Cantt, Quetta{' '}
          </Heading>
        </VStack>
        <Text
          color="white"
          onClick={() => setSelectedComponent('Stock')}
          w="20dvw"
          fontSize="24"
          fontWeight="600"
          _hover={{
            textDecor: 'underline',
            cursor: 'pointer',
          }}
        >
          Menu
        </Text>
        {user ? (
          <VStack w="44" h="20" pt="2">
            <Button onClick={() => setUser(null)}>
              <CiLogout />
              &nbsp; Logout
            </Button>
            <Text color="white" display={user ? 'block' : 'none'}>
              Welcome {user}
            </Text>
          </VStack>
        ) : (
          <VStack w="44" h="20" pt="2">
            <Button onClick={() => setUser('Maryam')}>
              <CiLogin />
              &nbsp; Login
            </Button>
          </VStack>
        )}
      </HStack>
      <HStack  overflow="none" h="100dvh">
        <Box
          alignItems="center"
          // justifyContent="center"
          display="flex"
          w="50dvw"
          h="full"
          bg="#4682b4"
        >
          <Image  src="/batery.png" />
        </Box>
        <Box
          w="50dvw"
          h="full"
          alignItems="center"
          justifyContent="center"
          flexDir="column"
          display="flex"
        >
          <Heading color="#4682b4" fontSize="5rem">
            Battery House
          </Heading>
          <Text fontSize="1.5rem" color="#4682b4">
            Discover a wide range of car, UPS, and large batteries at our
            battery shop. Whether you need reliable power for your vehicle,
            backup for your home, or high-capacity solutions for industrial use,
            we have the perfect battery for you
          </Text>
        </Box>
      </HStack>
    </>
  );
};

export default LandingPage;
