import React from 'react';
import { Button, Loader } from '@mantine/core';
import { QueryStatus } from '@tanstack/react-query';
import COLORS from 'const/colors';
import { AlertCircle, CircleCheck,CloudDownload, MapPin,Refresh } from 'tabler-icons-react';
import { HistoryRecord as HistoryRecordType } from 'types/history';
import ActionButton from 'ui/shared/ActionButton/ActionButton';
import formatDate from 'utils/formatDate';

import styles from './HistoryRecord.module.scss';

interface Props {
  item: HistoryRecordType;
  number: number;
}

const HistoryRecord = ({ item }: Props) => {
  const { date, id, status, name } = item;

  const isLoading = status === 'loading';

  return (
    <div className={styles.historyRecord}>
      <div className={styles.status}>
        <RecordStatus status={status} />
      </div>
      <div>{formatDate(date)}</div>
      <div>{name}</div>
      <div>
        <ActionButton
          leftIcon={<MapPin />}>
        Открыть на карте
        </ActionButton>
      </div>
      <div>
        <RecordAction status={status} />
      </div>
    </div>
  );
};

const RecordAction = ({ status }: { status: QueryStatus }) => {
  if (status === 'error') {
    return <ActionButton variant={'outline'}>
      <Refresh />
    </ActionButton>;
  }

  return <ActionButton variant={'outline'}>
    <CloudDownload />
  </ActionButton>;
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
