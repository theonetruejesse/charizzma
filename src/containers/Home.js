import React, { useState } from 'react';
import { Wrapper } from '../components/Wrapper';
import {
  Box,
  Center,
  Heading,
  Stack,
  Flex,
  AspectRatio,
} from '@chakra-ui/react';
import ChatRoom from '../components/ChatRoom/ChatRoom';

const Home = props => {
  return (
    <Wrapper variant="regular">
      <Box h="85vh">
        <Center pb="30px">
          <Heading size="4xl">Saying 'No' to a Friend</Heading>
        </Center>
        <Flex h="100%">
          <Stack bg="red" w="50%" align="center">
            <ChatRoom />
          </Stack>
          <Stack w="50%" align="center">
            <AspectRatio w="95%" ratio={1.5}>
              <iframe title="naruto" src={props.video} allowFullScreen />
            </AspectRatio>
            <Box w="100%" h="100%" align="center">
              <Box bg="#4c3daf" h="90%" w="95%" mt="15px"></Box>
            </Box>
          </Stack>
        </Flex>
      </Box>
    </Wrapper>
  );
};
export default Home;
