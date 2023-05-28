import { ResultResponse } from 'types/core';
import { MapData } from 'types/map';

const convertAnalysisToMapData = (analysis: ResultResponse): MapData[] => {
  return analysis.map(a => ({ ...a, latitude: +a.latitude, longitude: +a.longitude, layer: 'analysis', name: a.address }));
};

export default convertAnalysisToMapData;
