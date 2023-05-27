import React, { FC } from "react";
import withLayout from "hoc/withLayout";
import { AppLayout } from "layouts";
import History from "ui/components/History/History";

const HistoryPage: FC = () => {
  return (
    <History />
  );
};

export default withLayout(AppLayout, <HistoryPage />);
