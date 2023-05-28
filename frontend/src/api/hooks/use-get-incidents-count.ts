import { useMutation } from '@tanstack/react-query';
import AnalyzeService from 'api/AnalyzeService';

import useCombinedStore from 'store';

const useGetIncidentsCount = () => {
  const setIncidentsCount = useCombinedStore(state => state.setIncidentsCount);

  return useMutation(
    async () => await AnalyzeService.getIncidentCount(),
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (response) => {
        const { data } = response;
        setIncidentsCount(data);
      },
    },
  );
};

export default useGetIncidentsCount;
