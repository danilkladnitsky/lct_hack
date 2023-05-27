import { SelectItem } from "@mantine/core";

const convertToSelectItems = (data: string[], selectedItems?: string[]): SelectItem[] => {
  return data.map(item => {
    const selected = (selectedItems || []).includes(item);

    return ({ value: item, label: item, selected });
  });
};

export default convertToSelectItems;
