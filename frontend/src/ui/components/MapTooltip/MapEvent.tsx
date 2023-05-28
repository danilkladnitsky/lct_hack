import React from 'react';
import { Badge, Button, Card, Group, Text } from '@mantine/core';
import { EventRecord } from 'types/event';
import convertEventsToMapData from 'utils/convertEventsToMapData';

import Map from '../Map/Map';

import styles from './MapEvent.module.scss';

interface Props {
  item: EventRecord;
  canPick?: boolean;
}
const MapEvent = ({ item, canPick }: Props) => {
  const eventData = convertEventsToMapData([item]);
  return (
    <Card shadow="sm"
      padding="lg"
      radius="md"
      withBorder>
      <div className={styles.mapPreview}>
        <Map
          data={eventData}
          viewSettings={{ latitude: item.lat, longitude: item.lng, zoom: 14, minZoom: 14, maxZoom: 14 }} />
      </div>
      <Group position="apart"
        mt="md"
        mb="xs">
        <Text weight={500}>{item.name}</Text>
        <Badge color="pink"
          variant="light">
          {item.type}
        </Badge>
      </Group>

      <Text size="sm"
        color="dimmed">
        {item.description}
      </Text>

      {canPick && <Button variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md">
        Выбрать для прогноза
      </Button>}
    </Card>
  );
};

export default MapEvent;
