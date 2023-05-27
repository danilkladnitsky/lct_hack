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
        setHistory(data);
      },
    },
  );
};

export default useGetHistory;
