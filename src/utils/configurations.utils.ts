import { store } from "@/store/store";
import { ConfigurationItem } from "@/types/configurations.type";

export const getConfigValue = (
  key: string,
  defaultValue: number | string | string[] | number[] | boolean
): number | string | string[] | number[] | boolean => {
  const configurations = store.getState().configurations.data;
  const configItem = configurations?.find(
    (config: ConfigurationItem) => config.name === key
  );
  return configItem ? configItem.value : defaultValue;
};
