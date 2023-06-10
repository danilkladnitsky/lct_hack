import React, { useEffect, useMemo, useState } from 'react';
import { Button, Group, Loader, Pagination } from '@mantine/core';
import useGetHistory from 'api/hooks/use-get-history';
import { SortAscending, SortDescending } from 'tabler-icons-react';
import { HistoryRecord as HistoryRecordType } from 'types/history';
import Title from 'ui/shared/Title/Title';

import useCombinedStore from 'store';

import HistoryRecord from '../HistoryRecord/HistoryRecord';

import styles from './History.module.scss';

const History = () => {
  const { status, mutate: fetchHistory } = useGetHistory();
  const records = useCombinedStore(state => state.records);
  const [isDescending, setIsDescending] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const toggleSort = () => {
    setIsDescending(v => !v);
  };

  const filteredRecords = useMemo(() => {
    return records.sort((a, b) => {
      if (isDescending) {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }

      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [records, isDescending]);

  return (
    <div className={styles.history}>
      <Title order={2}>История запросов</Title>
      <Group>
        <Button
          leftIcon={isDescending ? <SortDescending /> : <SortAscending />}
          onClick={toggleSort}>
          Сортировать
        </Button>
      </Group>
      {status === 'loading' ? <Loader /> : <RecordList records={filteredRecords} />}
      <Pagination total={1}
      />
    </div>
  );
};

type Props = {
  records: HistoryRecordType[];
}

const RecordList = ({ records }: Props) => {

  return <div className={styles.recordList}>
    {records
      .map((record, index) => <HistoryRecord number={index + 1}
        item={record}
        key={index}
        date={record.created_at} />)}
  </div>;
};

export default History;
