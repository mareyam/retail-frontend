import React, { useState } from 'react';
import { Box, Heading, HStack, Text, Input, Button, Image, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useStateStore from '@/components/zustand/store';

const Login = () => {
  const router = useRouter();
  const { email, setEmail, password, setPassword } = useStateStore();
  const toast = useToast();

  const correctEmail = 'admin@admin.com';
  const correctPassword = 'admin';

  const handleLogin = () => {
    if (!email || !password) {
      toast({
        title: 'Validation Error',
        description: 'Please enter both email and password.',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
      return;
    }

    // Check credentials
    if (email !== correctEmail) {
      toast({
        title: 'Login Failed',
        description: 'The entered email is incorrect.',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
      return;
    }

    if (password !== correctPassword) {
      toast({
        title: 'Login Failed',
        description: 'The entered password is incorrect.',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
      return;
    }

    // If both credentials are correct
    toast({
      title: 'Login Successful',
      description: 'You have logged in successfully.',
      status: 'success',
      duration: 5000,
      isClosable: true
    });
    router.push('/')

    // Handle successful login (e.g., redirect, store token)
  };

  return (
    <HStack h="100vh" spacing={0}>
      <Box
        w="50vw"
        h="full"
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        p={4}
      >
        <Heading color="#4682b4" fontSize="2rem" mb={4}>
          Login to System
        </Heading>
        <Text mb={4}>
          Please enter your email and password. If you forgot your password, please contact the admin.
        </Text>
        <Text mb="8px">Email:</Text>
        <Input
          w="300px"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          size="sm"
          mb={4}
        />
        <Text mb="8px">Password:</Text>
        <Input
          w="300px"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          size="sm"
          mb={4}
        />
        <Button
          colorScheme="blue"
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
      <Box
        alignItems="center"
        display="flex"
        w="50vw"
        h="full"
        bg="#4682b4"
        justifyContent="center"
      >
        <Image src="/batery.png" alt="Battery Icon" boxSize="200px" />
      </Box>
    </HStack>
  );
};

export default Login;
