import React, { FC, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from 'router';

const queryClient = new QueryClient();

import useGetIncidentsCount from 'api/hooks/use-get-incidents-count';
import useGetOptions from 'api/hooks/use-get-options';

import 'dayjs/locale/ru';

const App: FC = () => {
  const { mutate: fetchOptions } = useGetOptions();
  const { mutate: fetchIncidents } = useGetIncidentsCount();

  useEffect(() => {
    fetchOptions();
    fetchIncidents();
  }, []);
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
