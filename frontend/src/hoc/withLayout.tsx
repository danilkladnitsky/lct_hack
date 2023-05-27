import React, { ComponentType, ReactNode } from 'react';
import { LayoutProps } from 'layouts/types';

const withLayout = (
  Layout: ComponentType<LayoutProps>,
  Component: ReactNode,
) => {
  return (
    <Layout>{Component}</Layout>
  );
};

export default withLayout;
