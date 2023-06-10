import { useMutation } from '@tanstack/react-query';
import HistoryApi from 'api/historyApi';

import useCombinedStore from 'store';

const useGetHistory = () => {
  const setHistory = useCombinedStore(state => state.setHistory);

  return useMutation(
    async () => await HistoryApi.getHistoryRecords(),
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (response) => {
        const { data } = response;

        try {
          setHistory(data.map(p => ({
            created_at: p.created_at,
            login: p.login,
            request: JSON.parse(p.request),
            response: JSON.parse(p.response)
          })));

        } catch (err) {
          console.log(err);

        }
      },
    },
  );
};

export default useGetHistory;
