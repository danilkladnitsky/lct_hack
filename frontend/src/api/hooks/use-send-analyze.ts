import { useMutation } from '@tanstack/react-query';
import AnalyzeService from 'api/CoreService';
import { ResultRequest, } from 'types/core';

import useCombinedStore from 'store';

const useSendAnalyze = () => {
  const setAnalyzeResponse = useCombinedStore(state => state.setAnalyzeResponse);

  return useMutation<any, unknown, ResultRequest>(
    async (query) => await AnalyzeService.mlPrediction(query),
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (response) => {
        const { data } = response;
        setAnalyzeResponse(data);
      },
    },
  );
};

export default useSendAnalyze;
