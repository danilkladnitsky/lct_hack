import React from 'react';
import { Badge, Button, Card, Group, Stack, Text } from '@mantine/core';
import { MapData } from 'types/map';
import convertEventsToMapData from 'utils/convertEventsToMapData';

import useCombinedStore from 'store';

import Map from '../Map/Map';

import styles from './MapEvent.module.scss';

interface Props {
  item: MapData;
}

const getEventType = (layer: string) => {
  switch (layer) {
  case 'analysis':
    return 'Прогноз';
  case 'incident':
    return 'Инцидент';
  case 'address':
  default:
    return 'Адрес';
  }
};

const MapEvent = ({ item }: Props) => {
  const pickAddress = useCombinedStore(state => state.pickAddress);
  const analyzeRequest = useCombinedStore(state => state.analyzeRequest);
  const incidentsCount = useCombinedStore(state => state.incidentCount);

  const eventData = convertEventsToMapData([item]);

  const type = getEventType(item.layer);
  const canPick = item.layer === 'address';

  const wasPicked = analyzeRequest.unom.includes(item.unom);

  const incidentsCountValue = incidentsCount.find(c => c.unom === item.unom)?.count;

  const getDescription = () => {
    switch (item.layer) {
    case 'address':
      return `Кол-во инцидентов: ${incidentsCountValue || 0}`;
    case 'analysis':
      return item.value || 'Рекомендуется провести техническую инспецию';
    default:
      return item.value;
    }
  };

  return (
    <Card shadow="sm"
      padding="lg"
      radius="md"
      withBorder>
      <div className={styles.mapPreview}>
        <Map
          data={eventData}
          showHeatMap={false}
          viewSettings={{ latitude: item.latitude, longitude: item.longitude, zoom: 14, minZoom: 14, maxZoom: 14 }} />
      </div>
      <Group
        position="apart"
        mt="md"
        mb="xs">
        <Stack>
          <Text weight={500}>{item.name}</Text>
          <Badge
            color="pink"
            variant="light"
            className={styles.badge}
          >
            {type}
          </Badge>
          <Text size="sm"
            color="dimmed">
            {getDescription()}
          </Text>
        </Stack>
        {canPick && <Button variant="light"
          color="blue"
          fullWidth
          mt="md"
          radius="md"
          onClick={() => pickAddress(item.unom)}
          className={styles.pickBtn}
        >
          {wasPicked ? 'Снять выделение' : 'Выбрать для прогноза'}
        </Button>}
      </Group>
    </Card>
  );
};

export default MapEvent;
