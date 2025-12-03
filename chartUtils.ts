
import { ChartConfig } from "./chart";

export interface ChartPayloadItem {
  name?: string;
  dataKey?: string;
  value?: number;
  payload?: any;
  color?: string;
}

export const getPayloadConfigFromPayload = (
  config: ChartConfig,
  item: ChartPayloadItem,
  key: string
) => {
  const dataKey = item.dataKey || item.name;
  if (dataKey && config[dataKey]) return config[dataKey];
  return config[key];
};
