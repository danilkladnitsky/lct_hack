import React, { ReactNode } from 'react';
import { Button, Drawer, MultiSelect, Stack, Text } from '@mantine/core';
import { DatePickerInput, DatesRangeValue } from '@mantine/dates';
import useSendAnalyze from 'api/hooks/use-send-analyze';
import { Analyze, } from 'tabler-icons-react';
import { ResultRequest } from 'types/core';
import Title from 'ui/shared/Title/Title';
import convertToAddressesItems from 'utils/convertAddressesToList';
import convertToSelectItems from 'utils/convertToSelectItems';

import useCombinedStore from 'store';

import styles from './AnalyzeForm.module.scss';

const DEFAULT_PROPS = { opacity: 0.5, blur: 4 };

type Props = {
    children?: ReactNode;
}

const AnalyzeForm = ({ children }: Props) => {
  const analyzeFormData = useCombinedStore(state => state.analyzeRequest);
  const { mutate: sendAnalyze, status: analysisStatus } = useSendAnalyze();

  const { analyzeFrameVisible, setAnalyzeFrameVisibility, options, updateRequest } = useCombinedStore();

  const closeForm = () => {
    setAnalyzeFrameVisibility(false);
  };

  const requestAnalysis = () => {
    sendAnalyze(analyzeFormData);
  };

  const updateForm = (property: keyof ResultRequest, value: any) => {
    switch (property) {
    case 'start_time':
      return updateRequest({ start_time: value });
    case 'end_time':
      return updateRequest({ end_time: value });
    case 'source':
      return updateRequest({ source: value });
    case 'work_type':
      return updateRequest({ work_type: value });
    case 'address':
    default:
      return updateRequest({ address: value });
    }
  };

  const saveDateRange = ([start, end]: DatesRangeValue) => {
    updateForm('start_time', start);
    updateForm('end_time', end);
  };

  return (
    <Drawer
      opened={analyzeFrameVisible}
      onClose={closeForm}
      overlayProps={DEFAULT_PROPS}
      position="right"
      withCloseButton={false}
      classNames={{ body: styles.drawer }}
      trapFocus={false}
    >
      <Stack spacing={'md'}
        className={styles.form}>
        <Stack>
          <Title order={3}>Прогноз</Title>
          <Text>Выберите источник работ</Text>
          <MultiSelect
            value={analyzeFormData.source}
            data={convertToSelectItems(options?.source || [])}
            searchable
            onChange={(v) => updateForm('source', v)}
          />
          <Text>Выберите типы работ</Text>
          <MultiSelect
            value={analyzeFormData.work_type}
            data={convertToSelectItems(options?.work_type || [])}
            limit={20}
            searchable
            onChange={(v) => updateForm('work_type', v)}
          />
          <Text>Выберите адрес</Text>
          <MultiSelect
            value={analyzeFormData.address.map(a => a.toString())}
            data={convertToAddressesItems(options?.addresses || [])}
            limit={20}
            searchable
            onChange={(v) => updateForm('address', v)}
          />
          <Text>Выберите временной диапазон</Text>
          <DatePickerInput
            placeholder="Диапазон прогнозирования"
            type="range"
            locale="ru"
            onChange={saveDateRange}
          />
        </Stack>
        <Stack className={styles.controls}>
          <Button
            leftIcon={<Analyze />}
            fullWidth
            onClick={requestAnalysis}
            loading={analysisStatus === 'loading'}
          >Прогнозировать
          </Button>
          <Button
            fullWidth
            onClick={closeForm}
            color={'red'}
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
