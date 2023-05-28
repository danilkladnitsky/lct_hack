import React from 'react';
import { Badge, Button, Card, Group, Text } from '@mantine/core';
import { MapData } from 'types/map';
import convertEventsToMapData from 'utils/convertEventsToMapData';

import useCombinedStore from 'store';

import Map from '../Map/Map';

import styles from './MapEvent.module.scss';

interface Props {
  item: MapData;
}
const MapEvent = ({ item }: Props) => {
  const pickAddress = useCombinedStore(state => state.pickAddress);
  const analyzeRequest = useCombinedStore(state => state.analyzeRequest);
  const eventData = convertEventsToMapData([item]);

  const canPick = item.layer === 'address';

  const wasPicked = analyzeRequest.address.includes(item.unom);

  const getEventType = () => {
    switch (item?.layer) {
    case 'analysis':
      return 'Прогноз';
    case 'incident':
      return 'Инцидент';
    case 'address':
    default:
      return 'Адрес';
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
          viewSettings={{ latitude: item.latitude, longitude: item.longitude, zoom: 14, minZoom: 14, maxZoom: 14 }} />
      </div>
      <Group position="apart"
        mt="md"
        mb="xs">
        <Text weight={500}>{item.name}</Text>
        <Badge color="pink"
          variant="light">
          {getEventType()}
        </Badge>
      </Group>

      <Text size="sm"
        color="dimmed">
        {item.value}
      </Text>

      {canPick && <Button variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        onClick={() => pickAddress(item.unom)}
      >
        {wasPicked ? 'Снять выделение' : 'Выбрать для прогноза'}
      </Button>}
    </Card>
  );
};

export default MapEvent;
