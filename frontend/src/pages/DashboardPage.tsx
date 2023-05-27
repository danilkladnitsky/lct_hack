import React, { FC } from "react";
import { useDisclosure } from "@mantine/hooks";
import withLayout from "hoc/withLayout";
import { AppLayout } from "layouts";
import Dashboard from "ui/components/Dashboard/Dashboard";
import OpenAnalyzeForm from "ui/components/OpenAnalyzeForm/OpenAnalyzeForm";
import AnalyzeForm from "ui/widgets/AnalyzeForm/AnalyzeForm";

const DashboardPage: FC = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <Dashboard />
      <AnalyzeForm
        onClose={close}
        opened={opened}
      />
      <OpenAnalyzeForm onClick={open} />
    </div>
  );
};

export default withLayout(AppLayout, <DashboardPage />);
