import React, { FC } from "react";
import { Button } from "@mantine/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import CoreService from "api/CoreService";
import { ResultRequest } from "types/core";

import useCombinedStore from "store";

const Dashboard: FC = () => {
  const { options, queryParams, setOptions, setResult } = useCombinedStore();

  useQuery({
    queryKey: ["getOptions"],
    queryFn: () => CoreService.getOptions(),
    onSuccess: (response) => {
      console.log(response.data);
      setOptions(response.data);
    },
  });

  const { mutate } = useMutation({
    mutationFn: (data: ResultRequest) => CoreService.mlPrediction(data),
    onSuccess: (response) => {
      console.log(response.data);
      setResult(response.data);
    },
  });

  const handleDozvon = () => {
    mutate(queryParams);
  };

  return (
    <>
      <p>Dashboard</p>
      <Button onClick={handleDozvon}>ДОЗВОН</Button>
    </>
  );
};

export default Dashboard;
