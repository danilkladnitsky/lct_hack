import { MapAddress } from './map';

export type WorkType = string;

export type SourceType = 'EDC'| 'NG'| 'MGI'| 'ASUPR'| 'MOS_GAS'| 'MVK'| 'CAFAP';

export type AnalyzeOptions = {
    source: SourceType[];
    work_type: string[];
    addresses: MapAddress[];
}
