import { useMutation } from '@tanstack/react-query';
import AnalyzeService from 'api/AnalyzeService';

import useCombinedStore from 'store';

const useGetOptions = () => {
  const setOptions = useCombinedStore(state => state.setOptions);

  return useMutation(
    async () => await AnalyzeService.getOptions(),
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (response) => {
        const { data } = response;
        setOptions(data);
      },
    },
  );
};

export default useGetOptions;
