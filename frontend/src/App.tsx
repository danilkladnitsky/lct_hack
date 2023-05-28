import React, { FC, } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from 'router';

const queryClient = new QueryClient();

import 'dayjs/locale/ru';

const App: FC = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={{ colorScheme: 'dark' }}>
          <Router />
        </MantineProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
