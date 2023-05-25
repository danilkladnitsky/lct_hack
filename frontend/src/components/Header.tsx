import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Flex, Text } from '@mantine/core';

import useCombinedStore from '../store';

interface HeaderProps {
  h?: string | number
}

const Header: FC<HeaderProps> = ({ h='100px' }) => {
  const { isLogined, username, logout } = useCombinedStore();
  return (
    <Flex
      h={h}
      bg={'gray'}
      justify={'space-between'}
      align={'center'}
      px={'5%'}>
      <Text
        fw={'bold'}
        fz={'28px'}
        component={Link}
        to={'/'}>
        LTC HACK
      </Text>

      <Flex
        fw={'bold'}
        gap={'lg'}>
        {isLogined && (
          <>
            <Text
              component={Link}
              to={'/dashboard'}>
              Рабочее пространство
            </Text>
            <Text
              component={Link}
              to={'/history'}>
              История запросов
            </Text>
          </>
        )}
      </Flex>
      <Flex
        columnGap={10}
        align={'center'}>
        {isLogined ? (
          <>
            <Text>{username}</Text>
            <Button onClick={logout}>Выход</Button>
          </>
        ) : (
          <>
            <Button
              component={Link}
              to={'/sign-in'}>
              Вход
            </Button>
            <Button
              component={Link}
              to={'/sign-up'}>
              Регистрация
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
