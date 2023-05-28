import React from 'react';
import { Button, Group, } from '@mantine/core';

import useCombinedStore from 'store';

import OpenAnalyzeForm from '../OpenAnalyzeForm/OpenAnalyzeForm';

import styles from './MapFooter.module.scss';

const MapFooter = () => {
  const { toggleHeatBox, heatboxVisible } = useCombinedStore();
  return (
    <>
      <Group className={styles.mapFooter}>
        <OpenAnalyzeForm />
        <Button
          onClick={toggleHeatBox}>
          {heatboxVisible ? 'Скрыть тепловую карту' : 'Показать тепловую карту'}
        </Button>
      </Group>
    </>
  );
};

export default MapFooter;
