import React, { useState } from 'react';
import { Wrapper } from '../components/Wrapper';
import { Box, Center, Heading, Grid } from '@chakra-ui/react';
import Card from '../components/Card/Card';
import { useNavigate } from 'react-router-dom';
const Modules = props => {
  const history = useNavigate();
  return (
    <Wrapper variant="regular">
      <Box>
        <Center>
          <Heading size="4xl" pt="15px">
            Charizzma
          </Heading>
        </Center>
        <Center>
          <Heading size="lg" pt="10px">
            Fake Conversations. Real Confidence.
          </Heading>
        </Center>
      </Box>
      <Grid templateColumns="repeat(2, 2fr)" gap={6} mt="20px">
        <Card
          history={history}
          img="https://cdn.pixabay.com/photo/2019/06/14/13/16/cigarette-4273574_960_720.jpg"
          title="Saying No To a Friend!"
          description="Don't want to hurt someones feelings. Practice how to say no in a non agressive manner! Practice this module!"
        />

        <Card
          history={history}
          img="https://cdn.pixabay.com/photo/2022/02/11/23/23/heart-7008170_1280.png"
          title="First Date"
          description="No longer fear an awkward date! This training module will get you ready to talk to your potential partner."
        />
        <Card
          history={history}
          img="https://cdn.pixabay.com/photo/2022/06/07/02/49/stranger-7247278_1280.png"
          title="Approaching a Stranger"
          description="Scared to talk to someone new? Try out this module to help you boost your confidence."
        />
        <Card
          history={history}
          img="https://cdn.pixabay.com/photo/2018/02/26/06/20/recruitment-3182373_1280.jpg"
          title="Asking for a Raise"
          description="Practice your negotation skills! Ask your employer for a raise and learn how to advocate for your worth. "
        />
      </Grid>
    </Wrapper>
  );
};
export default Modules;
