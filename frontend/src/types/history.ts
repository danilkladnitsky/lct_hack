import { QueryStatus } from '@tanstack/react-query';

export type HistoryRecord = {
    id: Id;
    date: Date;
    status: QueryStatus;
    name: string;
}
