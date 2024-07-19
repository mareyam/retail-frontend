import { Box, Heading, HStack, Text, Input, Image } from '@chakra-ui/react';
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <HStack overflow="none" h="100dvh">
      <Box
        w="50dvw"
        h="full"
        alignItems="center"
        justifyContent="center"
        flexDir="column"
        display="flex"
      >
        <Heading color="#4682b4" fontSize="2rem">
          Login to system
        </Heading>
        <Text>
          Please enter both correct email and password, in case of forgotten
          password please click on reset and contact admin
        </Text>
        <Text mb="8px">Email: {email}</Text>
        <Input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Here is a sample placeholder"
          size="sm"
        />
        <Text mb="8px">Password: {password}</Text>
        <Input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Here is a sample placeholder"
          size="sm"
        />
      </Box>
      <Box
        alignItems="center"
        // justifyContent="center"
        display="flex"
        w="50dvw"
        h="full"
        bg="#4682b4"
      >
        <Image src="/batery.png" />
      </Box>
    </HStack>
  );
};

export default Login;
