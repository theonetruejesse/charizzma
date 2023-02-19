import './Card.css';
import {
  Box,
  Center,
  Heading,
  Stack,
  Flex,
  Text,
  Button,
  AspectRatio,
  Spacer,
} from '@chakra-ui/react';

export default function Card(props) {
  return (
    <Box p="20px" bgColor="#2d1a36" h="100%">
      <AspectRatio ratio={4 / 3}>
        <img src={props.img} class="card__image" />
      </AspectRatio>
      <Heading mt="10px"> {props.title}</Heading>
      <Text>{props.description}</Text>
      <Spacer />
      <Center>
        <Button mt="20px" onClick={() => props.history('/home')}>
          Practice This Module
        </Button>
      </Center>
    </Box>
  );
}
