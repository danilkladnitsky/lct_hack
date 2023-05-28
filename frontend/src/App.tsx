import React, { FC, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from 'router';

const queryClient = new QueryClient();

import useGetIncidentsCount from 'api/hooks/use-get-incidents-count';
import useGetOptions from 'api/hooks/use-get-options';

import 'dayjs/locale/ru';

import useCombinedStore from 'store';

const App: FC = () => {
  const { isLogined } = useCombinedStore();
  const { mutate: fetchOptions } = useGetOptions();
  const { mutate: fetchIncidents } = useGetIncidentsCount();

  useEffect(() => {
    if (isLogined) {
      fetchOptions();
      fetchIncidents();
    }
  }, [isLogined]);
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
