import React, { FC, ReactNode } from 'react';
import { Flex } from '@mantine/core';

interface AuthLayoutProps {
  children: ReactNode
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return <Flex direction={'column'} align={'center'} justify={'center'} sx={{ flex: 1 }} p={'2%'}>{children}</Flex>;
};

export default AuthLayout;
