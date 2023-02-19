import {
  Box,
  Heading,
  Text,
  Highlight,
  Progress,
  HStack,
} from '@chakra-ui/react';

export default function Analytics(props) {
  return (
    <Box>
      <Heading py="10px">Feedback</Heading>
      <HStack
        w="100%"
        align="horizontal"
        alignItems="center"
        px="30px"
        mb="30px"
      >
        <Heading size="md" my="10px" mr="10px">
          Confidence:{' '}
        </Heading>
        <Progress
          align="left"
          value={props.maybe ? 40 : 100}
          w="100%"
          size="lg"
          colorScheme="green"
          rounded="md"
        />
      </HStack>
      {props.maybe ? (
        <Box align="left" px="30px">
          <Heading size="md" my="10px">
            <Highlight
              query="Maybe"
              styles={{ px: '2', py: '1', rounded: 'full', bg: 'blue.100' }}
            >
              Maybe
            </Highlight>
          </Heading>
          <Text>
            Word choice is ambiguous. Be more direct. Uncertain language may be
            seen as encouraging.
          </Text>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
}
