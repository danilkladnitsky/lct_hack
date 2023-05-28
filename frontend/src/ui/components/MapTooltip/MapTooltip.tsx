import React from 'react';
import { Button, Drawer, ScrollArea, Stack, Title } from '@mantine/core';
import { MapTooltipObject } from 'types/map';

import useCombinedStore from 'store';

import MapEvent from './MapEvent';

import styles from './MapTooltip.module.scss';

type Props = {
  points?: MapTooltipObject[];
  isOpened: boolean;
}

const MapTooltip = ({ points, isOpened }: Props) => {
  const setPoint = useCombinedStore(state => state.setPoint);

  const close = () => {
    setPoint(null);
  };

  return (
    <Drawer
      className={styles.tooltip}
      position="right"
      onClose={close}
      opened={isOpened}
      withCloseButton={false}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      {points && <Stack>
        <Title order={3}>Инциденты</Title>
        {points?.map(point => <MapEvent key={point.index}
          item={point.source} />)
        }
        <Button
          onClick={close}
          fullWidth
          color={'red'}
        >Закрыть</Button>
      </Stack>}
    </Drawer>
  );
};

export default MapTooltip;
