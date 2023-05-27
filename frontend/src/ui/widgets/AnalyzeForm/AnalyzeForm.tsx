import React, { ReactNode } from "react";
import { Button, Drawer, MultiSelect, Stack, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { Analyze, } from "tabler-icons-react";
import Title from "ui/shared/Title/Title";
import convertToSelectItems from "utils/convertToSelectItems";

import useCombinedStore from "store";

import styles from "./AnalyzeForm.module.scss";

const DEFAULT_PROPS = { opacity: 0.5, blur: 4 };

type Props = {
    opened: boolean;
    onClose: () => void;
    children?: ReactNode;
}

const AnalyzeForm = ({ opened, onClose, children }: Props) => {
  const analyzeFormData = useCombinedStore(state => state.analyzeRequest);

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      overlayProps={DEFAULT_PROPS}
      position="right"
      withCloseButton={false}
      classNames={{ body: styles.drawer }}
    >
      <Stack spacing={"md"}
        className={styles.form}>
        <Stack>
          <Title order={3}>Прогноз</Title>
          <Text>Выберите источник работ</Text>
          <MultiSelect
            value={analyzeFormData.source}
            data={convertToSelectItems([])}
          />
          <Text>Выберите типы работ</Text>
          <MultiSelect
            value={analyzeFormData.work_type}
            data={convertToSelectItems([])}
          />
          <Text>Выберите временной диапазон</Text>
          <DatePickerInput
            placeholder="Диапазон прогнозирования"
            type="range"
          />
        </Stack>
        <Stack className={styles.controls}>
          <Button
            leftIcon={<Analyze />}
            fullWidth
          >Прогнозировать
          </Button>
          <Button
            fullWidth
            onClick={onClose}
            color={"red"}
          >
            Закрыть
          </Button>
        </Stack>
      </Stack>
      {children}
    </Drawer>
  );
};

export default AnalyzeForm;
