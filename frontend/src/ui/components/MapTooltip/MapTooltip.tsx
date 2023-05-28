import React from 'react';
import { Flex, } from '@mantine/core';
import { Stack } from 'tabler-icons-react';
import { MapTooltipObject } from 'types/map';

import styles from './MapTooltip.module.scss';

type Props = {
    points: MapTooltipObject[];
}

const MapTooltip = ({ points }: Props) => {
  return (
    <div className={styles.tooltip}>
      <Stack>
        {points.map(point => {
          const { source } = point;
          return <Flex key={point.index}>
            {source.name}
          </Flex>;
        })}
      </Stack>
    </div>
  );
};

export default MapTooltip;
