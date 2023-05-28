import { SelectItem } from '@mantine/core';
import { MapAddress } from 'types/map';

const convertToAddressesItems = (data: MapAddress[], selectedItems?: string[]): SelectItem[] => {
  return data.map(item => {
    const selected = (selectedItems || []).includes(item.unom);

    return ({ value: item.unom.toString(), label: item.address, selected });
  });
};

export default convertToAddressesItems;
