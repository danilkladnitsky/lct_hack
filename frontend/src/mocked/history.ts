import { HistoryRecord } from 'types/history';

export const MOCKED_HISTORY_RECORDS: HistoryRecord[] = [
  {
    date: new Date(),
    id: 0,
    status: 'loading',
    name: 'м. Фрузенская',
  },
  {
    date: new Date(),
    id: 1,
    status: 'error',
    name: 'Административный район Новая Москва',
  },
  {
    date: new Date(),
    id: 2,
    status: 'success',
    name: 'Центральный район',
  },
];
