import React from 'react';
import { CSVLink } from 'react-csv';
import { Loader } from '@mantine/core';
import { QueryStatus } from '@tanstack/react-query';
import COLORS from 'const/colors';
import { AlertCircle, CircleCheck,CloudDownload, Refresh } from 'tabler-icons-react';
import { HistoryRecord as HistoryRecordType } from 'types/history';
import ActionButton from 'ui/shared/ActionButton/ActionButton';

import styles from './HistoryRecord.module.scss';

interface Props {
  item: HistoryRecordType;
  number: number;
  date: string;
}

const HistoryRecord = ({ item, }: Props) => {
  const { response, request } = item;

  return (
    <div className={styles.historyRecord}>
      <div className={styles.status}>
        <RecordStatus status={'success'} />
      </div>
      <div>{request.source.join(', ')}</div>
      <div>{item.request.work_type.join(', ')}</div>
      <div>Результат: {(response.work_type || []).join(',') || 'Нельзя спрогнозировать'}</div>
      <div>
        <RecordAction status={'success'}
          data={response} />
      </div>
    </div>
  );
};

const RecordAction = ({ status, data }: { status: QueryStatus, data: any }) => {
  if (status === 'error') {
    return <ActionButton variant={'outline'}>
      <Refresh />
    </ActionButton>;
  }

  return <CSVLink data={JSON.stringify(data)}>
    <ActionButton variant={'outline'}>
      <CloudDownload />
    </ActionButton>
  </CSVLink> ;
};

const RecordStatus = ({ status }: {status: QueryStatus}) => {
  switch (status) {
  case 'loading':
    return <Loader size={'sm'}
      variant="dots"
      color={COLORS.PRIMARY_TEXT} />;
  case 'error':
    return <AlertCircle color={COLORS.ERROR} />;
  case 'success':
  default:
    return <CircleCheck color={COLORS.SUCCESS} />;

  }
};

export default HistoryRecord;
