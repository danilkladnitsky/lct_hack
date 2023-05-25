
import React, { FC } from 'react';
import { Flex } from '@mantine/core';
import { Header } from 'components';
import Router from 'router';

import useCombinedStore from 'store';

const App: FC = () => {
  const { isLogined } = useCombinedStore();

  return (
    <Flex direction={'column'} mih={'100vh'}>
      <Header h={'70px'}/>
      <Router isLogined={isLogined}/>
    </Flex>
  );
};

export default App;
